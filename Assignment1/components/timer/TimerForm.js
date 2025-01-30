import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useTimerContext } from '../../contexts/TimerContext';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';
import { Picker } from '@react-native-picker/picker';

const TimerForm = ({ onClose }) => {
  const { addTimer } = useTimerContext();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('Workout');
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  const handleSubmit = () => {
    if (name && duration) {
      addTimer({
        name,
        duration: parseInt(duration, 10),
        category,
        halfwayAlert,
        createdAt: new Date().toISOString(),
      });
      onClose();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>Add New Timer</Text>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Timer Name"
        placeholderTextColor={colors.placeholder}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Duration (seconds)"
        placeholderTextColor={colors.placeholder}
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />
      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={[styles.picker, { color: colors.text }]}>
        <Picker.Item label="Workout" value="Workout" />
        <Picker.Item label="Study" value="Study" />
        <Picker.Item label="Break" value="Break" />
      </Picker>
      <Button title="Create Timer" onPress={handleSubmit} />
      <Button title="Cancel" onPress={onClose} variant="secondary" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  picker: {
    marginBottom: 16,
  },
});

export default TimerForm;