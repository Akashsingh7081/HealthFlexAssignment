import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { useTimerContext } from '../contexts/TimerContext';
import { useTheme } from '../contexts/ThemeContext';

const HistoryScreen = () => {
  const { state, exportData } = useTimerContext();  
  const { colors } = useTheme();

  const exportHistory = () => {
    try {
      exportData();  
    } catch (error) {
      console.error('Error exporting history:', error);
      Alert.alert('Error', 'Failed to export timer data.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Timer History</Text>

 
      <Button
        title="Export History"
        onPress={exportHistory} 
        color={colors.primary}
      />

      {state.history.length > 0 ? (
        <FlatList
          data={state.history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.historyItem, { borderColor: colors.border }]}>
              <Text style={[styles.timerName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.timestamp, { color: colors.text }]}>
                Completed At: {new Date(item.completedAt).toLocaleString()}
              </Text>
              <Text style={[styles.duration, { color: colors.textSecondary }]}>
                Duration: {item.duration} seconds
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={[styles.emptyText, { color: colors.text }]}>
          No timers completed yet.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 6,
  },
  timerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 14,
    marginTop: 5,
  },
  duration: {
    fontSize: 14,
    marginTop: 5,
    fontStyle: 'italic',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HistoryScreen;
