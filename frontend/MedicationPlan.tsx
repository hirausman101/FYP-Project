import React, { useEffect, useState } from 'react';
import { Modal, Alert, View, Text, StyleSheet,  Dimensions, ScrollView, TouchableOpacity, TextInput, Pressable, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation,useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import  API_BASE_URL  from './config'; // Adjust the import path as necessary  
import AsyncStorage from '@react-native-async-storage/async-storage';


const MedicationPlan = ({ route }) => {
  const navigation = useNavigation();
  const { patientId, email, id } = route.params;
  const [patient, setPatient] = useState(null);
  const [dosageStatus, setDosageStatus] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
 const [newMedication, setNewMedication] = useState({
  medication: '',
  class: '',
  description: '',
  dosage: '',
  frequency: '',
  timing: [''], // Start with one empty timing input
});
  const [medications, setMedications] = useState([]);
  const [selectedMedicationId, setSelectedMedicationId] = useState('');
  const [isNewMedication, setIsNewMedication] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch dosage status
  const fetchDosageStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dosage_status/${patientId}`);
      if (!response.ok) throw new Error('Dosage status not found');
      const data = await response.json();
      setDosageStatus(data);
    } catch (error) {
      setDosageStatus([]);
    }
  };

useEffect(() => {
  if (!patientId) return;
  const fetchAll = async () => {
    setLoading(true);
    try {
      const fetchPatient = async () => {
        const response = await fetch(`${API_BASE_URL}/patientData/${patientId}`);
        if (!response.ok) throw new Error('Patient not found');
        const data = await response.json();
        setPatient(data);
      };
      await Promise.all([
        fetchPatient(),
        fetchDosageStatus(),
      ]);
    } catch (error) {
      setPatient(null);
      setDosageStatus([]);
    } finally {
      setLoading(false);
    }
  };
  fetchAll();
}, [patientId]);

  // Fetch all medications for the dropdown
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/medications`);
        const data = await res.json();
        setMedications(data);
      } catch (e) {
        setMedications([]);
      }
    };
    fetchMedications();
  }, []);

  // Flatten all status rows for display
  const allStatusRows = [];
  dosageStatus.forEach(ds => {
  const med = ds.dosage_id?.medication_id;
  ds.statuses.forEach(statusObj => {
    allStatusRows.push({
      _id: ds._id,
      medication: med?.name || '',
      medication_id: med?._id,
      dosage: ds.dosage_id?.dosage_amount || '',
      dosage_id: ds.dosage_id?._id,
      frequency: ds.dosage_id?.frequency || '', // <-- add this line
      timing: statusObj.timing,
      status: statusObj.status,
      statusId: statusObj._id,
    });
  });
});

  // Edit handler
  const handleEdit = (row) => {
  setEditRow({ ...row });
  setShowEditModal(true);
  };

  // Delete handler
  const handleDelete = async (row) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await fetch(`${API_BASE_URL}/dosage_status/remove_timing`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          dosage_id: row.dosage_id,
          timing: row.timing
        }),
      });
      await fetchDosageStatus();
    } catch (error) {
      console.log('Delete error:', error);
    }
  };

