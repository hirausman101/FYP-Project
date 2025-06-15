import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation, useRoute  } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import API_BASE_URL from './config'; // Adjust the import based on your project structure

const EditProfile = () => {
  const route = useRoute();
  const { email, id } = route.params || {};
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    profession: '',
    city: '',
    isAvailable: true,
  });
  const [genderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const genderOptions = ["Male", "Female", "Other"];


 

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Not authenticated');
        navigation.navigate('Login');
        return;
      }

       const res = await axios.get(`${API_BASE_URL}/profile?email=${encodeURIComponent(email)}&id=${id}`, {
         headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      });

      if (res.data.status === 'ok') {
        setProfile(res.data.data);
        // Store the current email for comparison later
        await AsyncStorage.setItem('currentEmail', res.data.data.email);
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      Alert.alert('Error', error.response?.data?.error || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Not authenticated');
        navigation.replace('/login');
        return;
      }

      // Validate required fields
      if (!profile.name) {
        Alert.alert('Error', 'Name is required');
        return;
      }

      if (!profile.email) {
        Alert.alert('Error', 'Email is required');
        return;
      }

      // Create update data object with only defined values
      const updateData = {
        name: profile.name.trim(),
        email: profile.email.trim(),
        mobile: profile.mobile?.trim() || '',
        gender: profile.gender || '',
        profession: profile.profession || '',
        isAvailable: profile.isAvailable ?? true,
      };

      console.log('Sending update with data:', updateData);

      const response = await axios.put(
        `${API_BASE_URL}/profile`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );

      console.log('Update response:', response.data);

      if (response.data.status === 'ok') {
        // Store the new token if provided
        if (response.data.data?.token) {
          await AsyncStorage.setItem('token', response.data.data.token);
        }

        // Check if email was actually changed
        const originalEmail = await AsyncStorage.getItem('currentEmail');
        const emailChanged = originalEmail && originalEmail !== profile.email;

        if (emailChanged) {
          Alert.alert(
            'Success', 
            'Profile updated successfully. Please log in again with your new email.',
            [
              {
                text: 'OK',
                onPress: async () => {
                  await AsyncStorage.removeItem('token');
                  await AsyncStorage.removeItem('currentEmail');
                  navigation.replace('/login');
                }
              }
            ]
          );
        } else {
          // Update the profile state with the latest data
          if (response.data.data?.user) {
            setProfile(prevProfile => ({
              ...prevProfile,
              ...response.data.data.user
            }));
          }
          Alert.alert('Success', 'Profile updated successfully');
          navigation.goBack();

        }
      } else {
        Alert.alert('Error', response.data.error || 'Failed to update profile');
      }
    } catch (error: any) {
      console.error('Error updating profile:', error.response?.data || error);
      if (error.response?.data?.error === "Email already in use") {
        Alert.alert('Error', 'This email is already in use. Please try a different email.');
      } else if (error.response?.data?.error === "User not found") {
        Alert.alert('Error', 'Session expired. Please log in again.');
        await AsyncStorage.removeItem('token');
        navigation.replace('Login');
      } else {
        Alert.alert(
          'Error',
          error.response?.data?.error || 'Failed to update profile. Please try again.'
        );
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.scrollContent}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.avatarSection}>
        <View style={styles.avatarCircle}>
          <MaterialIcons name="account-circle" size={80} color="#BDBDBD" />
        </View>
        <Text style={styles.profileName}>{profile.name || 'Name'}</Text>
        <Text style={styles.profileEmail}>{profile.email || 'Email'}</Text>
      </View>

      <View style={styles.form}>
  <View style={styles.inputGroup}>
    <Text style={styles.label}>What's your first name?</Text>
    <TextInput
      style={styles.input}
      value={profile.name.split(' ')[0] || ''}
      onChangeText={(text) => {
        const last = profile.name.split(' ')[1] || '';
        setProfile({ ...profile, name: text + (last ? ' ' + last : '') });
      }}
      placeholder="First name"
    />
  </View>

  <View style={styles.inputGroup}>
    <Text style={styles.label}>And your last name?</Text>
    <TextInput
      style={styles.input}
      value={profile.name.split(' ')[1] || ''}
      onChangeText={(text) => {
        const first = profile.name.split(' ')[0] || '';
        setProfile({ ...profile, name: first + (text ? ' ' + text : '') });
      }}
      placeholder="Last name"
    />
  </View>

  <View style={styles.inputGroup}>
    <Text style={styles.label}>Email</Text>
    <TextInput
      style={styles.input}
      value={profile.email}
      onChangeText={(text) => setProfile({ ...profile, email: text })}
      placeholder="Enter your email"
      keyboardType="email-address"
      autoCapitalize="none"
    />
  </View>

  <View style={styles.inputGroup}>
    <Text style={styles.label}>Profession</Text>
    <TextInput
      style={[styles.input, { backgroundColor: '#f0f0f0' }]}
      value="Caregiver"
      editable={false}
      placeholder="Profession"
    />
  </View>

  <View style={styles.inputGroup}>
    <Text style={styles.label}>Phone number</Text>
    <View style={styles.phoneInputContainer}>
      <Text style={styles.flagIcon}>🇵🇰</Text>
      <TextInput
        style={[styles.input, { flex: 1, borderWidth: 0 }]}
        value={profile.mobile}
        onChangeText={(text) => setProfile({ ...profile, mobile: text })}
        placeholder="Phone number"
        keyboardType="phone-pad"
      />
    </View>
  </View>

  <View style={styles.inputGroup}>
    <Text style={styles.label}>Select your gender</Text>
    <TouchableOpacity
      onPress={() => setGenderDropdownVisible(true)}
      style={styles.dropdownContainer}
    >
      <Text style={[styles.input, { paddingVertical: 12 }]}>
        {profile.gender || "Select gender"}
      </Text>
      <MaterialIcons
        name="arrow-drop-down"
        size={24}
        color="#888"
        style={styles.dropdownIcon}
      />
    </TouchableOpacity>

    {genderDropdownVisible && (
      <View style={styles.dropdownMenu}>
        {genderOptions.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => {
              setProfile({ ...profile, gender: option });
              setGenderDropdownVisible(false);
            }}
            style={styles.dropdownItem}
          >
            <Text style={{ paddingVertical: 8 }}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )}
  </View>

  <View style={styles.inputGroup}>
    <View style={styles.availabilityContainer}>
      <Text style={styles.availabilityText}>
        {profile.isAvailable ? 'Available' : 'Not Available'}
      </Text>
      <Switch
        value={profile.isAvailable}
        onValueChange={(value) => setProfile({ ...profile, isAvailable: value })}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={profile.isAvailable ? '#0A1DD3' : '#f4f3f4'}
      />
    </View>
  </View>

  <TouchableOpacity
    style={styles.updateButton}
    onPress={handleSave}
    disabled={saving}
  >
    {saving ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={styles.updateButtonText}>Update Profile</Text>
    )}
  </TouchableOpacity>
</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 18,
  },
  inputGroupRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    paddingLeft: 10,
  },
  flagIcon: {
    fontSize: 22,
    marginRight: 8,
  },
  dropdownContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  dropdownIcon: {
    position: 'absolute',
    right: 12,
    top: 16,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    paddingLeft: 10,
  },
  calendarIcon: {
    marginRight: 10,
  },
  updateButton: {
    backgroundColor: '#0A1DD3',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  availabilityText: {
    fontSize: 16,
    color: '#333',
  },
});

export default EditProfile;