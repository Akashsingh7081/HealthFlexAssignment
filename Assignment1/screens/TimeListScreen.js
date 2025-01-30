// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Timer from '../components/Timer';
// import CategoryGroup from '../components/CategoryGroup';
// import CompletionModal from '../components/CompletionModal';

// const TimerListScreen = ({ navigation }) => {
//   const [timers, setTimers] = useState({});
//   const [completedTimer, setCompletedTimer] = useState(null);
//   const [expandedCategories, setExpandedCategories] = useState([]);

//   useEffect(() => {
//     loadTimers();
//   }, []);

//   const loadTimers = async () => {
//     try {
//       const stored = await AsyncStorage.getItem('timers');
//       if (stored) {
//         const parsedTimers = JSON.parse(stored);
//         const grouped = parsedTimers.reduce((acc, timer) => {
//           if (!acc[timer.category]) {
//             acc[timer.category] = [];
//           }
//           acc[timer.category].push(timer);
//           return acc;
//         }, {});
//         setTimers(grouped);
//       }
//     } catch (error) {
//       console.error('Error loading timers:', error);
//     }
//   };

//   const handleTimerComplete = (timer) => {
//     setCompletedTimer(timer);
//     // Save to history
//     saveToHistory(timer);
//   };

//   const saveToHistory = async (timer) => {
//     try {
//       const stored = await AsyncStorage.getItem('timerHistory') || '[]';
//       const history = JSON.parse(stored);
//       history.push({
//         ...timer,
//         completedAt: new Date().toISOString(),
//       });
//       await AsyncStorage.setItem('timerHistory', JSON.stringify(history));
//     } catch (error) {
//       console.error('Error saving to history:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={Object.entries(timers)}
//         keyExtractor={([category]) => category}
//         renderItem={({ item: [category, categoryTimers] }) => (
//           <CategoryGroup
//             category={category}
//             timers={categoryTimers}
//             onTimerComplete={handleTimerComplete}
//           />
//         )}
//       />
//       <TouchableOpacity
//         style={styles.fab}
//         onPress={() => navigation.navigate('AddTimer')}
//       >
//         <Text style={styles.fabText}>+</Text>
//       </TouchableOpacity>
//       <CompletionModal
//         visible={!!completedTimer}
//         timer={completedTimer}
//         onClose={() => setCompletedTimer(null)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   fab: {
//     position: 'absolute',
//     bottom: 24,
//     right: 24,
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     backgroundColor: '#6366f1',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 4,
//   },
//   fabText: {
//     fontSize: 24,
//     color: 'white',
//   },
// });

// export default TimerListScreen;