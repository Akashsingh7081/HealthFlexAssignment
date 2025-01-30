import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';
import TimerProgress from './TimerProgress';

const TimerCard = ({ timer, onUpdate, onComplete }) => {
  const { colors } = useTheme();
  const intervalRef = useRef(null);
  const progressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (timer.status === 'running') {
      intervalRef.current = setInterval(() => {
        if (timer.remainingTime > 0) {
          onUpdate({
            ...timer,
            remainingTime: timer.remainingTime - 1,
          });
        } else {
          clearInterval(intervalRef.current);
          onComplete(timer);
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.status, timer.remainingTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>{timer.name}</Text>
      <TimerProgress 
        progress={timer.remainingTime / timer.duration}
        color={colors.primary}
      />
      <Text style={[styles.time, { color: colors.text }]}>
        {formatTime(timer.remainingTime)}
      </Text>
      <View style={styles.controls}>
        <Button
          title={timer.status === 'running' ? 'Pause' : 'Start'}
          onPress={() => onUpdate({
            ...timer,
            status: timer.status === 'running' ? 'paused' : 'running',
          })}
        />
        <Button
          title="Reset"
          onPress={() => onUpdate({
            ...timer,
            status: 'paused',
            remainingTime: timer.duration,
          })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
});

export default TimerCard;