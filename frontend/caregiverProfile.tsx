import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Alert, TouchableOpacity, Switch, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import API_BASE_URL from "./config";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token || !email || !id) {
        setProfile(null);
        setAssignedPatients([]);
        setLoading(false);
        return;
      }
      const res = await axios.get(`${API_BASE_URL}/profile?email=${encodeURIComponent(email)}&id=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data?.data || null);
      setAssignedPatients(res.data?.data?.items_id || []);
    } catch {
      setProfile(null);
      setAssignedPatients([]);
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
      await fetchProfile();
    } catch {
      Alert.alert("Error", "Failed to update availability.");
    }
  };

  const handleDeleteAccount = async () => {
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

  if (loading) {
    return (
      <View testID="loading-indicator" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#2d53c8" />
      </View>
    );
  }
  if (!profile) {
    return <Text style={{ textAlign: "center", marginTop: 40 }}>Failed to load profile.</Text>;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Top row: Back arrow (left) and delete (right) */}
      <View style={{
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 40,
        left: 0,
        paddingHorizontal: 18,
        zIndex: 20,
      }}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={22} color="#2d53c8" />
        </TouchableOpacity>
        <TouchableOpacity
          testID="delete-account-button"
          style={styles.deleteIconButton}
          onPress={handleDeleteAccount}
        >
          <Feather name="trash-2" size={20} color="#d32f2f" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={{ alignItems: 'center', marginTop: 80, marginBottom: 20 }}>
        <View style={styles.profileImage}>
          <Icon name="person-circle-outline" size={100} color="#8EA7E9" />
          {/* Edit icon */}
          <TouchableOpacity
            testID="edit-profile-button"
            style={styles.editIconButton}
            onPress={() => navigation.navigate('EditProfile', { email: profile.email, id: profile._id })}
          >
            <MaterialIcons name="edit" size={20} color="#0A1DD3" />
          </TouchableOpacity>
        </View>
        <Text style={styles.nameText}>{profile.name}</Text>
        {/* Caregiver badge */}
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>Caregiver</Text>
        </View>
        {/* Available toggle */}
        <View style={styles.toggleRow}>
          <Text style={styles.availableText}>Available?</Text>
          <Switch
            testID="availability-toggle"
            value={profile?.isAvailable ?? true}
            onValueChange={handleAvailabilityToggle}
          />
        </View>
      </View>

      {/* Assigned Patients */}
      <Text style={styles.assignedPatientsTitle}>Assigned Patients</Text>
      <View style={{ alignItems: 'center', width: '100%' }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
          style={{ marginBottom: 20 }}
        >
          {(assignedPatients || []).map((patient, idx) => (
            <View
              key={idx}
              style={styles.patientCard}
            >
              <Text style={styles.patientName}>{patient.Name}</Text>
              <Text style={styles.patientGender}> {patient.Gender}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

     
      <View style={styles.infoCard}>
        <InfoRow label="Email" value={profile.email} />
        <InfoRow label="Contact" value={profile?.mobile || 'Not set'} />
        <InfoRow label="Gender" value={profile?.gender || 'Not set'} />
      </View>
    </ScrollView>
  );
};


const InfoRow = ({ label, value }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
    <Text style={{ color: '#6f5691', fontWeight: 'bold', fontSize: 16, }}>{label}</Text>
    <Text style={{ color: '#654f82', fontSize: 15 }}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  arrowButton: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    elevation: 2,
    zIndex: 2,
  },
  editIconButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    elevation: 2,
    zIndex: 2,
  },
  deleteIconButton: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    elevation: 2,
    zIndex: 2,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#2d53c8',
    textAlign: 'center',
  },
  roleBadge: {
    backgroundColor: '#2D336B',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 9,
    marginTop: 10,
    marginBottom: 8,
  },
  roleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  availableText: {
    color: '#b52400',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 8,
    marginTop: 10,
  },
  assignedPatientsTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginTop:30,
    marginBottom: 30,
    textAlign:'center',
  },
  patientCard: {
    width: 90,
    height: 90,
    backgroundColor: '#e1fca9',
    borderRadius: 18,
    marginRight: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
    gap: 10,
  },
  patientName: {
    fontWeight: 'bold',
    color: '##405e42',
    fontSize: 16,
    textAlign: 'center',
  },
  patientGender: {
    color: '#405e42',
    fontSize: 14,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#eeebff',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop:50,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 30,
  },
});

export default CaregiverProfile;