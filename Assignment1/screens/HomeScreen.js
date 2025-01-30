import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SectionList,
  TouchableOpacity,
  Button,
} from "react-native";
import { useTimerContext } from "../contexts/TimerContext";
import TimerCard from "../components/timer/TimerCard";
import TimerForm from "../components/timer/TimerForm";
import { useTheme } from "../contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const { state, updateTimer, addToHistory, addTimer, deleteTimer } = useTimerContext();
  const { colors } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    if (state.timers.length === 0) {
      addTimer({
        name: "Study Timer",
        duration: 25,
        category: "Study",
      });
    }
  }, [state.timers.length]);

  const handleComplete = (timer) => {
    updateTimer({
      ...timer,
      status: "completed",
    });
    addToHistory(timer);
  };

  const toggleSection = (category) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const startAllTimers = (category) => {
    state.timers.forEach((timer) => {
      if (timer.category === category && timer.status !== "running") {
        updateTimer({ ...timer, status: "running" });
      }
    });
  };

  const pauseAllTimers = (category) => {
    state.timers.forEach((timer) => {
      if (timer.category === category && timer.status === "running") {
        updateTimer({ ...timer, status: "paused" });
      }
    });
  };

  const resetAllTimers = (category) => {
    state.timers.forEach((timer) => {
      if (timer.category === category) {
        updateTimer({ ...timer, status: "idle", remainingTime: timer.duration });
      }
    });
  };

  // Function to delete a timer by its ID
  const deleteTimerById = (id) => {
    deleteTimer(id); // Call deleteTimer from context
  };

  const groupedTimers = state.timers.reduce((sections, timer) => {
    const category = timer.category || "Uncategorized";
    if (!sections[category]) sections[category] = [];
    sections[category].push(timer);
    return sections;
  }, {});

  const sectionData = Object.keys(groupedTimers).map((category) => ({
    title: category,
    data: groupedTimers[category],
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Button
        title="View History"
        onPress={() => navigation.navigate("History")}
      />

      <SectionList
        sections={sectionData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          expandedSections[item.category] ? (
            <TimerCard
              key={item.id}
              timer={item}
              onUpdate={updateTimer}
              onComplete={handleComplete}
              onDelete={deleteTimerById} 
            />
          ) : null
        }
        renderSectionHeader={({ section: { title } }) => (
          <View>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection(title)}
            >
              <Text
                style={[styles.sectionHeaderText, { color: colors.text }]}
              >
                {title}
              </Text>
              <Ionicons
                name={expandedSections[title] ? "chevron-up" : "chevron-down"}
                size={20}
                color={colors.text}
              />
            </TouchableOpacity>

            {expandedSections[title] && (
              <View style={styles.bulkActions}>
                <TouchableOpacity
                  style={[styles.bulkButton, { backgroundColor: colors.primary }]}
                  onPress={() => startAllTimers(title)}
                >
                  <Ionicons name="play" size={20} color="white" />
                  <Text style={styles.bulkButtonText}>Start All</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.bulkButton, { backgroundColor: "#FFA500" }]}
                  onPress={() => pauseAllTimers(title)}
                >
                  <Ionicons name="pause" size={20} color="white" />
                  <Text style={styles.bulkButtonText}>Pause All</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.bulkButton, { backgroundColor: "#FF0000" }]}
                  onPress={() => resetAllTimers(title)}
                >
                  <Ionicons name="refresh" size={20} color="white" />
                  <Text style={styles.bulkButtonText}>Reset All</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        stickySectionHeadersEnabled={true}
      />

      {showForm && <TimerForm onClose={() => setShowForm(false)} />}

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => setShowForm(true)}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bulkActions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  bulkButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  bulkButtonText: {
    color: "white",
    fontSize: 14,
    marginLeft: 5,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 150,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});

export default HomeScreen;