// Save edit handler
const handleSaveEdit = async () => {
  console.log('handleSaveEdit called', editRow);
  try {
    const token = await AsyncStorage.getItem('token');
    if (!editRow.dosage_id || !editRow.timing) return;

    const originalRow = allStatusRows.find(
      r => r.dosage_id === editRow.dosage_id && r.timing === editRow.timing
    );
    if (!originalRow) return;

    if (editRow.dosage !== originalRow.dosage) {
      // Remove timing from old dosage
      const removeRes = await fetch(`${API_BASE_URL}/dosage_status/remove_timing`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          dosage_id: editRow.dosage_id,
          timing: editRow.timing,
        }),
      });
      if (!removeRes.ok) {
        const err = await removeRes.json();
        console.error('Remove timing error:', err);
        alert('Failed to remove timing: ' + (err.message || 'Unknown error'));
        return;
      }
      const removeData = await removeRes.json();
      console.log('Remove timing response:', removeData);

      // Create new dosage for new amount and timing
      const addRes = await fetch(`${API_BASE_URL}/add_dosage_for_existing_medication`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          medicationId: editRow.medication_id,
          dosage: {
            dosage_amount: editRow.dosage,
            frequency: originalRow.frequency,
            timing: [editRow.timing],
          },
          patientId,
        }),
      });
      if (!addRes.ok) {
        const err = await addRes.json();
        console.error('Add dosage error:', err);
        alert('Failed to add new dosage: ' + (err.message || 'Unknown error'));
        return;
      }
      const addData = await addRes.json();
      console.log('Add dosage response:', addData);
    } else if (editRow.timing !== originalRow.timing) {
      // Only timing changed: update timing in-place
      const updateRes = await fetch(`${API_BASE_URL}/update_timing_in_dosage`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          dosage_id: editRow.dosage_id,
          oldTiming: originalRow.timing,
          newTiming: editRow.timing,
          patientId,
        }),
      });
      if (!updateRes.ok) {
        const err = await updateRes.json();
        console.error('Update timing error:', err);
        alert('Failed to update timing: ' + (err.message || 'Unknown error'));
        return;
      }
      const updateData = await updateRes.json();
      console.log('Update timing response:', updateData);
    }
    setShowEditModal(false);
    await fetchDosageStatus();
  } catch (error) {
    console.log('Edit error:', error);
    alert('Failed to update dosage: ' + error.message);
  }
};

