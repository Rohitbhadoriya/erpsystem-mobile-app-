// import React, { useState, useRef, useCallback } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   Alert,
//   Keyboard,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import useAuthStore from '../../store/authStore';
// import { createBatch } from '../../api/batchService';

// const COLORS = {
//   primary: '#4F46E5',
//   white: '#FFFFFF',
//   textDark: '#111827',
//   textLight: '#6B7280',
//   border: '#E5E7EB',
//   bg: '#F9FAFB',
// };

// const CreateBatchScreen = () => {
//   const navigation = useNavigation();
//   const { token } = useAuthStore();
//   const [loading, setLoading] = useState(false);

//   // Refs
//   const inputRefs = useRef({
//     batchName: null,
//     course: null,
//     courseType: null,
//     startDate: null,
//     endDate: null,
//     maxStudents: null,
//     feesAmount: null,
//     description: null,
//   }).current;

//   const [form, setForm] = useState({
//     batchName: '',
//     course: '',
//     courseType: '',
//     startDate: '',
//     endDate: '',
//     description: '',
//     maxStudents: '',
//     feesAmount: '',
//   });

//   const handleCreate = async () => {
//     if (!form.batchName?.trim() || !form.course?.trim()) {
//       Alert.alert('Error', 'Batch Name & Course are required');
//       return;
//     }

//     setLoading(true);
//     const payload = {
//       batchName: form.batchName.trim(),
//       course: form.course.trim(),
//       courseType: form.courseType?.trim() || undefined,
//       startDate: form.startDate?.trim() || undefined,
//       endDate: form.endDate?.trim() || undefined,
//       description: form.description?.trim() || undefined,
//       maxStudents: form.maxStudents ? Number(form.maxStudents) : undefined,
//       fees: form.feesAmount
//         ? { amount: Number(form.feesAmount), currency: 'INR' }
//         : undefined,
//     };

//     try {
//       await createBatch(payload, token);
//       Alert.alert('Success', 'Batch Created Successfully', [
//         { text: 'OK', onPress: () => navigation.goBack() },
//       ]);
//     } catch (error) {
//       Alert.alert('Error', error?.message || 'Failed to create batch');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Fixed CustomTextInput with useCallback
//   const CustomTextInput = useCallback(
//     ({
//       label,
//       value,
//       onChangeText,
//       placeholder,
//       multiline = false,
//       keyboardType = 'default',
//       required = false,
//       returnKeyType = 'next',
//       onSubmitEditing,
//       fieldName,           // ← Ye naya prop add kiya
//     }) => (
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>
//           {label} {required && <Text style={{ color: 'red' }}>*</Text>}
//         </Text>
//         <TextInput
//           ref={(ref) => {
//             if (ref) inputRefs[fieldName] = ref;     // ← Safe ref assignment
//           }}
//           style={[styles.input, multiline && styles.textArea]}
//           placeholder={placeholder}
//           placeholderTextColor={COLORS.textLight}
//           value={value}
//           onChangeText={onChangeText}
//           multiline={multiline}
//           keyboardType={keyboardType}
//           autoCapitalize="sentences"
//           autoCorrect={false}
//           returnKeyType={returnKeyType}
//           onSubmitEditing={onSubmitEditing}
//           blurOnSubmit={!multiline}
//           editable={!loading}
//         />
//       </View>
//     ),
//     [loading]   // sirf loading change hone pe re-create hoga
//   );

//   const focusNext = useCallback((nextRef) => {
//     nextRef?.focus();
//   }, []);

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="dark-content" />

//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={styles.backText}>←</Text>
//           </TouchableOpacity>
//           <Text style={styles.title}>Create Batch</Text>
//         </View>

//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           keyboardShouldPersistTaps="handled"
//         >
//           <View style={styles.formCard}>
//             <CustomTextInput
//               fieldName="batchName"
//               label="Batch Name"
//               required
//               placeholder="Enter batch name"
//               value={form.batchName}
//               onChangeText={(text) => setForm((prev) => ({ ...prev, batchName: text }))}
//               onSubmitEditing={() => focusNext(inputRefs.course)}
//             />

//             <CustomTextInput
//               fieldName="course"
//               label="Course"
//               required
//               placeholder="Enter course name"
//               value={form.course}
//               onChangeText={(text) => setForm((prev) => ({ ...prev, course: text }))}
//               onSubmitEditing={() => focusNext(inputRefs.courseType)}
//             />

//             <CustomTextInput
//               fieldName="courseType"
//               label="Course Type"
//               placeholder="e.g. Online, Offline, Hybrid"
//               value={form.courseType}
//               onChangeText={(text) => setForm((prev) => ({ ...prev, courseType: text }))}
//               onSubmitEditing={() => focusNext(inputRefs.startDate)}
//             />

