import React, { useEffect, useState, useCallback } from 'react';
import { Modal, View, Text, StyleSheet, Dimensions, ScrollView, Pressable, TouchableOpacity, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import API_BASE_URL from './config';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const CarePlan = ({ route }) => {
  const navigation = useNavigation();
  const { patient_id, email, id } = route.params;
  const [patient, setPatient] = useState(null);
  const [dosageStatus, setDosageStatus] = useState([]);
  const [showDosageModal, setShowDosageModal] = useState(false);
  const [selectedDosage, setSelectedDosage] = useState(null);
  const [showAllDosages, setShowAllDosages] = useState(false);
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState('');

  // --- Notes logic ---
  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/notes/${patient_id}`);
      const data = await res.json();
      setNotes(data.reverse());
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch the notes');
    }
  }, [patient_id]);

  const handleAddNote = async () => {
    if (!content.trim()) return;
    try {
      await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: patient_id,      // camelCase for backend
          caregiverId: id,            // camelCase for backend
          content,
        }),
      });
      setContent('');
      fetchNotes();
    } catch (err) {
      Alert.alert('Error', 'Failed to add note');
    }
  };

  const saveEdit = async (noteId) => {
    if (!editContent.trim()) return;
    try {
      await fetch(`${API_BASE_URL}/notes/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContent }),
      });
      setEditId(null);
      setEditContent('');
      fetchNotes();
    } catch (err) {
      Alert.alert('Error', 'Failed to update the note');
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await fetch(`${API_BASE_URL}/notes/${noteId}`, { method: 'DELETE' });
      fetchNotes();
    } catch (err) {
      Alert.alert('Error', 'Failed to delete the note');
    }
  };

  // --- Fetch patient and dosage status ---
  useEffect(() => {
    if (!patient_id) return;

    const fetchDosageStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/dosage_status/${patient_id}`);
        if (!response.ok) throw new Error('Dosage status not found');
        const data = await response.json();
        setDosageStatus(data);
      } catch (error) {
        setDosageStatus([]);
      }
    };

    const fetchPatient = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/patientData/${patient_id}`);
        if (!response.ok) throw new Error('Patient not found');
        const data = await response.json();
        setPatient(data);
      } catch (error) {
        setPatient(null);
      }
    };

    fetchPatient();
    fetchDosageStatus();
    fetchNotes();
  }, [patient_id, fetchNotes]);

  // Refresh notes when returning from NotesPage
  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [fetchNotes])
  );

  // --- Dosage status rows ---
  const allStatusRows = [];
  dosageStatus.forEach(ds => {
    ds.statuses.forEach(statusObj => {
      allStatusRows.push({
        medication: ds.dosage_id?.medication_id?.name || '',
        dosage: ds.dosage_id?.dosage_amount || '',
        timing: statusObj.timing,
        status: statusObj.status,
      });
    });
  });

  if (!patient) {
    return (
      <View style={styles.container}>
        <Text>Loading patient data...</Text>
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
      <View style={styles.topMenu}>
        <Text style={{ marginLeft: 80, marginTop: 17, fontSize: 17 }}>Assigned Patients:</Text>
      </View>
      <View style={styles.grid}>
        <View style={[styles.sideMenu, { width: 65 }]}>
                                 {/* Side Menu Icons */}
                              <View>
                             <Pressable onPress={()=> navigation.navigate('CaregiverProfile',{email:email,id:id}) } style={[styles.profileIcon, { marginTop: 0, marginBottom: 30 }]}>
                               <View style={styles.profileStatus}></View>
                             </Pressable>
                             </View>
                                 <View style={[{ marginTop: 30 }]}>
                                   <Pressable onPress={() => navigation.navigate('Dashboard',{email:email,id:id})}>
                                     <Icon name="home-outline" style={[styles.Icon]} />
                                   </Pressable>
                                 </View>
                                 <View style={{ marginTop: 30 }}>
                                   <Pressable onPress={() => navigation.navigate('PatientDetails',{email:email,id:id})}>
                                     <Icon name="people-outline" style={[styles.Icon]} />
                                   </Pressable>
                                 </View>
              
                                  <View style={{ marginTop: 30 }}>
                                    <Pressable onPress={() => navigation.navigate('CarePlan',{patient_id: patient._id, email:email,id:id})}>
                                     <Icon name="nutrition-outline" style={[styles.Icon]} />
                                    </Pressable>
                                 </View>
                                 <View style={{ marginTop: 30 }}>
                                    <Pressable onPress={() => navigation.navigate('Location',{patientId: patient._id})}>
                                     <Icon name="location-outline" style={[styles.Icon]} />
                                    </Pressable>
                                 </View>
                             
                                 <View style={{ marginTop: 80 }}>
                                    <Pressable onPress={handleLogout}>
                                     <Icon name="exit-outline" style={[styles.Icon]} />
                                    </Pressable>
                                 </View>
                       
                               </View>

        {/* Dosage Modal */}
        <Modal
          visible={showDosageModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowDosageModal(false)}
        >
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              backgroundColor: '#dfeaff',
              borderRadius: 14,
              padding: 10,
              width: '90%',
              maxHeight: '70%',
              elevation: 5,
            }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>All Dosages</Text>
              <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, { flex: 2 }]}>Medication</Text>
                <Text style={styles.headerCell}>Dosage</Text>
                <Text style={styles.headerCell}>Timing</Text>
                <Text style={styles.headerCell}>Status</Text>
              </View>
              <ScrollView>
                {allStatusRows.map((row, idx) => (
                  <View key={idx} style={styles.patientRow}>
                    <Text style={[styles.patientCell, { flex: 2 }]}>{row.medication}</Text>
                    <Text style={styles.patientCell}>{row.dosage}</Text>
                    <Text style={styles.patientCell}>{row.timing}</Text>
                    <Text style={styles.patientCell}>
                      {row.status === 'Taken' && (
                        <Icon name="checkmark" size={16} color="green" />
                      )}
                      {row.status === 'Missed' && (
                        <Icon name="close" size={16} color="red" />
                      )}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity
                onPress={() => {
                  setShowDosageModal(false);
                  setTimeout(() => {
                    navigation.navigate('MedicationPlan', { patientId: patient_id, email: email, id: id });
                  }, 300);
                }}
                style={{
                  marginTop: 10,
                  alignSelf: 'flex-end',
                  backgroundColor: '#4caf50',
                  borderRadius: 8,
                  paddingVertical: 6,
                  paddingHorizontal: 18,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Edit Plan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowDosageModal(false)}
                style={{
                  marginTop: 20,
                  alignSelf: 'flex-end',
                  backgroundColor: '#2a4fbf',
                  borderRadius: 8,
                  paddingVertical: 6,
                  paddingHorizontal: 18,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <ScrollView style={[styles.mainContent]}>
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

          <Pressable onPress={() => { setShowDosageModal(true); }}>
            <View style={styles.medicationBlock}>
              <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, { flex: 2 }]}>Medication</Text>
                <Text style={styles.headerCell}>Dosage</Text>
                <Text style={styles.headerCell}>Timing</Text>
                <Text style={styles.headerCell}>Status</Text>
              </View>
              {allStatusRows.slice(0, 2).map((row, idx) => (
                <View key={idx} style={styles.patientRow}>
                  <Text style={[styles.patientCell, { flex: 2 }]}>{row.medication}</Text>
                  <Text style={styles.patientCell}>{row.dosage}</Text>
                  <Text style={styles.patientCell}>{row.timing}</Text>
                  <View style={[styles.patientCell, { flexDirection: 'row', alignItems: 'center' }]}>
                    {row.status === 'Taken' && (
                      <Icon name="checkmark" size={16} color="green" />
                    )}
                    {row.status === 'Missed' && (
                      <Icon name="close" size={16} color="red" />
                    )}
                    {row.status === 'null' && (
                      <Icon name="remove" size={16} color="black" />
                    )}
                  </View>
                </View>
              ))}
            </View>
          </Pressable>
          <View style={{ height: 70 }}></View>
        </ScrollView>

       {/* Notes Section */}
<View style={{ marginTop: 20 }}>
  <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Notes</Text>
  <TextInput
    style={{
      color: '#23395D',
      backgroundColor: '#F0F4FF',
      borderWidth: 1,
      borderColor: 'black',
      padding: 8,
      marginBottom: 10,
      borderRadius: 30,
    }}
    multiline
    placeholder='Write a note here :)'
    placeholderTextColor='#A0B3D6'
    value={content}
    onChangeText={setContent}
  />
  <TouchableOpacity
    style={{
      backgroundColor: '#7886C7',
      borderRadius: 30,
      padding: 10,
      width: '50%',
      alignSelf: 'center',
      marginBottom: 20,
    }}
    onPress={handleAddNote}
  >
    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
      Add Note
    </Text>
  </TouchableOpacity>

  <ScrollView style={{ maxHeight: 300 }}>
    {notes.length === 0 && (
      <Text style={{ textAlign: 'center', color: '#888', marginVertical: 20 }}>
        No notes yet. Add a note!
      </Text>
    )}
    {notes.map(note => (
      <View
        key={note._id}
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          marginBottom: 15,
        }}
      >
        {editId === note._id ? (
          <>
            <TextInput
              style={{
                color: '#23395D',
                backgroundColor: '#F0F4FF',
                borderWidth: 1,
                borderColor: 'black',
                padding: 8,
                marginBottom: 10,
                borderRadius: 30,
              }}
              value={editContent}
              onChangeText={setEditContent}
              multiline
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#007bff',
                padding: 8,
                borderRadius: 30,
                marginBottom: 5,
                width: '65%',
                alignSelf: 'center',
                alignItems: 'center',
              }}
              onPress={() => saveEdit(note._id)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#007bff',
                padding: 8,
                borderRadius: 30,
                marginBottom: 5,
                width: '65%',
                alignSelf: 'center',
                alignItems: 'center',
              }}
              onPress={() => setEditId(null)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>{note.content}</Text>
            <Text style={{ fontSize: 12, color: '#777', marginBottom: 10 }}>
              {new Date(note.timestamp).toLocaleString()}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#007bff',
                padding: 8,
                borderRadius: 30,
                marginBottom: 5,
                width: '65%',
                alignSelf: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setEditId(note._id);
                setEditContent(note.content);
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#dc3545',
                padding: 8,
                borderRadius: 30,
                marginBottom: 5,
                width: '65%',
                alignSelf: 'center',
                alignItems: 'center',
              }}
              onPress={() => deleteNote(note._id)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Delete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    ))}
  </ScrollView>
</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... your styles unchanged ...
  graphContiner: {
    width: Dimensions.get('window').width - 93,
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 11,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  patientText: {
    flex: 1,
    fontSize: 9,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#67696e',
    paddingBottom: 6,
    marginBottom: 3,
    marginTop: 7,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 11,
    color: '#222',
    textAlign: 'left',
    paddingLeft: 4,
  },
  patientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 3,
    gap: 3,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  patientCell: {
    flex: 1,
    fontSize: 9,
    color: '#222',
    textAlign: 'left',
    paddingLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    elevation: 5,
    zIndex: 2,
    justifyContent: 'center',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 65,
    height: '100%',
    backgroundColor: 'white',
    elevation: 10,
    zIndex: 3,
    alignItems: 'center',
    paddingTop: 10,
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
  selectedIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#e8eaf6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Icon: {
    fontSize: 20,
    color: '#5961b8',
  },
  mainContent: {
    flex: 1,
    marginLeft: 60,
    marginTop: 60,
    padding: 20,
    marginRight: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2a4fbf',
    marginBottom: 20,
    alignSelf: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10,
  },
  infoCard: {
    backgroundColor: '#2d53c8',
    borderRadius: 15,
    paddingLeft: 10,
    width: 145,
    height: 130,
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
  medicationBlock: {
    backgroundColor: '#dfeaff',
    borderRadius: 12,
    paddingLeft: 7,
    paddingRight: 10,
    marginBottom: 15,
    marginTop: 10,
    width: 270,
    height: 100,
  },
});

export default CarePlan;