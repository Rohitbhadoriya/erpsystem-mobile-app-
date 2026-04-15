import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS } from '../../constants/Color';
import { useNavigation } from '@react-navigation/native';

const MyProfileScreen = () => {
  const navigation = useNavigation();

  const [profile, setProfile] = useState({
    name: 'Rohit Sharma',
    email: 'rohit.admin@gmail.com',
    phone: '9876543210',
    role: 'admin',
    bio: 'Senior Admin at Coaching ERP.',
    address: 'Bhopal, MP',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!profile.name || !profile.email) {
      Alert.alert('Error', 'Name and Email required');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      Alert.alert('🎉 Success', 'Profile updated!');
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 🔥 HEADER WITH BACK */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={{ fontSize: 20 }}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        {/* PROFILE HEADER */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </Text>
          </View>

          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.role}>{profile.role.toUpperCase()}</Text>
        </View>

        {/* FORM */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>
            {isEditing ? 'Edit Profile' : 'Profile Info'}
          </Text>

          {/* INPUT FIELD */}
          {['name', 'email', 'phone', 'address', 'bio'].map((field) => (
            <View key={field} style={styles.inputGroup}>
              <Text style={styles.label}>{field.toUpperCase()}</Text>

              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: isEditing ? '#fff' : '#f5f5f5' }
                ]}
                value={profile[field]}
                editable={isEditing}
                multiline={field === 'bio'}
                onChangeText={(text) =>
                  setProfile({ ...profile, [field]: text })
                }
              />
            </View>
          ))}
        </View>

        {/* BUTTONS */}
        <View style={styles.buttonContainer}>
          {!isEditing ? (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.btnText}>Edit Profile</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setIsEditing(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSave}
              >
                <Text style={{ color: '#fff' }}>
                  {loading ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },

  backBtn: {
    marginRight: 10,
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 10,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  profileHeader: {
    alignItems: 'center',
    paddingVertical: 25,
    backgroundColor: '#f8f9fa',
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },

  role: {
    color: '#666',
    marginTop: 4,
  },

  formContainer: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },

  inputGroup: {
    marginBottom: 15,
  },

  label: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
  },

  buttonContainer: {
    padding: 20,
  },

  editButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
  },

  cancelBtn: {
    flex: 1,
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },

  saveBtn: {
    flex: 1,
    padding: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
  },
});