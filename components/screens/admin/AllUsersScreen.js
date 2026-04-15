import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS } from '../../constants/Color';
import { useNavigation } from '@react-navigation/native';

const AllUsersScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const [users] = useState([
    { id: '1', name: 'Rohit Sharma', email: 'rohit@gmail.com', role: 'student', status: 'active' },
    { id: '2', name: 'Priya Verma', email: 'priya@gmail.com', role: 'teacher', status: 'active' },
    { id: '3', name: 'Amit Kumar', email: 'amit@gmail.com', role: 'coach', status: 'inactive' },
    { id: '4', name: 'Sneha Patel', email: 'sneha@gmail.com', role: 'student', status: 'active' },
    { id: '5', name: 'Rahul Singh', email: 'rahul@gmail.com', role: 'parent', status: 'active' },
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('UserDetails', { userId: item.id })}
    >
      <View style={styles.leftSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>

          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{item.role.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.rightSection}>
        <View
          style={[
            styles.statusPill,
            {
              backgroundColor:
                item.status === 'active' ? '#E8F9F0' : '#FFF4E5',
            },
          ]}
        >
          <Text
            style={{
              color: item.status === 'active' ? '#22C55E' : '#F59E0B',
              fontSize: 12,
              fontWeight: '600',
            }}
          >
            {item.status}
          </Text>
        </View>

        <Text style={{ color: '#ccc', fontSize: 20 }}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* ✅ HEADER FIXED */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          
          {/* 🔥 BACK BUTTON (VISIBLE) */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>All Users</Text>
            <Text style={styles.subtitle}>
              {filteredUsers.length} Users
            </Text>
          </View>

        </View>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
      </View>

      {/* LIST */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateUser')}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AllUsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  header: {
    padding: 20,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  /* 🔥 FIXED BACK BUTTON */
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#E3E8F0', // darker so visible
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  backText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textDark,
  },

  subtitle: {
    color: '#888',
    marginTop: 2,
    fontSize: 13,
  },

  searchBox: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#EEF1F6',
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 48,
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    elevation: 4,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
  },

  email: {
    fontSize: 13,
    color: '#888',
  },

  roleBadge: {
    marginTop: 6,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },

  roleText: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '600',
  },

  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  fab: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
});