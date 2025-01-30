// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AddTimerScreen = ({ navigation }) => {
//   const [name, setName] = useState('');
//   const [duration, setDuration] = useState('');
//   const [category, setCategory] = useState('');

//   const saveTimer = async () => {
//     if (!name || !duration || !category) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     const newTimer = {
//       id: Date.now().toString(),
//       name,
//       duration: parseInt(duration) * 60, // Convert minutes to seconds
//       category,
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       const stored = await AsyncStorage.getItem('timers') || '[]';
//       const timers = JSON.parse(stored);
//       timers.push(newTimer);
//       await AsyncStorage.setItem('timers', JSON.stringify(timers));
//       navigation.goBack();
//     } catch (error) {
//       console.error('Error saving timer:', error);
//       Alert.alert('Error', 'Failed to save timer');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.form}>
//         <Text style={styles.label}>Timer Name</Text>
//         <TextInput
//           style={styles.input}
//           value={name}
//           onChangeText={setName}
//           placeholder="Enter timer name"
//         />

//         <Text style={styles.label}>Duration (minutes)</Text>
//         <TextInput
//           style={styles.input}
//           value={duration}
//           onChangeText={setDuration}
//           placeholder="Enter duration in minutes"
//           keyboardType="numeric"
//         />

//         <Text style={styles.label}>Category</Text>
//         <TextInput
//           style={styles.input}
//           value={category}
//           onChangeText={setCategory}
//           placeholder="Enter category"
//         />

//         <TouchableOpacity
//           style={styles.button}
//           onPress={saveTimer}
//         >
//           <Text style={styles.buttonText}>Save Timer</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 16,
//   },
//   form: {
//     backgroundColor: 'white',
//     padding: 16,
//     borderRadius: 8,
//     elevation: 2,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#e2e8f0',
//     borderRadius: 4,
//     padding: 8,
//     marginBottom: 16,
//   },
//   button: {
//     backgroundColor: '#6366f1',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default AddTimerScreen;