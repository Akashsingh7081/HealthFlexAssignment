import React, { createContext, useReducer, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TimerContext = createContext();

const initialState = {
  timers: [],
  history: [],
  categories: ["Workout", "Study", "Break"],
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TIMER":
      return {
        ...state,
        timers: [
          ...state.timers,
          {
            ...action.payload,
            id: Date.now().toString(),
            status: "paused",
            remainingTime: action.payload.duration,
          },
        ],
      };
    case "UPDATE_TIMER":
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload.id ? action.payload : timer
        ),
      };
    case "ADD_TO_HISTORY":
      return {
        ...state,
        history: [
          ...state.history,
          {
            ...action.payload,
            completedAt: new Date().toISOString(),
          },
        ],
      };
    default:
      return state;
  }
};

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  const addTimer = (timer) => {
    dispatch({ type: "ADD_TIMER", payload: timer });
  };

  const updateTimer = (timer) => {
    dispatch({ type: "UPDATE_TIMER", payload: timer });
  };

  const addToHistory = (timer) => {
    dispatch({ type: "ADD_TO_HISTORY", payload: timer });
  };

  return (
    <TimerContext.Provider
      value={{ state, addTimer, updateTimer, addToHistory }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => useContext(TimerContext);
