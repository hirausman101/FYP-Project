import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, Dimensions, ScrollView, processColor, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LineChart, BarChart, PieChart } from 'react-native-charts-wrapper';
import { useNavigation, useRoute } from '@react-navigation/native';
import API_BASE_URL  from './config'; // Adjust the import path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';
import mongoose from 'mongoose';

interface Item {
  patient_id:string;
  Name: string;
  Gender: string;
  Status: string;
}

interface Notification{
  Title: string;
  Patient: string;
  Intensity: string;
  Time: string; 
}

const Dashboard = () => { 
  const route = useRoute();
  const {email, id} = route.params || {};
  const navigation = useNavigation();
 

  const [patients, setPatients] = useState<Item[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true); 
  
  const parseTime = (timeString: string): Date => {
    const [hours, minutes] = timeString.split(":").map(Number); 
    const now = new Date(); 
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    ); 
  };

  const getTimeDifference = (timeString: string): string => {
    const time = parseTime(timeString).getTime(); // Convert the time string to a Date object
    const now = Date.now(); // Get the current timestamp
    const diffInMinutes = Math.floor((time - now) / (1000 * 60)); // Calculate the difference in minutes
  
    if (diffInMinutes >= 60) {
      const diffInHours = Math.floor(diffInMinutes / 60); // Convert minutes to hours
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''}`; // Add "s" for plural hours
    } else {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''}`; // Add "s" for plural minutes
    }
  };


  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true); // Set loading true at the start
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
      }
      setLoading(false); 
    };

    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/notifications`);
        const data = await res.json();
        setNotifications(Array.isArray(data) ? data : []);
      } catch (error) {
        setNotifications([]);
      }
    };

    fetchPatients().then(fetchNotifications);
  }, []);

  const screenWidth = Dimensions.get('window').width;

  const data = {
    dataSets: [
      {
        values: [
          { y: 70 }, { y: 90 }, { y: 65 }, { y: 40 }, { y: 75 }, { y: 35 }, 
        ],
        label: 'Patient 1',
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
      {
        values: [
          { y: 30 }, { y: 20 }, { y: 60 }, { y: 50 }, { y: 40 }, { y:80 }, 
        ],
        label: 'Patient 2',
        config: {
          mode: 'CUBIC_BEZIER',
          drawFilled: true,
          fillColor: processColor('#B2A4FF'),  // Fill color
          color: processColor('#9e91e3'),  // Line color
          lineWidth: 2,
          drawCircles: false,
          drawValues: false,
        },
      },
      {
        values: [
          { y: 50 }, { y: 70 }, { y: 40 }, { y: 30 }, { y: 20 }, { y: 40 }, 
        ],
        label: 'Patient 3',
        config: {
          mode: 'CUBIC_BEZIER',
          drawFilled: true,
          fillColor: processColor('#7df583'),  
          color: processColor('#5cdb62'), 
          lineWidth: 2,
          drawCircles: false,
          drawValues: false,
        },
      },
    ],
  };
  


   const chartConfigBase = {
    backgroundColor: 'white',
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    decimalPlaces: 0,

    propsForBackgroundLines: {
      stroke: '#e3e3e3',
    },
    propsForLabels: {
      fontSize: 5,
    },
  };

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
      <View style={styles.topMenu}>
        <Text style={{ marginLeft: 80, marginTop: 17, fontSize: 20 }}>Dashboard:</Text>
      </View>
      <View style={styles.grid}>
       <View style={[styles.sideMenu, { width: 65 }]}>
                {/* Profile Icon */}
                <Pressable onPress={() => navigation.navigate('CaregiverProfile', { email, id })} style={[styles.profileIcon, { marginTop: 0, marginBottom: 30 }]}>
                  <View style={styles.profileStatus}></View>
                </Pressable>
                {/* Home Icon */}
                <View style={[{ marginTop: 50 }]}>
                  <Pressable onPress={() => navigation.navigate('Dashboard', { email, id })}>
                    <Icon name="home-outline" style={[styles.selectedIcon]} />
                  </Pressable>
                </View>
                {/* Patients Icon */}
                <View style={{ marginTop: 50, marginBottom: 100, justifyContent: 'flex-end' }}>
                  <Pressable onPress={() => navigation.navigate('PatientDetails', { email, id })}>
                    <Icon name="people-outline" style={[styles.Icon]} />
                  </Pressable>
                </View>
                {/* Spacer to push exit icon to bottom */}
                <View style={{ flex: 1 }} />
                {/* Exit Icon */}
                <View style={{ marginBottom: 100 }}>
                   <Pressable onPress={handleLogout}>
                    <Icon name="exit-outline" style={[styles.Icon]} />
                   </Pressable>
                </View>
      
              </View>


        <View style={[styles.mainContent, { marginLeft: 75 }]}>
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    <View style={styles.tabRows}>
      {patients.map((patient, index) => (
        <Pressable onPress={() => navigation.navigate('Patient', { patientId: patient.patient_id , email:email, id:id})} key={index} style={styles.tab}>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.patientIcon]}>
              <Icon name="person-outline" size={15} color="black" />
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 35 }}>
              <Text style={{ fontSize: 10, color: '#fff' }}>See more</Text>
              <Icon name="chevron-forward-outline" size={12} color="#fff" />
            </View>
          </View>
          <View style={styles.displayData}>
            <Text style={{ fontSize: 12, color: '#fff', marginTop: 10 }}>
              Name: {patient.Name}
            </Text>
            <Text style={{ fontSize: 10, color: '#fff', marginTop: 5 }}>
              Gender: {patient.Gender}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={{ fontSize: 10, color: '#fff' }}>Status: </Text>
              <Text
                style={[
                  patient.Status === 'Critical' ? styles.criticalStatus : styles.normalStatus,
                ]}
              >
                {patient.Status}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
      <View style={{ width: 30 }}></View>
    </View>
  </ScrollView>


            <View style={styles.graphContiner}>
            <Text style={{ fontSize: 17, fontWeight: 'bold', }}>Health Overview</Text>
            {data.dataSets.length > 0 ? (
              <LineChart
                data={data}
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
                  granularity:1,
                }}
                bezier
                description={{
                  text: '', // remove text
                  enabled: false, // disable it entirely
                }}
                               
              />
            ) : (
              <Text>No chart data available</Text>
            )}
            </View>
        
            <View style={{ flexDirection: 'row',width: Dimensions.get('window').width - 100,justifyContent:'space-between',marginTop: 50,marginBottom: 0 }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Notifications</Text>
              <View style={styles.clickNotifications}><Text style={{fontSize:8,}}>Click to see more</Text></View>
            </View>
              
          <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 5 }}>
            <View style={styles.notificationContainer}>
             
                        
            <View style={styles.notificationColumn}>
              {Array.isArray(notifications) && notifications.map((notification, index) => {
                let icon = null;
                if (notification.Title.toLowerCase().includes('tremor')) {
                  icon = (
                    <Image
                      source={require('./assets/alert.png')}
                      style={{ width: 10, height: 10, marginRight: 8 }}
                    />
                  );
                } else if (notification.Title.toLowerCase().includes('medication')) {
                  icon = (
                    <Image
                      source={require('./assets/pill.png')}
                      style={{ width: 10, height: 10, marginRight: 8 }}
                    />
                  );
                } else {
                  icon = (
                    <Icon name="notifications-outline" size={20} color="#5961b8" style={{ marginRight: 8 }} />
                  );
                }

                return (
                  <View key={index} style={[styles.notification, {
                    backgroundColor:
                      notification.Title === 'Tremor Spike Alert'
                        ? '#fcd3cc'
                        : notification.Title === 'Medication Reminder'
                        ? '#e3fcca'
                        : notification.Intensity === 'High'
                        ? '#fcd3cc'
                        : notification.Intensity === 'Medium'
                        ? '#fceccc'
                        : '#e3f6fc',
                  }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {icon}
                        <Text style={styles.notificationTitle}>{notification.Title}</Text>
                      </View>
                      <Text style={styles.notificationText}>{getTimeDifference(notification.Time)} ago</Text>
                    </View>
                    <Text style={styles.notificationText}>Patient: {notification.Patient}</Text>
                    <Text style={styles.notificationText}>Intensity: {notification.Intensity}</Text>
                    <Text style={{ textAlign: 'right', fontSize: 8 }}>See more</Text>
                  </View>
                );
              })}
            </View>
             
            </View>
          </ScrollView>


        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
clickNotifications:{
  backgroundColor: '#ededeb',
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  width: 65,
  height: 15,
  },
  notificationColumnScroll: {
    flexDirection: 'column',
  },

  notificationContainer: {
    width: Dimensions.get('window').width - 100,
    marginTop: 0,

  },
  notificationColumn: {

    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    
  },
  notification: {
    width: Dimensions.get('window').width - 100,
    marginTop:40,
    height: 60,
    borderRadius: 15,
    padding: 10,
    paddingBottom: 10,
    paddingTop:3,
  },
  notificationText: {
    fontSize: 10, // was 8, then 9
    color: '#000',
  },
  notificationTitle: {
    fontSize: 12, // was 10, then 11
    fontWeight: 'bold',
    color: '#000',
  },
  graphContiner: {
    width: Dimensions.get('window').width - 100, 
    marginBottom: 10,
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
  displayData: {
    marginTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  tabRows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 70,
    marginBottom: 50,
  },
  tab: {
    width: 150,
    height: 130,
    marginRight: 50,
    padding: 10,
    backgroundColor: '#2a4fbf',
    borderRadius: 12,
    justifyContent: 'flex-start',
  },
  mainContent: {
    padding: 10,
    paddingTop:30,
    width: '100%',
    height: '100%',
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 26, // was 24, then 25
    fontWeight: 'bold',
    color: '#333',
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 65,
    height: '100%',
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
    marginBottom: 50,
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
  patientIcon: {
    left: 0,
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  criticalStatus: {
    width: 40,
    height: 18,
    backgroundColor: '#e99cb0',
    borderRadius: 30,
    color: '#c85660',
    fontSize: 10, // was 8, then 9
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
  normalStatus: {
    width: 40,
    height: 18,
    paddingBottom: 2,
    backgroundColor: '#b2f1b2',
    borderRadius: 30,
    fontSize: 10, // was 8, then 9
    fontWeight: 'bold',
    color: '#6aa274',
    textAlign: 'center',
    paddingTop: 2,
  },
});


export default Dashboard;