// Add new handler
const handleAddNew = async () => {
  try {
    if (
      (isNewMedication && (!newMedication.medication || !newMedication.class || !newMedication.description)) ||
      !newMedication.dosage ||
      !newMedication.frequency ||
      !newMedication.timing
    ) {
      alert('Please fill all fields.');
      return;
    }

    const timingArray = newMedication.timing.filter(t => t.trim() !== '');
    const token = await AsyncStorage.getItem('token');

    if (isNewMedication) {
      const res = await fetch(`${API_BASE_URL}/medications_with_dosage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          medication: {
            name: newMedication.medication,
            class: newMedication.class,
            description: newMedication.description,
            notes: [],
          },
          dosage: {
            dosage_amount: newMedication.dosage,
            frequency: newMedication.frequency,
            timing: timingArray,
          },
          patientId,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        console.error('Add new medication error:', err);
        alert('Failed to add new medication: ' + (err.message || 'Unknown error'));
        return;
      }
      const data = await res.json();
      console.log('Add new medication response:', data);
    } else {
      // Add dosage for existing medication
      const res = await fetch(`${API_BASE_URL}/add_dosage_for_existing_medication`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          medicationId: selectedMedicationId,
          dosage: {
            dosage_amount: newMedication.dosage,
            frequency: newMedication.frequency,
            timing: timingArray,
          },
          patientId,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        console.error('Add dosage error:', err);
        alert('Failed to add dosage: ' + (err.message || 'Unknown error'));
        return;
      }
      const data = await res.json();
      console.log('Add dosage response:', data);
    }
    setShowAddModal(false);
    setNewMedication({
      medication: '',
      class: '',
      description: '',
      dosage: '',
      frequency: '',
      timing: [''],
    });
    setSelectedMedicationId('');
    setIsNewMedication(false);
    await fetchDosageStatus();
  } catch (error) {
    console.log('Add error:', error);
    alert('Failed to add medication/dosage: ' + error.message);
  }
};
  

if (loading) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator size="large" color="#2a4fbf" />
    </View>
  );
}

     const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("isLoggedIn");
      await AsyncStorage.removeItem("userType");
      // Navigate to login or welcome screen
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert("Logout failed", "Please try again.");
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.topMenu} />
      <View style={styles.grid}>
        {/* Side Menu */}
       <View style={[styles.sideMenu, { width: 65 }]}>
                                        {/* Side Menu Icons */}
                                     <View>
                                    <Pressable onPress={()=> navigation.navigate('CaregiverProfile',{email:email,id:id}) } style={[styles.profileIcon, { marginTop: 0, marginBottom: 30 }]}>
                                      <View style={styles.profileStatus}></View>
                                    </Pressable>
                                    </View>
                                        <View style={[{ marginTop: 50 }]}>
                                          <Pressable onPress={() => navigation.navigate('Dashboard',{email:email,id:id})}>
                                            <Icon name="home-outline" style={[styles.Icon]} />
                                          </Pressable>
                                        </View>
                                        <View style={{ marginTop: 50 }}>
                                          <Pressable onPress={() => navigation.navigate('PatientDetails',{email:email,id:id})}>
                                            <Icon name="people-outline" style={[styles.Icon]} />
                                          </Pressable>
                                        </View>
                     
                                         <View style={{ marginTop: 50 }}>
                                           <Pressable onPress={() => navigation.navigate('CarePlan',{patient_id: patient._id, email:email,id:id})}>
                                            <Icon name="nutrition-outline" style={[styles.selectedIcon]} />
                                           </Pressable>
                                        </View>
                                        <View style={{ marginTop: 50 }}>
                                           <Pressable onPress={() => navigation.navigate('Location',{patientId: patient._id})}>
                                            <Icon name="location-outline" style={[styles.Icon]} />
                                           </Pressable>
                                        </View>
                                    
                                        <View style={{ flex: 1 }} />
                                                        {/* Exit Icon */}
                                                        <View style={{ marginBottom: 100 }}>
                                                           <Pressable onPress={handleLogout}>
                                                            <Icon name="exit-outline" style={[styles.Icon]} />
                                                           </Pressable>
                                                        </View>
                                              
                              
                                      </View>
       

        {/* Main Content */}
        <ScrollView style={[styles.mainContent, { marginLeft: 80 }]}>
          {/* Info Card */}
          <View style={styles.infoCard}>
                      <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 40, marginBottom: 5 }}>
                          <Icon name="person-circle-outline" size={28} color="white" />
                        </View>
                        <View style={{ marginLeft: 3 }}>
                          <Text style={styles.label}>Name: {patient.name}</Text>
                          <Text style={styles.label}>Gender: {patient.gender}</Text>
                          <Text style={styles.label}>Age: {patient.age}</Text>
                          <View style={{ flexDirection: 'row', }}>
                            <Text style={styles.label}>Status: </Text>
                            <View style={styles.statusBadge}>
                              <Text style={styles.statusText}> {patient.status}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>

          {/* Add/Edit Buttons on Top */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
            <TouchableOpacity
              onPress={() => setShowAddModal(true)}
              style={{
                backgroundColor: '#2a4fbf',
                borderRadius: 8,
                paddingVertical: 8,
                paddingHorizontal: 18,
                marginRight: 10,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Medication</Text>
            </TouchableOpacity>
            {/* Optionally, you can add a generic Edit button here if needed */}
          </View>

          {/* Medication Block in ScrollView */}
          <View
            style={{
              backgroundColor: '#e5f0ff',
              borderRadius: 14,
              padding: 14,
              marginBottom: 18,
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginBottom: 10 }}>
              Medication
            </Text>
            {allStatusRows.length === 0 ? (
              <Text style={{ color: '#888', fontSize: 13, padding: 8 }}>No medications found.</Text>
            ) : (
              allStatusRows.map((row, idx) => (
                <View
                  key={idx}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    marginBottom: 10,
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOpacity: 0.04,
                    shadowRadius: 2,
                    elevation: 1,
                  }}
                >
                  <View style={{ flex: 2 }}>
                    <Text style={{ fontWeight: 'bold', color: '#2a4fbf', fontSize: 15 }}>{row.medication}</Text>
                    <Text style={{ color: '#23395D', fontSize: 13 }}>Dosage: {row.dosage}</Text>
                    <Text style={{ color: '#23395D', fontSize: 13 }}>Timing: {row.timing}</Text>
                  </View>
                  {/* Status with tick/cross */}
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                      {row.status === 'Taken' && (
                        <>
                          <Icon name="checkmark-circle" size={20} color="#4caf50" />
                          <Text style={{ color: '#4caf50', marginLeft: 4, fontWeight: 'bold' }}>Taken</Text>
                        </>
                      )}
                      {row.status === 'Missed' && (
                        <>
                          <Icon name="close-circle" size={20} color="#e53935" />
                          <Text style={{ color: '#e53935', marginLeft: 4, fontWeight: 'bold' }}>Missed</Text>
                        </>
                      )}
                      {!row.status && (
                        <Text style={{ color: '#888' }}>-</Text>
                      )}
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 6 }}>
                      <TouchableOpacity onPress={() => handleEdit(row)}>
                        <Icon name="create-outline" size={20} color="#2a4fbf" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDelete(row)} style={{ marginLeft: 10 }}>
                        <Icon name="trash-outline" size={20} color="#e53935" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Edit Modal */}
          <Modal visible={showEditModal} transparent animationType="fade" onRequestClose={() => setShowEditModal(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text>Edit Dosage</Text>
                <Text style={{ marginBottom: 8, fontWeight: 'bold' }}>
                  Medication: {editRow?.medication}
                </Text>
                <TextInput
                  value={editRow?.dosage}
                  onChangeText={text => setEditRow({ ...editRow, dosage: text })}
                  placeholder="Dosage"
                  style={styles.input}
                />
                <TextInput
                  value={editRow?.timing}
                  onChangeText={text => setEditRow({ ...editRow, timing: text })}
                  placeholder="Timing"
                  style={styles.input}
                />
                <TouchableOpacity onPress={handleSaveEdit} style={styles.saveButton}>
                  <Text style={{ color: 'white' }}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowEditModal(false)} style={styles.cancelButton}>
                  <Text style={{ color: 'white' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Add Modal */}
          <Modal
  visible={showAddModal}
  transparent
  animationType="fade"
  onRequestClose={() => setShowAddModal(false)}
>
  <View style={styles.modalOverlay}>
    <View
      style={{
        backgroundColor: '#e5f0ff',
        borderRadius: 18,
        padding: 22,
        width: '92%',
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#2a4fbf', marginBottom: 14, textAlign: 'center' }}>
        Add Medication
      </Text>
      <Picker
        selectedValue={selectedMedicationId}
        onValueChange={(itemValue) => {
          setSelectedMedicationId(itemValue);
          setIsNewMedication(itemValue === 'new');
        }}
        style={[styles.input, { backgroundColor: '#fff', marginBottom: 10 }]}
      >
        <Picker.Item label="Select existing medication..." value="" />
        {medications.map(med => (
          <Picker.Item key={med._id} label={med.name} value={med._id} />
        ))}
        <Picker.Item label="Add new medication..." value="new" />
      </Picker>
      {isNewMedication && (
        <>
          <TextInput
            value={newMedication.medication}
            onChangeText={text => setNewMedication({ ...newMedication, medication: text })}
            placeholder="Medication Name"
            style={styles.input}
            placeholderTextColor="#888"
          />
          <TextInput
            value={newMedication.class}
            onChangeText={text => setNewMedication({ ...newMedication, class: text })}
            placeholder="Class"
            style={styles.input}
            placeholderTextColor="#888"
          />
          <TextInput
            value={newMedication.description}
            onChangeText={text => setNewMedication({ ...newMedication, description: text })}
            placeholder="Description"
            style={styles.input}
            placeholderTextColor="#888"
          />
        </>
      )}
      <TextInput
        value={newMedication.dosage}
        onChangeText={text => setNewMedication({ ...newMedication, dosage: text })}
        placeholder="Dosage"
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        value={newMedication.frequency}
        onChangeText={text => setNewMedication({ ...newMedication, frequency: text })}
        placeholder="Frequency"
        style={styles.input}
        placeholderTextColor="#888"
      />
      <Text style={{ fontWeight: 'bold', color: '#2a4fbf', marginTop: 10, marginBottom: 6 }}>
        Timing(s)
      </Text>
      {newMedication.timing.map((time, idx) => (
        <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <TextInput
            value={time}
            onChangeText={text => {
              const newTiming = [...newMedication.timing];
              newTiming[idx] = text;
              setNewMedication({ ...newMedication, timing: newTiming });
            }}
            placeholder={`Timing #${idx + 1}`}
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholderTextColor="#888"
          />
          {newMedication.timing.length > 1 && (
            <TouchableOpacity
              onPress={() => {
                const newTiming = newMedication.timing.filter((_, i) => i !== idx);
                setNewMedication({ ...newMedication, timing: newTiming });
              }}
              style={{ marginLeft: 8 }}
            >
              <Icon name="remove-circle-outline" size={24} color="#e53935" />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity
        onPress={() => setNewMedication({ ...newMedication, timing: [...newMedication.timing, ''] })}
        style={[styles.saveButton, { backgroundColor: '#2a4fbf', marginTop: 8, marginBottom: 8 }]}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Time</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAddNew} style={[styles.saveButton, { marginTop: 8 }]}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowAddModal(false)} style={[styles.cancelButton, { marginTop: 8 }]}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
        </ScrollView>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  mainContent: {
     paddingTop:30,
     width: Dimensions.get('window').width - 93,
     height: '100%',
      flex: 1,
      marginTop:20,
   },
   grid: {
     top: 0,
     left: 0,
     flex: 1,
     width: '100%',
     height: '100%',
     flexDirection: 'column',
     flexWrap: 'wrap',
     justifyContent: 'space-between',
     paddingTop: 60,
   },
   container: {
     flex: 1,
     justifyContent: 'flex-start',
     alignItems: 'center',
     backgroundColor: 'white',
     flexDirection:'column',
   },
   title: {
     fontSize: 24,
     fontWeight: 'bold',
     color: '#333',
   },
   sideMenu: {
     flex:1,
     position: 'absolute',
     top: 0,
     left: 0,
     width: 65,
     height: Dimensions.get('window').height,
     backgroundColor: 'white',
     shadowColor: '#000',
     shadowOffset: {
       width: 0,
       height: 2,
     },
     shadowOpacity: 0.25,
     shadowRadius: 3.84,
     elevation: 5,
     flexDirection: 'column',
     padding: 10,
     alignItems: 'center',
     marginTop: 10,
   },
   topMenu: {
     position: 'absolute',
     top: 0,
     left: 0,
     width: '100%',
     height: 60,
     backgroundColor: 'white',
     shadowColor: '#000',
     shadowOffset: {
       width: 0,
       height: 2,
     },
     shadowOpacity: 0.25,
     shadowRadius: 3.84,
     elevation: 5,
     marginBottom:70,
   },
   infoCard: {
    backgroundColor: '#2d53c8',
    borderRadius: 15,
    paddingLeft: 10,
    width: 150,
    height:130,
    justifyContent: 'flex-start',
    paddingTop: 7,
    marginBottom: 15,
  },
 label: {
    color: '#fff',
    fontSize: 11,
    marginTop: 2,
    marginBottom: 2,
  },
  statusBadge: {
    backgroundColor: '#e99cb0',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#c85660',
    fontWeight: 'bold',
    fontSize: 11,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  patientRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 6,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    elevation: 1,
  },
  patientCell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    width: '90%',
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginVertical: 6,
    backgroundColor: '#fff',
  },
  selectedIcon: {
  width: 40,
  height: 40,
  fontSize: 20,
  color: '#5961b8',
  backgroundColor: '#e8eaf6',
  borderRadius: 10,
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 10,
  },
  Icon: {
    fontSize: 20,
    color: '#5961b8',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#fa745f',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
    profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#e8eaf6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileStatus: {
    position: 'absolute',
    top: 30,
    left: 27,
    width: 12,
    height: 12,
    backgroundColor: '#5961b8',
    borderRadius: 30,
  },

});


export default MedicationPlan;