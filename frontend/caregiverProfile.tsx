import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, Image, StyleSheet, ActivityIndicator, ScrollView, Alert, TouchableOpacity, Switch, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import API_BASE_URL from "./config";
const { width } = Dimensions.get('window');

const CaregiverProfile = () => {
  const route = useRoute();
  const { email, id } = route.params || {};

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [assignedPatients, setAssignedPatients] = useState<any[]>([]);
  const navigation = useNavigation();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  // Fetch caregiver profile using email or id from params
  const fetchProfile = async () => {
    try {
      console.log("Fetching profile for email:", email, "and id:", id);
      const token = await AsyncStorage.getItem("token");
      if (!token || !email || !id) {
        console.log("Missing token, email, or id");
        setProfile(null);
        setLoading(false);
        return;
      }
      const res = await axios.get(`${API_BASE_URL}/profile?email=${encodeURIComponent(email)}&id=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Profile API response:", res.data);
      setProfile(res.data?.data || null);
    } catch (err) {
      console.log("Error fetching profile:", err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProfile();
    }, [])
  );

  const handleAvailabilityToggle = async (value: boolean) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;
      await axios.put(
        `${API_BASE_URL}/profile`,
        { isAvailable: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      // Option 1: Update local state
      setProfile((prev: any) => ({ ...prev, isAvailable: value }));
      // Option 2 (recommended): Re-fetch profile from backend for accuracy
      // await fetchProfile();
    } catch {
      Alert.alert("Error", "Failed to update availability.");
    }
  };


  const handleDeleteAccount = async () => {
    console.log("Delete button pressed");
  
    Alert.alert("Delete Account", "Are you sure you want to delete your account? This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive", onPress: async () => {
          try {
            const token = await AsyncStorage.getItem("token");
            if (!token) return;
            await axios.delete(`${API_BASE_URL}/profile?id=${profile._id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true',
              }
            });
            await AsyncStorage.multiRemove(["token", "isLoggedIn", "userType"]);
            navigation.navigate('Login');
          } catch {
            if (isMounted.current) {
              Alert.alert("Error", "Failed to delete account.");
            }
          }
        }
      }
    ]);
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

  if (loading) return <ActivityIndicator size="large" color="#007BFF" style={{ flex: 1, justifyContent: "center" }} />;
  if (!profile) {
    console.log("Profile is null, displaying 'Failed to load profile.'");
    return <Text style={{ textAlign: "center", marginTop: 40 }}>Failed to load profile.</Text>;
  }

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
             <View style={[ { marginTop: 30 }]}>
                <Pressable onPress={() => navigation.navigate('Dashboard')}>
                   <Icon name="home-outline" style={[styles.Icon]} />
                 </Pressable>
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
        {/* Profile Section */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <View style={styles.profileCard}>
            <TouchableOpacity style={styles.editIconButton} onPress={() => navigation.navigate('EditProfile',{ email: profile.email, id: profile._id })}>
              <MaterialIcons name="edit" size={22} color="#0A1DD3" />
            </TouchableOpacity>
            <View style={styles.profileImage} />
            <Text style={styles.nameText}>{profile.name}</Text>
            <Text style={styles.linkText}>{profile.email}</Text>
          </View>
          <View style={styles.profileRight}>
            <Text style={styles.infoText}>Profession: Caregiver</Text>
            <Text style={styles.infoText}>Contact: {profile?.mobile || 'Not set'}</Text>
            <Text style={styles.infoText}>Gender: {profile?.gender || 'Not set'}</Text>
            <View style={styles.toggleRow}>
              <Text style={styles.infoText}>Available?</Text>
              {/* Just the toggle, no label text */}
              <Switch
                value={profile?.isAvailable ?? true}
                onValueChange={handleAvailabilityToggle}
              />
            </View>
          </View>
        </View>

        {/* Patients Carousel */}
       <Text style={styles.sectionTitle}>Assigned Items</Text>
<ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
  {(profile.items_id || []).map((item: any) => (
    <View key={item._id} style={styles.patientCard}>
      <Text style={styles.patientText}>{item.Name}</Text>
      <Text style={styles.patientDetails}>
        Gender: {item.Gender}, Status: {item.Status}
      </Text>
    </View>
  ))}
</ScrollView>




        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
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
  iconRow: { flexDirection: 'column', alignItems: 'center' },
  icon: { marginBottom: 28 },
  bottomIcons: { marginBottom: 40, gap: 20, alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginBottom: 20 },
  main: { flex: 1, paddingTop: 40, paddingLeft: 15 },
  profileCard: { flexDirection: 'column', backgroundColor: '#e3e9ff', borderRadius: 20, padding: 20, marginBottom: 20, width: 130, alignItems: 'center', position: 'relative' },
  editIconButton: { position: 'absolute', top: 10, right: 10, backgroundColor: '#fff', borderRadius: 16, padding: 4, elevation: 2, zIndex: 2 },
  profileImage: { width: 70, height: 90, borderRadius: 35, backgroundColor: 'white', marginBottom: 10 },
  nameText: { fontWeight: 'bold', fontSize: 12, textAlign: 'left', paddingRight: 0 },
  linkText: { color: 'gray', fontSize: 12 },
  profileRight: { marginTop: 20, justifyContent: 'space-around', paddingLeft: 15, flex: 1, gap: 8 },
  infoText: { fontSize: 14, marginBottom: 5 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, marginVertical: 10 },
  patientCard: { width: 120, height: 100, backgroundColor: '#a3c8ff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15, marginBottom: 12 },
  patientText: { fontWeight: 'bold', color: '#fff' },
  patientDetails: { fontSize: 12, color: '#555', marginTop: 4, textAlign: 'center' },
});

export default CaregiverProfile;