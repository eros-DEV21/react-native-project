import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import {
  HomeScreen,
  TodosScreen,
  SettingsScreen,
  ComponentsScreen,
} from './src/screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const TodosStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name="TodosScreen" component={TodosScreen} />
    </Stack.Navigator>
  );
};

const ComponentsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name="ComponentsScreen" component={ComponentsScreen} />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#999',
            tabBarStyle: {
              borderTopWidth: 1,
              borderTopColor: '#E5E5EA',
              backgroundColor: '#fff',
              paddingBottom: 4,
            },
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 20, color }}>🏠</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Todos"
            component={TodosStack}
            options={{
              tabBarLabel: 'Todos',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 20, color }}>✓</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Components"
            component={ComponentsStack}
            options={{
              tabBarLabel: 'Components',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 20, color }}>◼️</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsStack}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 20, color }}>⚙️</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

// Import Text for emoji display
import { Text } from 'react-native';
