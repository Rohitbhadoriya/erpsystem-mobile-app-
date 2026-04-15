// import React from 'react';
// import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// import { COLORS } from '../../constants/Color';
// import { useNavigation } from '@react-navigation/native';

// const AdminDashboardScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
//       <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      
//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
//         <View style={styles.header}>
//           <Text style={styles.welcome}>Hello, Admin 👋</Text>
//           <Text style={styles.subtitle}>Manage your coaching platform</Text>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Users Management</Text>
//           <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AllUsers')}>
//             <Text style={styles.cardTitle}>All Users</Text>
//             <Text style={styles.cardDesc}>View, update, activate/deactivate users</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CreateUser')}>
//             <Text style={styles.cardTitle}>Create New User</Text>
//             <Text style={styles.cardDesc}>Add student, teacher or coach</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MyProfile')}>
//             <Text style={styles.cardTitle}>My Profile</Text>
//             <Text style={styles.cardDesc}>Update your own details</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Batch Management</Text>
//           <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AllBatches')}>
//             <Text style={styles.cardTitle}>All Batches</Text>
//             <Text style={styles.cardDesc}>View and manage all batches</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CreateBatch')}>
//             <Text style={styles.cardTitle}>Create New Batch</Text>
//             <Text style={styles.cardDesc}>Add new batch</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AdminDashboardScreen;

// const styles = StyleSheet.create({
//   header: { padding: 20, paddingTop: 30 },
//   welcome: { fontSize: 28, fontWeight: '700', color: COLORS.textDark },
//   subtitle: { fontSize: 16, color: COLORS.textLight, marginTop: 4 },
//   section: { paddingHorizontal: 20, marginBottom: 25 },
//   sectionTitle: { fontSize: 18, fontWeight: '600', color: COLORS.textDark, marginBottom: 12 },
//   card: {
//     backgroundColor: '#fff',
//     padding: 18,
//     borderRadius: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: COLORS.gray,
//   },
//   cardTitle: { fontSize: 17, fontWeight: '600', color: COLORS.textDark },
//   cardDesc: { fontSize: 14, color: COLORS.textLight, marginTop: 4 },
// });

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
  primary: '#2c3e50',
  secondary: '#bdc3c7',
  accent: '#7ccc63',
  warning: '#f39c12',
  danger: '#e74c3c',
  white: '#FFFFFF',
  textDark: '#2c3e50',
  textLight: '#7f8c8d',
  bg: '#f5f6fa'
};

const Card = ({ title, desc, icon, onPress, bg }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={[styles.cardIcon, { backgroundColor: bg || COLORS.secondary }]}>
      <Text style={styles.iconText}>{icon}</Text>
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{desc}</Text>
    </View>

    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

// ✅ PROFILE WITH BOTTOM SHEET
const ProfileCard = ({ navigation }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={() => setOpen(true)}>
        <View style={[styles.cardIcon, { backgroundColor: COLORS.accent }]}>
          <Text style={styles.iconText}>👤</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>My Profile</Text>
          <Text style={styles.cardDesc}>Update your details</Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      {/* 🔥 BOTTOM SHEET MODAL */}
      <Modal visible={open} transparent animationType="slide">
        <View style={styles.modalContainer}>
          
          {/* CLOSE AREA */}
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setOpen(false)}
          />

          {/* SHEET */}
          <View style={styles.bottomSheet}>
            <TouchableOpacity
              style={styles.sheetItem}
              onPress={() => {
                setOpen(false);
                navigation.navigate('MyProfile');
              }}
            >
              <Text style={styles.sheetText}>👤 My Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sheetItem}
              onPress={() => {
                setOpen(false);
                console.log('Logout');
              }}
            >
              <Text style={[styles.sheetText, { color: COLORS.danger }]}>
                🚪 Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const AdminDashboardScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Admin Dashboard</Text>
            <Text style={styles.subtitle}>Manage everything easily</Text>
          </View>

          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>👤</Text>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.statsContainer}>
          <View style={[styles.statBox, { backgroundColor: '#dff5dc' }]}>
            <Text style={styles.statNumber}>120</Text>
            <Text style={styles.statLabel}>Users</Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: '#fdebd0' }]}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Batches</Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: '#f9d6d5' }]}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Coaches</Text>
          </View>
        </View>

        {/* USERS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Users Management</Text>

          <Card
            title="All Users"
            desc="View all users"
            icon="👥"
            bg="#e0f2fe"
            onPress={() => navigation.navigate('AllUsers')}
          />

          <Card
            title="Create User"
            desc="Add new user"
            icon="➕"
            bg="#dcfce7"
            onPress={() => navigation.navigate('CreateUser')}
          />

          <ProfileCard navigation={navigation} />
        </View>

        {/* BATCH */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Batch Management</Text>

          <Card
            title="All Batches"
            desc="Manage batches"
            icon="📚"
            bg="#fef9c3"
            onPress={() => navigation.navigate('AllBatches')}
          />

          <Card
            title="Create Batch"
            desc="Add new batch"
            icon="🆕"
            bg="#ede9fe"
            onPress={() => navigation.navigate('CreateBatch')}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboardScreen;

// 🎨 STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg
  },

  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  welcome: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textDark
  },

  subtitle: {
    fontSize: 13,
    color: COLORS.textLight
  },

  profileCircle: {
    backgroundColor: COLORS.primary,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  profileText: {
    color: '#fff'
  },

  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20
  },

  statBox: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center'
  },

  statNumber: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.textDark
  },

  statLabel: {
    fontSize: 12,
    color: COLORS.textLight
  },

  section: {
    padding: 20
  },

  sectionTitle: {
    fontWeight: '600',
    marginBottom: 10,
    color: COLORS.textDark
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 3
  },

  cardIcon: {
    height: 40,
    width: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },

  iconText: {
    fontSize: 18
  },

  cardTitle: {
    fontWeight: '600',
    color: COLORS.textDark
  },

  cardDesc: {
    fontSize: 12,
    color: COLORS.textLight
  },

  arrow: {
    fontSize: 18,
    color: COLORS.textLight
  },

  // 🔥 MODAL
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },

  bottomSheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },

  sheetItem: {
    paddingVertical: 15
  },

  sheetText: {
    fontSize: 16,
    color: COLORS.textDark
  }
});