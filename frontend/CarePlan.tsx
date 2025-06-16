import React, { useEffect, useState, useCallback } from 'react';
import { Modal, View, Text, StyleSheet, Dimensions, ScrollView, Pressable, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import API_BASE_URL from './config';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



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
  const [showAllNotesModal, setShowAllNotesModal] = useState(false);
  const [showAddNotesModal, setShowAddNotesModal] = useState(false);
  const [loading, setLoading] = useState(true);

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
    console.log('Adding note:', content); // Debugging log
    console.log('Patient ID:', patient_id); // Debugging log
    console.log('Caregiver ID:', id); // Debugging log
    if (!content.trim()) return;
    try {
      await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          patient_id: patient_id,      // camelCase for backend
          caregiver_id: id          // camelCase for backend
          
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

    const fetchAll = async () => {
      setLoading(true);
      try {
        await Promise.all([
          (async () => {
            const response = await fetch(`${API_BASE_URL}/patientData/${patient_id}`);
            if (!response.ok) throw new Error('Patient not found');
            const data = await response.json();
            setPatient(data);
          })(),
          (async () => {
            const response = await fetch(`${API_BASE_URL}/dosage_status/${patient_id}`);
            if (!response.ok) throw new Error('Dosage status not found');
            const data = await response.json();
            setDosageStatus(data);
          })(),
          fetchNotes(),
        ]);
      } catch (error) {
        setPatient(null);
        setDosageStatus([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
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
          <View style={{ flexDirection: 'row', gap: 15, marginBottom: 15 }}>
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

          {/* Notes Preview Card */}
          <Pressable
            onPress={() => setShowAllNotesModal(true)}
            style={{
              backgroundColor: '#e5f0ff',
              borderRadius: 12,
              padding: 12,
              width: 150,
              height:130,
              justifyContent: 'flex-start',
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 2,
              elevation: 1,
              marginLeft: 0,
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#2a4fbf', marginBottom: 4 }}>
              Notes
            </Text>
            {notes.length > 0 ? (
              <>
                {notes.slice(0, 2).map((note, idx) => (
                  <View
                    key={note._id}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 8,
                      padding: 6,
                      marginBottom: 4,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        color: '#23395D',
                        fontSize: 12,
                        marginBottom: 2,
                      }}
                    >
                      {note.content}
                    </Text>
                    <Text style={{ color: '#888', fontSize: 10 }}>
                      {new Date(note.timestamp).toLocaleString()}
                    </Text>
                  </View>
                ))}
                {notes.length > 2 && (
                  <Text style={{ color: '#2a4fbf', fontSize: 11, textAlign: 'right' }}>
                    +{notes.length - 2} more, tap to view all
                  </Text>
                )}
              </>
            ) : (
              <Text style={{ color: '#888', fontSize: 12, marginTop: 8 }}>
                No notes yet. Tap to add!
              </Text>
            )}
          </Pressable>
        </View>

          {/* Medication Block */}
          <Pressable onPress={() => setShowDosageModal(true)}>
            <View style={styles.medicationBlock}>
              <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, { flex: 2 }]}>Medication</Text>
                <Text style={styles.headerCell}>Dosage</Text>
                <Text style={styles.headerCell}>Timing</Text>
                <Text style={styles.headerCell}>Status</Text>
              </View>
              {allStatusRows.length === 0 ? (
                <Text style={{ color: '#888', fontSize: 12, padding: 8 }}>No medications found.</Text>
              ) : (
                <>
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
                        {(row.status == null || row.status === '') && (
                          <Icon name="remove" size={16} color="black" />
                        )}
                      </View>
                    </View>
                  ))}
                  {allStatusRows.length > 2 && (
                    <Text style={{ color: '#2a4fbf', fontSize: 11, marginTop: 4, alignSelf: 'flex-end' }}>
                      +{allStatusRows.length - 2} more...
                    </Text>
                  )}
                </>
              )}
            </View>
          </Pressable>


            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Daily Routine & Status:</Text>
           
              <View style={{
                backgroundColor: '#e5e3ff',
                marginBottom: 15,
                marginTop: 20,
                borderRadius: 16,
                padding: 14,
                width: Dimensions.get('window').width - 93,
                minHeight: 110,
                justifyContent: 'space-between',
                shadowColor: '#000',
                shadowOpacity: 0.06,
                shadowRadius: 2,
                elevation: 2,
              }}>
                <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 6 }}>Physical Therapy and Exercise:</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                  <Icon name="checkmark-circle" size={16} color="#4caf50" style={{ marginRight: 4 }} />
                  <Text style={{ fontSize: 11 }}>Balance Training</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                  <Icon name="checkmark-circle" size={16} color="#4caf50" style={{ marginRight: 4 }} />
                  <Text style={{ fontSize: 11 }}>Memory Exercise</Text>
                </View>
                <View style={{ position: 'absolute', right: 10, bottom: 10 }}>
                  <View style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    width: 36,
                    height: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOpacity: 0.08,
                    shadowRadius: 2,
                    elevation: 2,
                  }}>
                    <Text style={{ fontWeight: 'bold', color: '#7b63dd', fontSize: 13 }}>20%</Text>
                  </View>
                </View>
                <Icon name="fitness-outline" size={28} color="#7b63dd" style={{ position: 'absolute', top: 10, right: 10, opacity: 0.3 }} />
              </View>

              <View style={{
                backgroundColor: '#ffeaea',
                marginTop: 10,
                marginBottom: 15,
                borderRadius: 16,
                padding: 14,
                width: Dimensions.get('window').width - 93,
                minHeight: 110,
                justifyContent: 'space-between',
                shadowColor: '#000',
                shadowOpacity: 0.06,
                shadowRadius: 2,
                elevation: 2,
              }}>
                <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 6 }}>Dietary Guidelines:</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                  <Icon name="ellipse" size={10} color="#f79902" style={{ marginRight: 4 }} />
                  <Text style={{ fontSize: 11 }}>Breakfast:</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                  <Icon name="ellipse" size={10} color="#f79902" style={{ marginRight: 4 }} />
                  <Text style={{ fontSize: 11 }}>Lunch:</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                  <Icon name="ellipse" size={10} color="#f79902" style={{ marginRight: 4 }} />
                  <Text style={{ fontSize: 11 }}>Dinner:</Text>
                </View>
                <View style={{ position: 'absolute', right: 10, bottom: 10 }}>
                  <View style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    width: 36,
                    height: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOpacity: 0.08,
                    shadowRadius: 2,
                    elevation: 2,
                  }}>
                    <Text style={{ fontWeight: 'bold', color: '#f79902', fontSize: 13 }}>20%</Text>
                  </View>
                </View>
                <Icon name="restaurant-outline" size={28} color="#f79902" style={{ position: 'absolute', top: 10, right: 10, opacity: 0.3 }} />
              </View>
           
           
              <View style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 10,
                flex: 1,
                marginRight: 8,
                marginTop:20,
                minHeight: 50,
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOpacity: 0.06,
                shadowRadius: 2,
                elevation: 1,
              }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', marginBottom: 4, marginTop:20}}>Check Appointments:</Text>
                <View style={{
                  backgroundColor: '#f0f0f0',
                  borderRadius: 8,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  alignSelf: 'flex-start',
                }}>
                  <Text style={{ fontSize: 12, color: '#333' }}>Today's Appointment</Text>
                </View>
              </View>
         

        </ScrollView>
      </View>

      {/* --- Modal for All Notes --- */}
      <Modal
        visible={showAllNotesModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAllNotesModal(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 14,
            padding: 18,
            width: '90%',
            maxHeight: '80%',
            elevation: 5,
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, color: '#2a4fbf' }}>
              Notes
            </Text>
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
                backgroundColor: '#2a4fbf',
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 18,
                alignSelf: 'center',
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}
              onPress={handleAddNote}
            >
              <Icon name="add-circle-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>
                Add Note
              </Text>
            </TouchableOpacity>
            <ScrollView style={{ maxHeight: 200 }}>
              {notes.length === 0 && (
                <Text style={{ textAlign: 'center', color: '#888', marginVertical: 20 }}>
                  No notes yet. Add a note!
                </Text>
              )}
              {notes.map(note => (
                <View
                  key={note._id}
                  style={{
                    backgroundColor: '#f5f7fa',
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 12,
                    shadowColor: '#000',
                    shadowOpacity: 0.04,
                    shadowRadius: 2,
                    elevation: 1,
                    borderWidth: 1,
                    borderColor: '#e0e0e0',
                  }}
                >
                  {editId === note._id ? (
        <>
          <TextInput
            value={editContent}
            onChangeText={setEditContent}
            multiline
            style={{
              borderWidth: 1,
              borderColor: '#2a4fbf',
              borderRadius: 8,
              padding: 8,
              marginBottom: 8,
              color: '#222',
            }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
            <TouchableOpacity
              onPress={() => saveEdit(note._id)}
              style={{
                backgroundColor: '#4caf50',
                borderRadius: 8,
                paddingVertical: 6,
                paddingHorizontal: 14,
                marginRight: 8,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEditId(null);
                setEditContent('');
              }}
              style={{
                backgroundColor: '#ccc',
                borderRadius: 8,
                paddingVertical: 6,
                paddingHorizontal: 14,
              }}
            >
              <Text style={{ color: '#333', fontWeight: 'bold' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>{note.content}</Text>
          <Text style={{ fontSize: 12, color: '#777', marginBottom: 10 }}>
            {new Date(note.timestamp).toLocaleString()}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
            <TouchableOpacity
              onPress={() => {
                setEditId(note._id);
                setEditContent(note.content);
              }}
              style={{ marginRight: 8 }}
            >
              <Icon name="create-outline" size={20} color="#2a4fbf" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteNote(note._id)}
            >
              <Icon name="trash-outline" size={20} color="#e53935" />
            </TouchableOpacity>
          </View>
        </>
      )}
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={{
                backgroundColor: '#2a4fbf',
                borderRadius: 30,
                padding: 10,
                width: '50%',
                alignSelf: 'center',
                marginTop: 10,
              }}
              onPress={() => setShowAllNotesModal(false)}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* --- Modal for Add Note --- */}
      <Modal
        visible={showAddNotesModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddNotesModal(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 14,
            padding: 18,
            width: '90%',
            maxHeight: '80%',
            elevation: 5,
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, color: '#2a4fbf' }}>
              Add Note
            </Text>
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
                backgroundColor: '#2a4fbf',
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 18,
                alignSelf: 'center',
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}
              onPress={() => {
                handleAddNote();
                setShowAddNotesModal(false);
              }}
            >
              <Icon name="add-circle-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>
                Add Note
              </Text>
            </TouchableOpacity>
            <ScrollView style={{ maxHeight: 200 }}>
              {notes.length === 0 && (
                <Text style={{ textAlign: 'center', color: '#888', marginVertical: 20 }}>
                  No notes yet. Add a note!
                </Text>
              )}
              {notes.map(note => (
                <View
                  key={note._id}
                  style={{
                    backgroundColor: '#f5f7fa',
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 12,
                    shadowColor: '#000',
                    shadowOpacity: 0.04,
                    shadowRadius: 2,
                    elevation: 1,
                    borderWidth: 1,
                    borderColor: '#e0e0e0',
                  }}
                >
                  {editId === note._id ? (
        <>
          <TextInput
            value={editContent}
            onChangeText={setEditContent}
            multiline
            style={{
              borderWidth: 1,
              borderColor: '#2a4fbf',
              borderRadius: 8,
              padding: 8,
              marginBottom: 8,
              color: '#222',
            }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
            <TouchableOpacity
              onPress={() => saveEdit(note._id)}
              style={{
                backgroundColor: '#4caf50',
                borderRadius: 8,
                paddingVertical: 6,
                paddingHorizontal: 14,
                marginRight: 8,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEditId(null);
                setEditContent('');
              }}
              style={{
                backgroundColor: '#ccc',
                borderRadius: 8,
                paddingVertical: 6,
                paddingHorizontal: 14,
              }}
            >
              <Text style={{ color: '#333', fontWeight: 'bold' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>{note.content}</Text>
          <Text style={{ fontSize: 12, color: '#777', marginBottom: 10 }}>
            {new Date(note.timestamp).toLocaleString()}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
            <TouchableOpacity
              onPress={() => {
                setEditId(note._id);
                setEditContent(note.content);
              }}
              style={{ marginRight: 8 }}
            >
              <Icon name="create-outline" size={20} color="#2a4fbf" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteNote(note._id)}
            >
              <Icon name="trash-outline" size={20} color="#e53935" />
            </TouchableOpacity>
          </View>
        </>
      )}
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={{
                backgroundColor: '#2a4fbf',
                borderRadius: 30,
                padding: 10,
                width: '50%',
                alignSelf: 'center',
                marginTop: 10,
              }}
              onPress={() => setShowAddNotesModal(false)}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... your styles unchanged ...

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
  medicationBlock: {
    backgroundColor: '#dfeaff',
    borderRadius: 12,
    paddingLeft: 7,
    paddingRight: 10,
    marginBottom: 15,
    marginTop: 10,
    width: Dimensions.get('window').width - 93,
    minHeight: 100, // Use minHeight instead of height
  },
});

export default CarePlan;