//             <CustomTextInput
//               fieldName="startDate"
//               label="Start Date"
//               placeholder="YYYY-MM-DD"
//               value={form.startDate}
//               onChangeText={(text) => setForm((prev) => ({ ...prev, startDate: text }))}
//               onSubmitEditing={() => focusNext(inputRefs.endDate)}
//             />

//             <CustomTextInput
//               fieldName="endDate"
//               label="End Date"
//               placeholder="YYYY-MM-DD"
//               value={form.endDate}
//               onChangeText={(text) => setForm((prev) => ({ ...prev, endDate: text }))}
//               onSubmitEditing={() => focusNext(inputRefs.maxStudents)}
//             />

//             <CustomTextInput
//               fieldName="maxStudents"
//               label="Max Students"
//               placeholder="Enter maximum students"
//               value={form.maxStudents}
//               onChangeText={(text) =>
//                 setForm((prev) => ({ ...prev, maxStudents: text.replace(/[^0-9]/g, '') }))
//               }
//               keyboardType="numeric"
//               onSubmitEditing={() => focusNext(inputRefs.feesAmount)}
//             />

//             <CustomTextInput
//               fieldName="feesAmount"
//               label="Fees Amount (INR)"
//               placeholder="Enter fees amount"
//               value={form.feesAmount}
//               onChangeText={(text) =>
//                 setForm((prev) => ({ ...prev, feesAmount: text.replace(/[^0-9]/g, '') }))
//               }
//               keyboardType="numeric"
//               onSubmitEditing={() => focusNext(inputRefs.description)}
//             />

//             <CustomTextInput
//               fieldName="description"
//               label="Description"
//               placeholder="Enter batch description (optional)"
//               value={form.description}
//               onChangeText={(text) => setForm((prev) => ({ ...prev, description: text }))}
//               multiline
//               returnKeyType="done"
//             />
//           </View>

//           <TouchableOpacity
//             style={[styles.button, loading && { opacity: 0.6 }]}
//             onPress={handleCreate}
//             disabled={loading}
//           >
//             <Text style={styles.buttonText}>
//               {loading ? 'Creating Batch...' : 'Create Batch'}
//             </Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </SafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// };

// export default CreateBatchScreen;

// /* ================= STYLES (Same as before) ================= */
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.bg },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: COLORS.white,
//   },
//   backText: { fontSize: 28, marginRight: 12, color: COLORS.primary, fontWeight: 'bold' },
//   title: { fontSize: 22, fontWeight: '700', color: COLORS.textDark },
//   scrollContent: { padding: 20 },
//   formCard: {
//     backgroundColor: COLORS.white,
//     padding: 20,
//     borderRadius: 16,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   inputGroup: { marginBottom: 18 },
//   label: {
//     marginBottom: 6,
//     fontWeight: '600',
//     color: COLORS.textDark,
//     fontSize: 15,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 10,
//     padding: 14,
//     backgroundColor: '#fff',
//     fontSize: 16,
//     color: COLORS.textDark,
//   },
//   textArea: {
//     height: 110,
//     textAlignVertical: 'top',
//   },
//   button: {
//     backgroundColor: COLORS.primary,
//     height: 52,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 12,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });






import React, { useState, useRef, useCallback } from 'react';
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
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../../store/authStore';
import { createBatch } from '../../api/batchService';
import { useMutation } from '@tanstack/react-query';

const COLORS = {
  primary: '#4F46E5',
  white: '#FFFFFF',
  textDark: '#111827',
  textLight: '#6B7280',
  border: '#E5E7EB',
  bg: '#F9FAFB',
};

