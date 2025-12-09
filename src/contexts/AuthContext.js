import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize with a test user for demo
  const initializeDemoUser = async () => {
    try {
      const testUser = {
        id: '1',
        name: 'Demo User',
        email: 'demo@rmbbusiness.com',
        businessName: 'RMB Demo Business',
        phone: '+1234567890',
        role: 'business_owner',
        avatar: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString(),
      };
      
      // Always start with demo user for testing
      await AsyncStorage.setItem('userData', JSON.stringify(testUser));
      await AsyncStorage.setItem('authToken', 'demo_token_' + Date.now());
      await AsyncStorage.setItem('isLoggedIn', 'true');
      
      setUser(testUser);
      setIsAuthenticated(true);
      setLoading(false);
      
      console.log('Demo user initialized');
    } catch (error) {
      console.error('Error initializing demo user:', error);
      setLoading(false);
    }
  };

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const userData = await AsyncStorage.getItem('userData');
      const token = await AsyncStorage.getItem('authToken');
      
      console.log('Auth check:', { isLoggedIn, hasUserData: !!userData, hasToken: !!token });
      
      if (isLoggedIn === 'true' && userData && token) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        console.log('User is authenticated:', parsedUser.email);
      } else {
        console.log('No valid session found, initializing demo user');
        // Initialize with demo user for testing
        await initializeDemoUser();
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      // Initialize demo user on error
      await initializeDemoUser();
    } finally {
      setLoading(false);
    }
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password (at least 6 characters)
  const isValidPassword = (password) => {
    return password && password.length >= 6;
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      console.log('Login attempt:', { email, passwordLength: password?.length });
      
      // Validate inputs
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }
      
      if (!isValidEmail(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      if (!isValidPassword(password)) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // For demo: Accept any email with password "password123"
      const validPassword = 'password123';
      if (password !== validPassword) {
        throw new Error('Invalid credentials. Use "password123" for demo.');
      }
      
      // Get stored users or use demo user
      const storedUsers = await AsyncStorage.getItem('registeredUsers');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      let existingUser = users.find(u => u.email === email);
      
      // If no existing user, create a demo user
      if (!existingUser) {
        existingUser = {
          id: Date.now().toString(),
          name: email.split('@')[0],
          email: email,
          password: password,
          businessName: email.split('@')[0] + ' Business',
          phone: '',
          role: 'business_owner',
          avatar: 'https://via.placeholder.com/150',
          createdAt: new Date().toISOString(),
        };
        
        users.push(existingUser);
        await AsyncStorage.setItem('registeredUsers', JSON.stringify(users));
      }
      
      // Prepare user data (without password for security)
      const userData = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        businessName: existingUser.businessName,
        phone: existingUser.phone || '',
        role: 'business_owner',
        avatar: existingUser.avatar || 'https://via.placeholder.com/150',
        createdAt: existingUser.createdAt,
      };
      
      // Generate token
      const token = 'jwt_token_' + Date.now() + '_' + Math.random().toString(36).substr(2);
      
      // Store session
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      
      setUser(userData);
      setIsAuthenticated(true);
      
      console.log('Login successful:', userData.email);
      Alert.alert('Login Successful', `Welcome back, ${userData.name}!`);
      
      return { success: true, user: userData };
      
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Validate required fields
      const requiredFields = ['name', 'email', 'password', 'businessName'];
      const missingFields = requiredFields.filter(field => !userData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
      
      // Validate email
      if (!isValidEmail(userData.email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Validate password
      if (!isValidPassword(userData.password)) {
        throw new Error('Password must be at least 6 characters');
      }
      
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Get existing users
      const storedUsers = await AsyncStorage.getItem('registeredUsers');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Check if email already exists
      const emailExists = users.some(u => u.email === userData.email);
      if (emailExists) {
        throw new Error('An account with this email already exists');
      }
      
      // Create new user object
      const newUser = {
        id: Date.now().toString(),
        name: userData.name.trim(),
        email: userData.email.toLowerCase().trim(),
        password: userData.password,
        businessName: userData.businessName.trim(),
        phone: userData.phone || '',
        role: 'business_owner',
        avatar: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString(),
      };
      
      // Add to users array
      users.push(newUser);
      await AsyncStorage.setItem('registeredUsers', JSON.stringify(users));
      
      // Prepare user data for session (without password)
      const sessionUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        businessName: newUser.businessName,
        phone: newUser.phone,
        role: newUser.role,
        avatar: newUser.avatar,
        createdAt: newUser.createdAt,
      };
      
      // Generate token and create session
      const token = 'jwt_token_' + Date.now() + '_' + Math.random().toString(36).substr(2);
      await AsyncStorage.setItem('userData', JSON.stringify(sessionUser));
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      
      setUser(sessionUser);
      setIsAuthenticated(true);
      
      console.log('Registration successful:', sessionUser.email);
      Alert.alert('Success', 'Account created successfully!');
      
      return { success: true, user: sessionUser };
      
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Registration Failed', error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('Logout started');
      setLoading(true);
      
      // Clear all session data
      await AsyncStorage.multiRemove([
        'userData', 
        'authToken', 
        'isLoggedIn'
      ]);
      
      console.log('AsyncStorage cleared');
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      
      console.log('Auth state reset');
      
      // IMPORTANT: We can't navigate here, but the AppNavigator will detect the state change
      // and automatically show the login screen
      
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      Alert.alert('Success', 'Profile updated successfully!');
      return { success: true, user: updatedUser };
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile.');
      return { success: false, error: error.message };
    }
  };

  // Clear all app data (for development)
  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
      console.log('All app data cleared');
      Alert.alert('Success', 'All app data has been cleared.');
    } catch (error) {
      console.error('Error clearing data:', error);
      Alert.alert('Error', 'Failed to clear data.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
        clearAllData, // For development only
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};