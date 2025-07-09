import React, { useEffect, useState } from 'react';
import {Modal, View, Text, StyleSheet, Dimensions, ScrollView, processColor, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LineChart } from 'react-native-charts-wrapper';

import { useNavigation,useRoute} from '@react-navigation/native';

import  API_BASE_URL from './config'; // Adjust the import path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';


const Patient = ({ route }) => {
  const navigation = useNavigation();
  const { patientId ,email, id} = route.params;
  const [patient, setPatient] = useState(null);
  const [showUpdatesModal, setShowUpdatesModal] = useState(false);
const [selectedDosage, setSelectedDosage] = useState(null);
const [showDosageModal, setShowDosageModal] = useState(false);
const [graphData, setGraphData] = useState(null);
const [loading, setLoading] = useState(true);

 const chartConfigBase = {
    backgroundColor: 'white',
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    decimalPlaces: 0,

    propsForBackgroundLines: {
      stroke: '#e3e3e3',
    },
    propsForLabels: {
      fontSize: 6,
    },
  };


useEffect(() => {
  const fetchPatientById = async (id) => {
    setLoading(true); // Start loading
    try {
      console.log('Fetching patient with id:', patientId);
      const response = await fetch(`${API_BASE_URL}/patientData/${id}`);
      if (!response.ok) throw new Error('Patient not found');
      const data = await response.json();
      setPatient(data);

      // Use tremorsInformation.values directly if present
      if (data.tremorsInformation?.values && Array.isArray(data.tremorsInformation.values)) {
        setGraphData({
          dataSets: [
            {
              values: data.tremorsInformation.values,
              label: 'Tremors',
              config: {
                mode: 'CUBIC_BEZIER',
                drawFilled: true,
                fillColor: processColor('#fce17c'),
                color: processColor('#edcf61'),
                lineWidth: 2,
                drawCircles: false,
                drawValues: false,
              },
            },
          ],
        });
      } else if (data.tremorsInformation?._id) {
        // fallback: fetch by oid if only oid is present
        const tremorId = data.tremorsInformation._id;
        const tremorRes = await fetch(`${API_BASE_URL}/tremors/${tremorId}`);
        if (tremorRes.ok) {
          const tremorJson = await tremorRes.json();
          setGraphData({
            dataSets: [
              {
                values: tremorJson.values,
                label: 'Tremors',
                config: {
                  mode: 'CUBIC_BEZIER',
                  drawFilled: true,
                  fillColor: processColor('#fce17c'),
                  color: processColor('#edcf61'),
                  lineWidth: 2,
                  drawCircles: false,
                  drawValues: false,
                },
              },
            ],
          });
        } else {
          setGraphData({ dataSets: [] });
        }
      } else {
        setGraphData({ dataSets: [] });
      }
    } catch (error) {
      console.error('Error fetching patient or tremors data:', error);
      setPatient(null);
      setGraphData({ dataSets: [] });
    } finally {
      setLoading(false); // Stop loading
    }
  };
  if (patientId) fetchPatientById(patientId);
}, [patientId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2a4fbf" />
      </View>
    );
  }

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
           <Text style={{ marginLeft: 80, marginTop: 17, fontSize: 18 }}>Assigned Patients:</Text>
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
                             <Icon name="people-outline" style={[styles.selectedIcon]} />
                           </Pressable>
                         </View>
                        
                          <View style={{ marginTop: 50 }}>
                            <Pressable onPress={() => navigation.navigate('CarePlan',{patient_id: patient._id, email:email,id:id})}>
                             <Icon name="nutrition-outline" style={[styles.Icon]} />
                            </Pressable>
                         </View>
                         <View style={{ marginTop: 50 }}>
                            <Pressable onPress={() => navigation.navigate('Location',{patientId: patient._id})}>
                             <Icon name="location-outline" style={[styles.Icon]} />
                            </Pressable>
                         </View>
                     <View style={{ flex: 1 }} />
                         <View style={{ marginBottom: 100 }}>
                            <Pressable onPress={handleLogout}>
                             <Icon name="exit-outline" style={[styles.Icon]} />
                            </Pressable>
                         </View>
               
                       </View>

            <Modal
              visible={showUpdatesModal}
              transparent
              animationType="fade"
              onRequestClose={() => setShowUpdatesModal(false)}
            >
              <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.4)',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <View style={{
                  backgroundColor: 'white',
                  borderRadius: 14,
                  padding: 20,
                  width: '80%',
                  maxHeight: '70%',
                  elevation: 5,
                }}>
                  <Text style={{fontWeight: 'bold', fontSize: 17, marginBottom: 10}}>Doctor Updates</Text>
                  <ScrollView>
                    <Text style={{fontSize: 14, color: 'black'}}>
                      {patient?.updates || "No updates available."}
                    </Text>
                  </ScrollView>
                  <TouchableOpacity
                    onPress={() => setShowUpdatesModal(false)}
                    style={{
                      marginTop: 20,
                      alignSelf: 'flex-end',
                      backgroundColor: '#2a4fbf',
                      borderRadius: 8,
                      paddingVertical: 6,
                      paddingHorizontal: 18,
                    }}
                  >
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

      

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
                  backgroundColor: '#e5f0ff',
                  borderRadius: 14,
                  padding: 10,
                  width: '90%',
                  maxHeight: '70%',
                  elevation: 5,
                }}>
                  <Text style={{fontWeight: 'bold', fontSize: 17, marginBottom: 10}}>All Dosages</Text>
                  <View style={styles.tableHeader}>
                    <Text style={[styles.headerCell, { flex: 2 }]}>Medication</Text>
                    <Text style={styles.headerCell}>Dosage</Text>
                    <Text style={styles.headerCell}>Timing</Text>
                    <Text style={styles.headerCell}>Frequency</Text>
                  </View>
                  <ScrollView>
                    {Array.isArray(patient.dosageInformation) && patient.dosageInformation.map((dosage, idx) => (
                      <View key={idx} style={styles.patientRow}>
                        <Text style={[styles.patientCell, { flex: 2 }]}>{dosage.medication_id?.name || ''}</Text>
                        <Text style={styles.patientCell}>{dosage.dosage_amount}</Text>
                        <Text style={styles.patientCell}>
                          {Array.isArray(dosage.timing) ? dosage.timing.join('\n') : dosage.timing}
                        </Text>
                        <Text style={styles.patientCell}>{dosage.frequency}</Text>
                      </View>
                    ))}
                  </ScrollView>
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
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

        <ScrollView style={[styles.mainContent]}>
          <View style={styles.topRow}>
            <View style={styles.infoCard}>
              <View style={{flexDirection:'column'}}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start',gap: 40, marginBottom: 5 }}>
                <Icon name="person-circle-outline" size={28} color="white" />
              </View>
               <View style={{ marginLeft:3 }}>
                  <Text style={styles.label}>Name: {patient.name}</Text>
                  <Text style={styles.label}>Gender: {patient.gender}</Text>
                  <Text style={styles.label}>Age: {patient.age}</Text>
                  <View style={{flexDirection:'row',}}>
                    <Text style={styles.label}>Status: </Text>
                     <View style={styles.statusBadge}>
                    <Text style={styles.statusText}> {patient.status}</Text>
                  </View>
                  </View>
                </View>
            </View>
            </View>
            <View style={styles.emergencyCard}>
              <Text style={styles.emergencyHeader}>Emergency Contact</Text>
              <Text style={styles.emergencyLabel}>Name: {patient.emergencyContact?.name}</Text>
              <Text style={styles.emergencyLabel}>Relationship: {patient.emergencyContact?.relationship}</Text>
              <Text style={styles.emergencyLabel}>Contact: {patient.emergencyContact?.phone}</Text>
            </View>
          </View>
  
          <View style={styles.infoBlock}>
             <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                    <Icon name="call-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
                    <Text style={styles.label}>Phone Number: {patient.phonenumber}</Text>
                  </View>
                   <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Icon name="location-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
                    <Text style={styles.label}>Address: {patient.address}</Text>
                  </View>
                </View>

          <View style={styles.doctorBlock}>
            <View style={[styles.doctorBlockHeader]}>
              <Text style={{fontSize:14,fontWeight:'bold',}}>Doctors Information:</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', gap: 10,}}>
              <View style={{flexDirection:'column', width: 150,}}>
                <Text style={[styles.label,{fontSize:11}]}>Name: {patient.doctorInformation?.name}</Text>
                <Text style={[styles.label,{fontSize:11}]}>Hospital: {patient.doctorInformation?.hospital}</Text>
              </View>
             <Pressable
                  onPress={() => setShowUpdatesModal(true)}
                  style={{
                    flexDirection: 'column',
                    marginTop: 3,
                    backgroundColor: '#E5E0FF',
                    borderRadius: 10,
                    height: 55,
                    width: 115,
                    overflow: 'hidden',
                  }}
                >
                  <Text style={{fontSize:11,color:'black',padding:3,paddingBottom:0,fontWeight:'bold'}}>Updates: </Text>
                  <Text
                    style={{
                      fontSize:9,
                      color:'black',
                      padding:3,
                      paddingTop:0,
                      paddingBottom: 3,
                    }}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {patient.updates}
                  </Text>
                  <Text style={{color:'#2a4fbf', fontSize:8, textAlign: 'right', paddingRight: 5, paddingBottom: 1}}>
                    Show more ▼
                  </Text>
                </Pressable>
            </View>
          </View>
          
          <View style={styles.medicationBlock}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { flex: 2 }]}>Medication</Text>
              <Text style={styles.headerCell}>Dosage</Text>
              <Text style={styles.headerCell}>Timing</Text>
            </View>
            {Array.isArray(patient.dosageInformation) &&
              patient.dosageInformation.slice(0, 2).map((dosage, idx) => (
                <Pressable
                  key={idx}
                  style={styles.patientRow}
                  onPress={() => {
                    setSelectedDosage(dosage);
                    setShowDosageModal(true);
                  }}
                >
                  <Text style={[styles.patientCell, { flex: 2 }]}>{dosage.medication_id?.name || ''}</Text>
                  <Text style={styles.patientCell}>{dosage.dosage_amount}</Text>
                  <Text style={styles.patientCell}>
                    {Array.isArray(dosage.timing) ? dosage.timing.join(', ') : dosage.timing}
                  </Text>
                </Pressable>
              ))
            }
            {Array.isArray(patient.dosageInformation) && patient.dosageInformation.length > 2 && (
              <Pressable onPress={() => setShowDosageModal(true)}>
                <Text style={{ color: '#2a4fbf', fontSize: 12, marginTop: 4, alignSelf: 'flex-end' }}>
                  +{patient.dosageInformation.length - 2} more...
                </Text>
              </Pressable>
            )}
          </View>
                
          <View style={styles.graphContiner}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Health Overview</Text>
            {graphData && graphData.dataSets && graphData.dataSets.length > 0 ? (
              <LineChart
                data={graphData}
                height={120}
                chartConfig={{
                  ...chartConfigBase,
                }}
                yAxis={{
                  left: {
                    textSize: 8,
                    textColor: processColor('#000'),
                    granularity: 20,
                    granularityEnabled: true,
                  },
                  right: {
                    enabled: false,
                  },
                }}
                xAxis={{
                  position: 'BOTTOM',
                  textSize: 8,
                  textColor: processColor('#000'),
                  valueFormatter: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                  granularity: 1,
                }}
                bezier
                description={{
                  text: '',
                  enabled: false,
                }}
              />
            ) : (
              <Text>No chart data available</Text>
            )}
          </View>

          <View style={{height:70}}></View>

        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 12,
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
    fontSize: 10,
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
  fontSize: 12,
  color: '#222',
  textAlign: 'left',
  paddingLeft:4, 
},
patientRow: {
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 12,
  paddingVertical: 3,
  gap:3,
  borderBottomWidth: 2,     
  borderBottomColor: '#e0e0e0',
},
patientCell: {
  flex: 1,
  fontSize: 10,
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
    fontSize: 21,
    color: '#5961b8',
  },
  mainContent: {
    flex: 1,
    marginLeft: 60,
    marginTop: 70,
    padding: 20,
    marginRight: 10,
  },
  header: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#2a4fbf',
    marginBottom: 20,
    alignSelf: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    gap: 12,
  },
  infoCard: {
    backgroundColor: '#2d53c8',
    borderRadius: 15,
    paddingLeft:10,
    width: 145,
    height:130,
    justifyContent: 'flex-start',
    paddingTop: 7,
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
    fontSize: 12,
  },
  emergencyCard: {
    backgroundColor: '#7b63dd',
    borderRadius: 15,
    paddingLeft: 7,
    paddingTop: 12,
    width: 145,
    height:130,
    justifyContent: 'flex-start',
  },
  emergencyHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 15,
  },
  emergencyLabel: {
    color: '#fff',
    fontSize: 11,
    marginBottom: 4,
  },
  infoBlock: {
    backgroundColor: '#7e8cfb',
    borderRadius: 12,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    marginBottom: 25,
    marginTop: 5,
    width: Dimensions.get('window').width - 93,
    height: 70,
  },
  doctorBlock: {
    backgroundColor: '#9a8ee4',
    borderRadius: 12,
    paddingTop: 5,
    paddingLeft: 7,
    paddingRight: 10,
    paddingBottom:0,
    marginBottom: 25,
    marginTop: 5,
    width: Dimensions.get('window').width - 93,
    height: 100,
  },
  doctorBlockHeader: {
    backgroundColor: '#E5E0FF',
    borderRadius: 10,
    padding:3,
    paddingLeft:7,
    marginBottom: 5,
    width: 285,
    height: 23,
  },
   medicationBlock: {
    backgroundColor: '#e5f0ff',
    borderRadius: 12,
    paddingLeft: 7,
    paddingRight: 10,
    marginBottom: 25,
    marginTop: 5,
    width: Dimensions.get('window').width - 93,
    height: 100,
  },

});

export default Patient;