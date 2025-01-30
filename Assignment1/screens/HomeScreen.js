import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTimerContext } from '../contexts/TimerContext';
import TimerCard from '../components/timer/TimerCard';
import TimerForm from '../components/timer/TimerForm';
import { useTheme } from '../contexts/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const { state, updateTimer, addToHistory } = useTimerContext();
  const { colors } = useTheme();
  const [showForm, setShowForm] = useState(false);

  console.log("__state",state);

  const handleComplete = (timer) => {
    updateTimer({
      ...timer,
      status: 'completed',
    });
    addToHistory(timer);
  
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        {state.timers.map(timer => (
          
          <TimerCard
            key={timer.id}
            timer={timer}
            onUpdate={updateTimer}
            onComplete={handleComplete}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;