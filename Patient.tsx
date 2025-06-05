import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Patient = ({ route }) => {
  const navigation = useNavigation();
  const { patientName } = route.params;
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatientByName = async (name) => {
      try {
        const response = await fetch(`http://192.168.100.9:5000/patientData?name=${encodeURIComponent(name)}`);
        if (!response.ok) throw new Error('Patient not found');
        const data = await response.json();
        setPatient(data[0]);
      } catch (error) {
        console.error('Error fetching patient:', error);
        setPatient(null);
      }
    };
    fetchPatientByName(patientName);
  }, [patientName]);

  if (!patient) {
    return (
      <View style={styles.container}>
        <Text>Loading patient data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        <Text style={{ marginLeft: 80, marginTop: 17, fontSize: 17 }}>Patient Profile:</Text>
      </View>
      <View style={styles.grid}>
        <View style={[styles.sideMenu, { width: 65 }]}>
          <View style={[styles.profileIcon, { marginTop: 0 }]}>
            <View style={styles.profileStatus}></View>
          </View>
          <View style={[styles.selectedIcon, { marginTop: 30 }]}>
            <Icon name="search" style={[styles.Icon]} />
          </View>
          <View style={{ marginTop: 30 }}>
            <Pressable onPress={() => navigation.navigate('PatientDetails')}>
              <Icon name="people-outline" style={[styles.Icon]} />
            </Pressable>
          </View>
          <View style={{ marginTop: 30 }}>
            <Icon name="pie-chart-outline" style={[styles.Icon]} />
          </View>
          <View style={{ marginTop: 30 }}>
            <Icon name="settings-outline" style={[styles.Icon]} />
          </View>
          <View style={{ marginTop: 300 }}>
            <Icon name="exit-outline" style={[styles.Icon]} />
          </View>
          <View style={{ marginTop: 30 }}>
            <Icon name="moon-outline" style={[styles.Icon]} />
          </View>
        </View>

        {/* Main Content */}
        <ScrollView style={styles.mainContent}>
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
            <Text style={styles.label}>Phone no.: {patient.phonenumber}</Text>
            <Text style={styles.label}>Address: {patient.address}</Text>
          </View>
          {/* ...rest of your component... */}
        </ScrollView>
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
    marginBottom: 30,
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
    marginTop: 80,
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
    fontSize: 11,
  },
  emergencyCard: {
    backgroundColor: '#7b63dd',
    borderRadius: 15,
    paddingLeft: 7,
    paddingTop: 7,
    width: 115,
    height: 100,
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  emergencyHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11.5,
    marginBottom: 6,
  },
  emergencyLabel: {
    color: '#fff',
    fontSize: 10,
    marginBottom: 2,
  },
  infoBlock: {
    backgroundColor: '#7e8cfb',
    borderRadius: 12,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    marginBottom: 15,
    width: 270,
    height: 70,
  },
});

export default Patient;