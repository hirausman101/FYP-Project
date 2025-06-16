import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, Dimensions, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import API_BASE_URL from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Item {
  _id: string;
  Name: string;
  Gender: string;
  Status: string;
}

const PatientDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { email, id } = route.params || {};
  const [patients, setPatients] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true); // Start loading
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(
          `${API_BASE_URL}/profile?email=${email}&id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        if (data.status === "ok" && data.data && data.data.items_id) {
          setPatients(data.data.items_id);
        } else {
          setPatients([]);
        }
      } catch (error) {
        setPatients([]);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchPatients();

  }, []);

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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#2a4fbf" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topMenu} />
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
                                      
                       <View style={{ flex: 1 }} />
                                      {/* Exit Icon */}
                                      <View style={{ marginBottom: 100 }}>
                                         <Pressable onPress={handleLogout}>
                                          <Icon name="exit-outline" style={[styles.Icon]} />
                                         </Pressable>
                                      </View>
                            
            
                    </View>
        <View style={styles.mainContent}>
          <ScrollView>
            <Text style={styles.patientRowText}>Patients View:</Text>
            <View style={styles.separator} />
            <View style={styles.tableHeader}>
  <View style={{ flex: 2 }}>
    <Text style={styles.headerCell}>Name</Text>
  </View>
  <View style={{ flex: 1.2 }}>
    <Text style={styles.headerCell}>Gender</Text>
  </View>
  <View style={{ flex: 1.2 }}>
    <Text style={styles.headerCell}>Status</Text>
  </View>
  <View style={{ flex: 1.2 }}>
    <Text style={styles.headerCell}>Action</Text>
  </View>
</View>

{patients.length === 0 && (
  <Text style={{ textAlign: 'center', color: '#888', marginVertical: 20 }}>
    No patients assigned.
  </Text>
)}

{patients.map((patient, index) => (
  <View
    key={patient._id}
    style={[
      styles.patientRow,
      { backgroundColor: index % 2 === 0 ? '#f6f8ff' : '#fff' }
    ]}
  >
    <View style={{ flex: 2 }}>
      <Text style={styles.patientCell}>{patient.Name}</Text>
    </View>
    <View style={{ flex: 1.2 }}>
      <Text style={styles.patientCell}>{patient.Gender}</Text>
    </View>
    <View style={{ flex: 1.2 }}>
      <View style={[
        styles.statusBadge,
        patient.Status === 'Critical' ? styles.criticalStatus : styles.normalStatus
      ]}>
        <Text
          style={[
            styles.statusText,
            patient.Status === 'Critical' ? styles.criticalText : styles.normalText
          ]}
        >
          {patient.Status}
        </Text>
      </View>
    </View>
    <View style={{ flex: 1.2 }}>
      <Pressable
        style={styles.viewButton}
        onPress={() => navigation.navigate('Patient', { patientId: patient.patient_id, email: email, id: id })}
      >
        <Text style={styles.viewButtonText}>View</Text>
      </Pressable>
    </View>
  </View>
))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  mainContent: {
    flex: 1,
    marginLeft: 70,
    marginTop: 80,
    padding: 10,
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#e8eaf6',
    borderRadius: 30,
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
  patientRowText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  separator: {
    marginTop: 30,
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
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
    borderBottomColor: '#e0e0e0',
    paddingBottom: 6,
    marginBottom: 6,
    marginTop: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#222',
    textAlign: 'left',
    paddingLeft: 8,
  },
  patientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 4,
    paddingVertical: 6,
    paddingHorizontal: 0,
  },
  patientCell: {
    flex: 1,
    fontSize: 13,
    color: '#222',
    textAlign: 'left',
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    maxWidth: 50,
    alignSelf: 'center',
  },
  criticalStatus: {
    backgroundColor: '#e99cb0',
  },
  normalStatus: {
    backgroundColor: '#b2f1b2',
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  criticalText: {
    color: '#c85660',
  },
  normalText: {
    color: '#2e7d32',
  },
  viewButton: {
    backgroundColor: '#2a4fbf',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    minWidth: 30,
    maxWidth: 45,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PatientDetails;