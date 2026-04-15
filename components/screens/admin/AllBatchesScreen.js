import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import useAuthStore from '../../store/authStore';
import { getAllBatches } from '../../api/batchService';

const COLORS = {
  primary: '#4F46E5',
  secondary: '#EEF2FF',
  white: '#FFFFFF',
  textDark: '#111827',
  textLight: '#6B7280',
  bg: '#F9FAFB',
};

const AllBatchesScreen = () => {
  const navigation = useNavigation();
  const { token } = useAuthStore();

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [studentForm, setStudentForm] = useState({
    name: '',
    phone: '',
    email: '',
  });

  // Fetch Batches
  const fetchBatches = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const response = await getAllBatches(token);
      
      // Backend response mein 'batches' array hota hai
      const batchList = response?.batches || response || [];
      setBatches(Array.isArray(batchList) ? batchList : []);
      
    } catch (error) {
      console.error('Error fetching batches:', error);
      Alert.alert('Error', 'Failed to load batches. Please try again.');
      setBatches([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load when screen is focused
  useFocusEffect(
    useCallback(() => {
      if (token) fetchBatches();
    }, [token])
  );

  // Initial Load
  useEffect(() => {
    if (token) {
      fetchBatches();
    }
  }, [token]);

  // Filter Batches
  const filteredBatches = batches.filter(batch =>
    (batch.batchName || batch.name || '')
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    (batch.description || '')
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const openAddStudent = (batch) => {
    setSelectedBatch(batch);
    setModalVisible(true);
  };

  const handleAddStudent = () => {
    if (!studentForm.name?.trim() || !studentForm.phone?.trim()) {
      Alert.alert('Error', 'Name & Phone are required');
      return;
    }

    Alert.alert('Success', `Student added to ${selectedBatch?.batchName || selectedBatch?.name}`);
    
    setModalVisible(false);
    setStudentForm({ name: '', phone: '', email: '' });
  };

  const renderBatchItem = ({ item }) => {
    const studentCount = item.students?.length || 0;
    const maxStudents = item.maxStudents || 30;
    const progress = maxStudents ? Math.round((studentCount / maxStudents) * 100) : 0;

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.batchName}</Text>
        
        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}

        <View style={styles.dateRow}>
          <Text style={styles.dateText}>
            📅 {item.startDate ? new Date(item.startDate).toLocaleDateString('en-IN') : 'N/A'} 
            - {item.endDate ? new Date(item.endDate).toLocaleDateString('en-IN') : 'N/A'}
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {studentCount} / {maxStudents} students
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => openAddStudent(item)}
        >
          <Text style={styles.buttonText}>+ Add Student</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Batches</Text>
      </View>

      {/* SEARCH */}
      <TextInput
        placeholder="Search batches..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        placeholderTextColor={COLORS.textLight}
      />

      {/* LOADING */}
      {loading && !refreshing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}

      {/* BATCH LIST */}
      <FlatList
        data={filteredBatches}
        keyExtractor={(item) => item._id?.toString() || item.id?.toString() || Math.random().toString()}
        renderItem={renderBatchItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => fetchBatches(true)} />
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {searchQuery ? 'No matching batches found' : 'No batches available'}
              </Text>
            </View>
          )
        }
        contentContainerStyle={filteredBatches.length === 0 ? { flex: 1 } : {}}
      />

      {/* ADD STUDENT MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              Add Student to {selectedBatch?.batchName}
            </Text>

            <TextInput
              placeholder="Student Full Name *"
              style={styles.modalInput}
              value={studentForm.name}
              onChangeText={(text) => setStudentForm({ ...studentForm, name: text })}
            />

            <TextInput
              placeholder="Phone Number *"
              keyboardType="number-pad"
              style={styles.modalInput}
              value={studentForm.phone}
              onChangeText={(text) => setStudentForm({ ...studentForm, phone: text })}
              maxLength={10}
            />

            <TextInput
              placeholder="Email (optional)"
              keyboardType="email-address"
              style={styles.modalInput}
              value={studentForm.email}
              onChangeText={(text) => setStudentForm({ ...studentForm, email: text })}
              autoCapitalize="none"
            />

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setModalVisible(false);
                  setStudentForm({ name: '', phone: '', email: '' });
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={handleAddStudent}>
                <Text style={styles.saveText}>Add Student</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AllBatchesScreen;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.bg 
  },

  headerRow: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  back: { 
    fontSize: 26, 
    marginRight: 12, 
    color: COLORS.primary 
  },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: COLORS.textDark 
  },

  searchInput: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
  },

  card: {
    backgroundColor: COLORS.white,
    margin: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  title: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: COLORS.textDark, 
    marginBottom: 6 
  },
  description: { 
    color: COLORS.textLight, 
    marginBottom: 10,
    fontSize: 14 
  },

  dateRow: { marginBottom: 12 },
  dateText: { 
    color: COLORS.textLight, 
    fontSize: 14 
  },

  progressContainer: { marginBottom: 12 },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  progressText: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 6,
    textAlign: 'right',
  },

  button: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { 
    color: COLORS.primary, 
    fontWeight: '600' 
  },

  /* Modal Styles */
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
  },
  modalBox: {
    backgroundColor: COLORS.white,
    margin: 20,
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
  },
  modalButtonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  cancelBtn: {
    flex: 1,
    padding: 14,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  saveBtn: {
    flex: 1,
    padding: 14,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  cancelText: { 
    color: COLORS.textDark, 
    fontWeight: '600' 
  },
  saveText: { 
    color: '#fff', 
    fontWeight: '600' 
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    color: COLORS.textLight,
    fontSize: 16,
  },
});