const CreateBatchScreen = () => {
  const navigation = useNavigation();
  const { token } = useAuthStore();
  
  const [form, setForm] = useState({
    batchName: '',
    course: '',
    courseType: '',
    startDate: '',
    endDate: '',
    description: '',
    maxStudents: '',
    feesAmount: '',
  });

  const createBatchMutation = useMutation({
    mutationFn: (payload) => createBatch(payload, token),
    onSuccess: () => {
      Alert.alert('Success', 'Batch Created Successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    },
    onError: (error) => {
      Alert.alert('Error', error?.message || 'Failed to create batch');
    },
  });

  const handleCreate = () => {
    if (!form.batchName?.trim() || !form.course?.trim()) {
      Alert.alert('Error', 'Batch Name & Course are required');
      return;
    }

    const payload = {
      batchName: form.batchName.trim(),
      course: form.course.trim(),
      courseType: form.courseType?.trim() || undefined,
      startDate: form.startDate?.trim() || undefined,
      endDate: form.endDate?.trim() || undefined,
      description: form.description?.trim() || undefined,
      maxStudents: form.maxStudents ? Number(form.maxStudents) : undefined,
      fees: form.feesAmount
        ? { amount: Number(form.feesAmount), currency: 'INR' }
        : undefined,
    };

    createBatchMutation.mutate(payload);
  };

  // Refs
  const inputRefs = useRef({
    batchName: null,
    course: null,
    courseType: null,
    startDate: null,
    endDate: null,
    maxStudents: null,
    feesAmount: null,
    description: null,
  }).current;

  const focusNext = useCallback((nextRef) => {
    nextRef?.focus();
  }, []);

  // ✅ Best Fix: CustomTextInput with useCallback + stable ref
  const CustomTextInput = useCallback(({
    label,
    value,
    onChangeText,
    placeholder,
    multiline = false,
    keyboardType = 'default',
    required = false,
    returnKeyType = 'next',
    onSubmitEditing,
    fieldName,
  }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>
        {label} {required && <Text style={{ color: 'red' }}>*</Text>}
      </Text>
      <TextInput
        ref={(ref) => {
          if (ref) inputRefs[fieldName] = ref;
        }}
        style={[styles.input, multiline && styles.textArea]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize="sentences"
        autoCorrect={false}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={!multiline}
        editable={!createBatchMutation.isPending}
      />
    </View>
  ), [createBatchMutation.isPending]);   // ← Important dependency

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Create Batch</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formCard}>
            <CustomTextInput
              fieldName="batchName"
              label="Batch Name"
              required
              placeholder="Enter batch name"
              value={form.batchName}
              onChangeText={(text) => setForm((prev) => ({ ...prev, batchName: text }))}
              onSubmitEditing={() => focusNext(inputRefs.course)}
            />

            <CustomTextInput
              fieldName="course"
              label="Course"
              required
              placeholder="Enter course name"
              value={form.course}
              onChangeText={(text) => setForm((prev) => ({ ...prev, course: text }))}
              onSubmitEditing={() => focusNext(inputRefs.courseType)}
            />

            <CustomTextInput
              fieldName="courseType"
              label="Course Type"
              placeholder="e.g. Online, Offline, Hybrid"
              value={form.courseType}
              onChangeText={(text) => setForm((prev) => ({ ...prev, courseType: text }))}
              onSubmitEditing={() => focusNext(inputRefs.startDate)}
            />

            <CustomTextInput
              fieldName="startDate"
              label="Start Date"
              placeholder="YYYY-MM-DD"
              value={form.startDate}
              onChangeText={(text) => setForm((prev) => ({ ...prev, startDate: text }))}
              onSubmitEditing={() => focusNext(inputRefs.endDate)}
            />

            <CustomTextInput
              fieldName="endDate"
              label="End Date"
              placeholder="YYYY-MM-DD"
              value={form.endDate}
              onChangeText={(text) => setForm((prev) => ({ ...prev, endDate: text }))}
              onSubmitEditing={() => focusNext(inputRefs.maxStudents)}
            />

            <CustomTextInput
              fieldName="maxStudents"
              label="Max Students"
              placeholder="Enter maximum students"
              value={form.maxStudents}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, maxStudents: text.replace(/[^0-9]/g, '') }))
              }
              keyboardType="numeric"
              onSubmitEditing={() => focusNext(inputRefs.feesAmount)}
            />

            <CustomTextInput
              fieldName="feesAmount"
              label="Fees Amount (INR)"
              placeholder="Enter fees amount"
              value={form.feesAmount}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, feesAmount: text.replace(/[^0-9]/g, '') }))
              }
              keyboardType="numeric"
              onSubmitEditing={() => focusNext(inputRefs.description)}
            />

            <CustomTextInput
              fieldName="description"
              label="Description"
              placeholder="Enter batch description (optional)"
              value={form.description}
              onChangeText={(text) => setForm((prev) => ({ ...prev, description: text }))}
              multiline
              returnKeyType="done"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, createBatchMutation.isPending && { opacity: 0.6 }]}
            onPress={handleCreate}
            disabled={createBatchMutation.isPending}
          >
            <Text style={styles.buttonText}>
              {createBatchMutation.isPending ? 'Creating Batch...' : 'Create Batch'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default CreateBatchScreen;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  },
  backText: {
    fontSize: 28,
    marginRight: 12,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  scrollContent: {
    padding: 20,
  },
  formCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    color: COLORS.textDark,
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 14,
    backgroundColor: '#fff',
    fontSize: 16,
    color: COLORS.textDark,
  },
  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});