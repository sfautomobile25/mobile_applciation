import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthService } from '../services/auth';
import { validateForm } from '../utils/validation';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetPassword = async () => {
    // Validate email
    const validationErrors = validateForm({ email }, 'forgot');
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const result = await AuthService.forgotPassword(email);
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        Alert.alert('Error', result.message || 'Failed to send reset instructions');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
      console.error('Forgot password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackToLogin}
            disabled={isLoading}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reset Password</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        {!isSubmitted ? (
          <>
            {/* Instruction */}
            <View style={styles.instructionContainer}>
              <Ionicons name="lock-closed-outline" size={60} color="#007AFF" style={styles.lockIcon} />
              <Text style={styles.instructionTitle}>Forgot Password?</Text>
              <Text style={styles.instructionText}>
                Enter your email address and we'll send you instructions to reset your password.
              </Text>
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                <Ionicons name="mail-outline" size={22} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email address"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) {
                      setErrors({ ...errors, email: '' });
                    }
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isLoading}
                />
              </View>
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            {/* Reset Button */}
            <TouchableOpacity 
              style={[styles.resetButton, isLoading && styles.resetButtonDisabled]}
              onPress={handleResetPassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.resetButtonText}>Send Reset Instructions</Text>
              )}
            </TouchableOpacity>

            {/* Back to Login */}
            <TouchableOpacity 
              style={styles.backToLoginButton}
              onPress={handleBackToLogin}
              disabled={isLoading}
            >
              <Ionicons name="arrow-back" size={18} color="#007AFF" />
              <Text style={styles.backToLoginText}>Back to Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Success Message */}
            <View style={styles.successContainer}>
              <View style={styles.successIconContainer}>
                <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
              </View>
              <Text style={styles.successTitle}>Check Your Email</Text>
              <Text style={styles.successText}>
                We have sent password reset instructions to:
              </Text>
              <Text style={styles.successEmail}>{email}</Text>
              <Text style={styles.successNote}>
                Please check your email and follow the instructions to reset your password.
              </Text>

              {/* Action Buttons */}
              <TouchableOpacity 
                style={styles.openEmailButton}
                onPress={() => {
                  // In a real app, this would open the email app
                  Alert.alert('Info', 'In a real app, this would open your email client.');
                }}
              >
                <Ionicons name="mail-open-outline" size={20} color="#fff" />
                <Text style={styles.openEmailButtonText}>Open Email App</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.resendButton}
                onPress={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#007AFF" />
                ) : (
                  <>
                    <Ionicons name="refresh-outline" size={18} color="#007AFF" />
                    <Text style={styles.resendButtonText}>Resend Email</Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.backToLoginButton2}
                onPress={handleBackToLogin}
              >
                <Text style={styles.backToLoginText2}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Help Text */}
        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>
            Need help? Contact our support team at
          </Text>
          <Text style={styles.helpEmail}>support@rmbbusiness.com</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRightPlaceholder: {
    width: 40,
  },
  instructionContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  lockIcon: {
    marginBottom: 20,
  },
  instructionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  inputGroup: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 56,
  },
  inputError: {
    borderColor: '#F44336',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 5,
  },
  resetButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  resetButtonDisabled: {
    backgroundColor: '#999',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  backToLoginText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  successContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  successIconContainer: {
    marginBottom: 30,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  successEmail: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  successNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
    fontStyle: 'italic',
  },
  openEmailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 15,
    width: '100%',
    justifyContent: 'center',
  },
  openEmailButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginBottom: 15,
    width: '100%',
    justifyContent: 'center',
  },
  resendButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  backToLoginButton2: {
    paddingVertical: 16,
  },
  backToLoginText2: {
    color: '#666',
    fontSize: 14,
  },
  helpContainer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingTop: 30,
  },
  helpText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  helpEmail: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
    marginTop: 5,
  },
});