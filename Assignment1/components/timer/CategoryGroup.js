import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import TimerCard from './TimerCard';
import Button from '../ui/Button';

const CategoryGroup = ({ category, timers, onUpdateTimer, onCompleteTimer }) => {
  const { colors } = useTheme();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleBulkAction = (action) => {
    timers.forEach(timer => {
      switch (action) {
        case 'start':
          onUpdateTimer({ ...timer, status: 'running' });
          break;
        case 'pause':
          onUpdateTimer({ ...timer, status: 'paused' });
          break;
        case 'reset':
          onUpdateTimer({ 
            ...timer, 
            status: 'paused', 
            remainingTime: timer.duration 
          });
          break;
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.header, { backgroundColor: colors.card }]}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={[styles.categoryTitle, { color: colors.text }]}>
          {category} ({timers.length})
        </Text>
        <Text style={[styles.expandIcon, { color: colors.text }]}>
          {isExpanded ? '▼' : '▶'}
        </Text>
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.content}>
          <View style={styles.bulkActions}>
            <Button 
              title="Start All" 
              onPress={() => handleBulkAction('start')}
              size="small"
            />
            <Button 
              title="Pause All" 
              onPress={() => handleBulkAction('pause')}
              size="small"
            />
            <Button 
              title="Reset All" 
              onPress={() => handleBulkAction('reset')}
              size="small"
            />
          </View>
          
          {timers.map(timer => (
            <TimerCard
              key={timer.id}
              timer={timer}
              onUpdate={onUpdateTimer}
              onComplete={onCompleteTimer}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expandIcon: {
    fontSize: 16,
  },
  content: {
    marginTop: 8,
  },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
});

export default CategoryGroup;