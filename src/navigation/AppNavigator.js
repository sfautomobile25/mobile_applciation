import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import { AuthService } from '../services/auth';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
     setIsLoggedIn(false);
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { isLoggedIn: loggedIn } = await AuthService.checkAuthStatus();
      setIsLoggedIn(loggedIn);
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
  };

  const handleRegisterSuccess = () => {
    setIsLoggedIn(true);
  };

  // Show loading screen while checking auth
  if (isLoading) {
    return null; // You can replace with a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          animationEnabled: true 
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="MainTabs">
          {(props) => <MainTabNavigator {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}