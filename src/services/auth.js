import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// API Base URL - Update with your actual API endpoint
const API_BASE_URL = 'https://api.rmbbusiness.com/v1';

// Mock API for demonstration (Replace with actual API calls)
const mockUsers = [
  { id: 1, email: 'admin@rmbbusiness.com', password: 'admin123', name: 'Admin User' },
  { id: 2, email: 'user@rmbbusiness.com', password: 'user123', name: 'Demo User' },
];

export const AuthService = {
  // Login user
  async login(email, password) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Store user data
        await AsyncStorage.setItem('userToken', 'mock_jwt_token_' + user.id);
        await AsyncStorage.setItem('userData', JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name,
        }));
        
        return {
          success: true,
          data: {
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
            },
            token: 'mock_jwt_token_' + user.id,
          },
        };
      } else {
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An error occurred. Please try again.',
      };
    }
  },

  // Register new user
  async register(userData) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if email already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        return {
          success: false,
          message: 'Email already registered',
        };
      }
      
      // Create new user (in real app, this would be an API call)
      const newUser = {
        id: mockUsers.length + 1,
        ...userData,
      };
      
      // Store user data
      await AsyncStorage.setItem('userToken', 'mock_jwt_token_' + newUser.id);
      await AsyncStorage.setItem('userData', JSON.stringify({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      }));
      
      return {
        success: true,
        data: {
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
          },
          token: 'mock_jwt_token_' + newUser.id,
        },
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'An error occurred. Please try again.',
      };
    }
  },

  // Check if user is logged in
  async checkAuthStatus() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await AsyncStorage.getItem('userData');
      
      return {
        isLoggedIn: !!token,
        user: userData ? JSON.parse(userData) : null,
      };
    } catch (error) {
      console.error('Auth check error:', error);
      return {
        isLoggedIn: false,
        user: null,
      };
    }
  },

  // Logout user
  async logout() {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false };
    }
  },

  // Forgot password
  async forgotPassword(email) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userExists = mockUsers.some(u => u.email === email);
      
      if (userExists) {
        // In real app, send reset password email
        return {
          success: true,
          message: 'Password reset instructions sent to your email',
        };
      } else {
        return {
          success: false,
          message: 'Email not found',
        };
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        message: 'An error occurred. Please try again.',
      };
    }
  },
};