import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import * as cores from '../../../styles/cores';
import { useAuth } from '../context/AuthContext';

// Importar as telas
import AboutScreen from '../screens/AboutScreen';
import ExploreScreen from '../screens/ExploreScreen';
import HomeScreen from '../screens/HomeScreen';
import SeatsScreen from '../screens/SeatsScreen';
import SignupScreen from '../screens/SignupScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  const { isAdmin } = useAuth();

  return (
    <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: cores.vermelhoPrimario,
          tabBarInactiveTintColor: cores.cinzaTexto,
          tabBarStyle: {
            backgroundColor: cores.pretoProfundo,
            borderTopWidth: 1,
            borderTopColor: cores.cinzaBorda,
            height: 70,
            paddingBottom: 10,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: cores.pretoProfundo,
          },
          headerTintColor: cores.brancoTotal,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Início',
            tabBarLabel: 'Início',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏠</Text>,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            title: 'Explorar',
            tabBarLabel: 'Explorar',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🔍</Text>,
            headerShown: false,
          }}
        />
        {isAdmin && (
          <Tab.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              title: 'Cadastrar',
              tabBarLabel: 'Cadastrar',
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>➕</Text>,
              headerShown: false,
            }}
          />
        )}
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{
            title: 'Sobre',
            tabBarLabel: 'Sobre',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>ℹ️</Text>,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Seats" component={SeatsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
