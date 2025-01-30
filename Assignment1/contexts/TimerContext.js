import React, { createContext, useReducer, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import * as FileSystem from 'expo-file-system';  

const TimerContext = createContext();

const initialState = {
  timers: [],
  history: [],
  categories: ["Workout", "Study", "Break"],
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TIMER":
      const newTimers = [
        ...state.timers,
        {
          ...action.payload,
          id: Date.now().toString(),
          status: "paused",
          remainingTime: action.payload.duration,
          halfwayAlertTriggered: false,  
        },
      ];
      saveToStorage("timers", newTimers);
      return { ...state, timers: newTimers };

    case "UPDATE_TIMER":
      const updatedTimers = state.timers.map((timer) =>
        timer.id === action.payload.id ? action.payload : timer
      );
      saveToStorage("timers", updatedTimers);
      return { ...state, timers: updatedTimers };
      
    case "DELETE_TIMER":
      const remainingTimers = state.timers.filter((timer) => timer.id !== action.payload);
      saveToStorage("timers", remainingTimers);
      return { ...state, timers: remainingTimers };

    case "ADD_TO_HISTORY":
      const updatedHistory = [
        ...state.history,
        {
          ...action.payload,
          completedAt: new Date().toISOString(),
        },
      ];
      saveToStorage("history", updatedHistory);
      return { ...state, history: updatedHistory };

    case "LOAD_DATA":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

// Function to persist data in AsyncStorage
const saveToStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

// Function to load data from AsyncStorage
const loadFromStorage = async (dispatch) => {
  try {
    const timers = await AsyncStorage.getItem("timers");
    const history = await AsyncStorage.getItem("history");
    dispatch({
      type: "LOAD_DATA",
      payload: {
        timers: timers ? JSON.parse(timers) : [],
        history: history ? JSON.parse(history) : [],
      },
    });
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

// Function to export data
const exportData = async (history) => {
  try {
    const jsonHistory = JSON.stringify(history, null, 2);
    
    // Save file to the device (Expo FileSystem example)
    const fileUri = FileSystem.documentDirectory + "timerHistory.json";
    await FileSystem.writeAsStringAsync(fileUri, jsonHistory);

    Alert.alert("Export Successful", `Your timer history has been exported to: ${fileUri}`);
  } catch (error) {
    console.error("Error exporting data:", error);
    Alert.alert("Export Failed", "An error occurred while exporting the timer history.");
  }
};

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    loadFromStorage(dispatch);
  }, []);

  const addTimer = (timer) => {
    dispatch({ type: "ADD_TIMER", payload: timer });
  };

  const updateTimer = (timer) => {
    dispatch({ type: "UPDATE_TIMER", payload: timer });

    // Check for halfway alert when updating the timer
    checkHalfwayAlert(timer);
  };

  const addToHistory = (timer) => {
    dispatch({ type: "ADD_TO_HISTORY", payload: timer });

    // Remove completed timer from active timers
    dispatch({
      type: "UPDATE_TIMER",
      payload: { ...timer, status: "completed" },
    });
  };

  const deleteTimer = (id) => {
    dispatch({ type: "DELETE_TIMER", payload: id });
  };

  // Function to check and trigger the halfway alert
  const checkHalfwayAlert = (timer) => {
    if (
      timer.status === "running" &&
      !timer.halfwayAlertTriggered &&
      timer.remainingTime === Math.floor(timer.duration / 2)
    ) {
      Alert.alert("Halfway Alert", `Timer "${timer.name}" is halfway done!`);

      // Update the timer to mark the alert as triggered
      dispatch({
        type: "UPDATE_TIMER",
        payload: { ...timer, halfwayAlertTriggered: true },
      });
    }
  };

  return (
    <TimerContext.Provider
      value={{
        state,
        addTimer,
        updateTimer,
        addToHistory,
        deleteTimer,
        exportData, 
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => useContext(TimerContext);
