import React from 'react';
import { View, StyleSheet } from 'react-native';

const TimerProgress = ({ progress, color }) => {
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.progress, 
          { 
            width: `${progress * 100}%`,
            backgroundColor: color,
          }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});

export default TimerProgress;