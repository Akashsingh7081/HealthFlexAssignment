import React from 'react';
import { View, Text, StyleSheet, FlatList, Share } from 'react-native';
import { useTimerContext } from '../contexts/TimerContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/ui/Button';

const HistoryScreen = () => {
  const { state } = useTimerContext();
  const { colors } = useTheme();

  const exportHistory = async () => {
    try {
      const historyJson = JSON.stringify(state.history, null, 2);
      await Share.share({
        message: historyJson,
        title: 'Timer History Export',
      });
    } catch (error) {
      console.error('Error exporting history:', error);
    }
  };

  const renderHistoryItem = ({ item }) => (
    <View style={[styles.historyItem, { backgroundColor: colors.card }]}>
      <Text style={[styles.historyTitle, { color: colors.text }]}>
        {item.name}
      </Text>
      <Text style={[styles.historyDetail, { color: colors.textSecondary }]}>
        Category: {item.category}
      </Text>
      <Text style={[styles.historyDetail, { color: colors.textSecondary }]}>
        Completed: {new Date(item.completedAt).toLocaleString()}
      </Text>
      <Text style={[styles.historyDetail, { color: colors.textSecondary }]}>
        Duration: {item.duration} seconds
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Button 
        title="Export History" 
        onPress={exportHistory}
        style={styles.exportButton}
      />
      <FlatList
        data={state.history}
        renderItem={renderHistoryItem}
        keyExtractor={item => item.completedAt}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No completed timers yet
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  exportButton: {
    marginBottom: 16,
  },
  historyItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  historyDetail: {
    fontSize: 14,
    marginBottom: 4,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 32,
  },
});

export default HistoryScreen;