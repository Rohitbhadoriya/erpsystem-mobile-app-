import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/authApi';
import useAuthStore from '../store/authStore';
import AuthHeader from '../AuthHeader';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');

  const setAuth = useAuthStore((state) => state.setAuth);

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      Alert.alert('🎉 Success!', 'Account ban gaya! Ab Login karo.');
      setName('');
      setEmail('');
      setPassword('');
      setRole('');
      setPhone('');
    },
    onError: (error) => {
      const msg =
        error.response?.data?.message ||
        error.message ||
        'Kuch galat ho gaya';
      Alert.alert('❌ Failed', msg);
    },
  });

  const handleRegister = () => {
    if (!name || !email || !password || !role) {
      Alert.alert('Error', 'Sab required fields bharo');
      return;
    }

    const userData = {
      name,
      email,
      password,
      role: role.toLowerCase(),
      phone: phone || undefined,
    };

    mutation.mutate(userData);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FB' }}>
      <StatusBar backgroundColor="#F5F7FB" barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthHeader />

          <View style={styles.card}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Start your journey with us 🚀
            </Text>

            {/* Name */}
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />

            {/* Email */}
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            {/* Password */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* Role Chips */}
            <View style={styles.roleContainer}>
              {['Student', 'Teacher'].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.roleChip,
                    role === item && styles.roleChipActive,
                  ]}
                  onPress={() => setRole(item)}
                >
                  <Text
                    style={[
                      styles.roleText,
                      role === item && styles.roleTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Phone */}
            <TextInput
              style={styles.input}
              placeholder="Phone (*)"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            {/* Button */}
            <TouchableOpacity
              style={[
                styles.button,
                (mutation.isPending ||
                  !name ||
                  !email ||
                  !password ||
                  !role) && { opacity: 0.6 },
              ]}
              onPress={handleRegister}
              disabled={
                mutation.isPending ||
                !name ||
                !email ||
                !password ||
                !role
              }
            >
              <Text style={styles.buttonText}>
                {mutation.isPending
                  ? 'Creating Account...'
                  : 'Create Account'}
              </Text>
            </TouchableOpacity>

            {/* Login */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.loginLink}> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },

  input: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#F5F7FB',
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 15,
  },

  roleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },

  roleChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 8,
    marginBottom: 8,
  },

  roleChipActive: {
    backgroundColor: '#007AFF',
  },

  roleText: {
    color: '#555',
  },

  roleTextActive: {
    color: '#fff',
  },

  button: {
    backgroundColor: '#007AFF',
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },

  loginText: {
    color: '#666',
  },

  loginLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

//@tanstackquery/react-query = API calls ke liye use krnge loading error caching retry sab built in 
// isse kya hota h 80% kam ho jata hai 
// axios = HTTP se request le jane ke liye 
// zustand  = Global state management ke liye use krnge
// Global state hota h jisme app ke sare components access kr skte h
// react-native-async-storage = phone ke andar data store krne ke liye use krnge