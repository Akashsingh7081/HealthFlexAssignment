// import { registerRootComponent } from 'expo';
// import RootLayout from './app/_layout'; 

// registerRootComponent(RootLayout);

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { TimerProvider } from './contexts/TimerContext';
import { ThemeProvider } from './contexts/ThemeContext';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <TimerProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ title: 'Timer Manager' }}
            />
            <Stack.Screen 
              name="History" 
              component={HistoryScreen}
              options={{ title: 'Timer History' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TimerProvider>
    </ThemeProvider>
  );
}