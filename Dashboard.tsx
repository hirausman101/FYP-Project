import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, processColor, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LineChart, BarChart, PieChart } from 'react-native-charts-wrapper';
import { useNavigation } from '@react-navigation/native';



interface Item {
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
  const navigation = useNavigation();
 

  const [patients, setPatients] = useState<Item[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
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
      try {
        const response = await fetch('http://192.168.100.9:5000/items'); 
        const data = await response.json();
        console.log('Fetched patients:', data);
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    

    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://192.168.100.9:5000/notifications');
        const data = await response.json();
        console.log('Fetched notifications:', data);
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }

    fetchPatients();
    fetchNotifications();
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


  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        <Text style={{ marginLeft: 80, marginTop: 17, fontSize: 17 }}>Assigned Patients:</Text>
      </View>
      <View style={styles.grid}>
        <View style={[styles.sideMenu, { width: 65 }]}>
          {/* Side Menu Icons */}
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
        <View style={[styles.mainContent, { marginLeft: 75 }]}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.tabRows}>
              {patients.map((patient, index) => (
                <View key={index} style={styles.tab}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.patientIcon]}>
                      <Icon name="person-outline" size={15} color="black" />
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 35 }}>
                      <Text style={{ fontSize: 8, color: '#fff' }}>See more</Text>
                      <Icon name="chevron-forward-outline" size={10} color="#fff" />
                    </View>
                  </View>
                  <View style={styles.displayData}>
                    <Text style={{ fontSize: 10, color: '#fff', marginTop: 10 }}>
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
                </View>
              ))}
              <View style={{ width: 30 }}></View>
            </View>
          </ScrollView>
         

            <View style={styles.graphContiner}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', }}>Health Overview</Text>
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
              <Text style={{ fontSize: 15, fontWeight: 'bold',}}>Notifications</Text>
              <View style={styles.clickNotifications}><Text style={{fontSize:7,}}>Click to see more</Text></View>
            </View>
              
          <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 5 }}>
            <View style={styles.notificationContainer}>
             
                        
              <View style={styles.notificationColumn}>
  {notifications.map((notification, index) => {
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
        <Text style={{ textAlign: 'right', fontSize: 6 }}>See more</Text>
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
  backgroundColor: '#f5a542',
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
    marginTop:20,
    height: 50,
    borderRadius: 15,
    padding: 10,
    paddingBottom: 10,
    paddingTop:3,
  },
  notificationText: {
    fontSize: 8,
    color: '#000',
  },
  notificationTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  graphContiner: {
    width: Dimensions.get('window').width - 100, 
    marginTop: 20,
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
    marginBottom: 120,
  },
  tab: {
    width: 130,
    height: 120,
    marginRight: 50,
    padding: 10,
    backgroundColor: '#2a4fbf',
    borderRadius: 12,
    justifyContent: 'flex-start',
  },
  mainContent: {
    padding: 10,
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
    fontSize: 24,
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
    backgroundColor: '#e8eaf6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 14,
    backgroundColor: '#e99cb0',
    borderRadius: 30,
    color: '#c85660',
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 2,
  },
  normalStatus: {
    width: 40,
    height: 14,
    backgroundColor: '#b2f1b2',
    borderRadius: 30,
    fontSize: 8,
    fontWeight: 'bold',
    color: '#6aa274',
    textAlign: 'center',
    paddingTop: 2,
  },
});

export default Dashboard;
