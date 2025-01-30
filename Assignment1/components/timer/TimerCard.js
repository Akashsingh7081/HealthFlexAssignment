import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../ui/Button";
import TimerProgress from "./TimerProgress";
import { Ionicons } from "@expo/vector-icons";  

const TimerCard = ({ timer, onUpdate, onComplete, onDelete }) => {
  const { colors } = useTheme();
  const intervalRef = useRef(null);
  const halfwayAlertRef = useRef(false);  
  const [remainingTime, setRemainingTime] = useState(timer.remainingTime);

  useEffect(() => {
    if (timer.status === "running") {
      intervalRef.current = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime((prevTime) => prevTime - 1);
          onUpdate({
            ...timer,
            remainingTime: remainingTime - 1,
          });

          if (!halfwayAlertRef.current && remainingTime === timer.duration / 2) {
            halfwayAlertRef.current = true; 
            Alert.alert(
              "Halfway There!",
              `You are halfway through the ${timer.name} timer.`,
              [{ text: "OK" }]
            );
          }
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
  }, [timer.status, remainingTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>{timer.name}</Text>
      
      {/* Delete Button (Cross Icon) */}
      <TouchableOpacity onPress={() => onDelete(timer.id)} style={styles.deleteButton}>
        <Ionicons name="close-circle" size={24} color="red" />
      </TouchableOpacity>

      <TimerProgress progress={remainingTime / timer.duration} color={colors.primary} />
      <Text style={[styles.time, { color: colors.text }]}>{formatTime(remainingTime)}</Text>
      
      <View style={styles.controls}>
        <Button
          title={timer.status === "running" ? "Pause" : "Start"}
          onPress={() =>
            onUpdate({
              ...timer,
              status: timer.status === "running" ? "paused" : "running",
            })
          }
        />
        <Button
          title="Reset"
          onPress={() =>
            onUpdate({
              ...timer,
              status: "paused",
              remainingTime: timer.duration,
            })
          }
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
    fontWeight: "bold",
    marginBottom: 8,
  },
  time: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default TimerCard;
