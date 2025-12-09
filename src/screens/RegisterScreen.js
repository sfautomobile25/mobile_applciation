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
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { validateForm } from '../utils/validation';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleNextStep = () => {
    // Validate current step
    let stepErrors = {};
    
    if (currentStep === 1) {
      if (!formData.name) stepErrors.name = 'Full name is required';
      if (!formData.email) stepErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        stepErrors.email = 'Please enter a valid email';
      }
    } else if (currentStep === 2) {
      if (!formData.businessName) stepErrors.businessName = 'Business name is required';
      if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\D/g, ''))) {
        stepErrors.phone = 'Please enter a valid phone number';
      }
    } else if (currentStep === 3) {
      if (!formData.password) stepErrors.password = 'Password is required';
      else if (formData.password.length < 6) {
        stepErrors.password = 'Password must be at least 6 characters';
      }
      if (!formData.confirmPassword) stepErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) {
        stepErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRegister = async () => {
  console.log('Register function called');
  
  // Validate all fields
  const validationErrors = validateForm(formData, 'register');
  
  if (!formData.acceptTerms) {
    validationErrors.acceptTerms = 'You must accept the terms and conditions';
  }

  if (Object.keys(validationErrors).length > 0) {
    console.log('Validation errors:', validationErrors);
    setErrors(validationErrors);
    return;
  }

  console.log('Starting registration process...');
  setIsLoading(true);

  try {
    console.log('Simulating API call...');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Registration successful');
    // Navigate back to login
    navigation.goBack();
  } catch (error) {
    console.error('Registration error:', error);
    Alert.alert('Error', 'Registration failed. Please try again.');
  } finally {
    console.log('Setting loading to false');
    setIsLoading(false);
  }
};

  const renderStepIndicator = () => {
    return (
      <View style={styles.stepIndicator}>
        {[1, 2, 3, 4].map((step) => (
          <View key={step} style={styles.stepContainer}>
            <View
              style={[
                styles.stepCircle,
                step === currentStep && styles.stepCircleActive,
                step < currentStep && styles.stepCircleCompleted,
              ]}
            >
              {step < currentStep ? (
                <Ionicons name="checkmark" size={16} color="#fff" />
              ) : (
                <Text style={[
                  styles.stepNumber,
                  step === currentStep && styles.stepNumberActive,
                  step < currentStep && styles.stepNumberCompleted,
                ]}>
                  {step}
                </Text>
              )}
            </View>
            <Text style={[
              styles.stepLabel,
              step === currentStep && styles.stepLabelActive,
              step < currentStep && styles.stepLabelCompleted,
            ]}>
              {step === 1 && 'Personal'}
              {step === 2 && 'Business'}
              {step === 3 && 'Security'}
              {step === 4 && 'Review'}
            </Text>
            {step < 4 && <View style={styles.stepLine} />}
          </View>
        ))}
      </View>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Personal Information</Text>
            <Text style={styles.stepDescription}>
              Tell us a little about yourself
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name *</Text>
              <View style={[styles.inputContainer, errors.name && styles.inputError]}>
                <Ionicons name="person-outline" size={22} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChangeText={(text) => handleInputChange('name', text)}
                  editable={!isLoading}
                />
              </View>
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address *</Text>
              <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                <Ionicons name="mail-outline" size={22} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isLoading}
                />
              </View>
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Business Information</Text>
            <Text style={styles.stepDescription}>
              Tell us about your business
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Business Name *</Text>
              <View style={[styles.inputContainer, errors.businessName && styles.inputError]}>
                <Ionicons name="business-outline" size={22} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChangeText={(text) => handleInputChange('businessName', text)}
                  editable={!isLoading}
                />
              </View>
              {errors.businessName ? <Text style={styles.errorText}>{errors.businessName}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={[styles.inputContainer, errors.phone && styles.inputError]}>
                <Ionicons name="call-outline" size={22} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChangeText={(text) => handleInputChange('phone', text)}
                  keyboardType="phone-pad"
                  editable={!isLoading}
                />
              </View>
              {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Business Type</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="briefcase-outline" size={22} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Retail, Service, Manufacturing"
                  value={formData.businessType}
                  onChangeText={(text) => handleInputChange('businessType', text)}
                  editable={!isLoading}
                />
              </View>
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Security</Text>
            <Text style={styles.stepDescription}>
              Create a secure password for your account
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password *</Text>
              <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                <Ionicons name="lock-closed-outline" size={22} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  value={formData.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                  disabled={isLoading}
                >
                  <Ionicons 
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                    size={22} 
                    color="#666" 
                  />
                </TouchableOpacity>
              </View>
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
              <Text style={styles.passwordHint}>
                Must be at least 6 characters long
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm Password *</Text>
              <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
                <Ionicons name="lock-closed-outline" size={22} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChangeText={(text) => handleInputChange('confirmPassword', text)}
                  secureTextEntry={!showConfirmPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity 
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                  disabled={isLoading}
                >
                  <Ionicons 
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} 
                    size={22} 
                    color="#666" 
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Review & Confirm</Text>
            <Text style={styles.stepDescription}>
              Please review your information before submitting
            </Text>

            <View style={styles.reviewCard}>
              <View style={styles.reviewSection}>
                <Text style={styles.reviewSectionTitle}>Personal Info</Text>
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>Full Name:</Text>
                  <Text style={styles.reviewValue}>{formData.name}</Text>
                </View>
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>Email:</Text>
                  <Text style={styles.reviewValue}>{formData.email}</Text>
                </View>
              </View>

              <View style={styles.reviewSection}>
                <Text style={styles.reviewSectionTitle}>Business Info</Text>
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>Business Name:</Text>
                  <Text style={styles.reviewValue}>{formData.businessName}</Text>
                </View>
                {formData.phone ? (
                  <View style={styles.reviewItem}>
                    <Text style={styles.reviewLabel}>Phone:</Text>
                    <Text style={styles.reviewValue}>{formData.phone}</Text>
                  </View>
                ) : null}
                {formData.businessType ? (
                  <View style={styles.reviewItem}>
                    <Text style={styles.reviewLabel}>Business Type:</Text>
                    <Text style={styles.reviewValue}>{formData.businessType}</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.termsContainer}>
                <TouchableOpacity 
                  style={styles.termsCheckboxContainer}
                  onPress={() => handleInputChange('acceptTerms', !formData.acceptTerms)}
                  disabled={isLoading}
                >
                  <View style={[styles.checkbox, formData.acceptTerms && styles.checkboxChecked]}>
                    {formData.acceptTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
                  </View>
                  <Text style={styles.termsText}>
                    I agree to the{' '}
                    <Text style={styles.termsLink}>Terms of Service</Text>
                    {' '}and{' '}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                  </Text>
                </TouchableOpacity>
                {errors.acceptTerms ? (
                  <Text style={styles.errorText}>{errors.acceptTerms}</Text>
                ) : null}
              </View>
            </View>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              disabled={isLoading}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Account</Text>
            <View style={styles.headerRightPlaceholder} />
          </View>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <View style={styles.navigationButtons}>
            {currentStep > 1 ? (
              <TouchableOpacity 
                style={styles.prevButton}
                onPress={handlePrevStep}
                disabled={isLoading}
              >
                <Ionicons name="arrow-back" size={20} color="#007AFF" />
                <Text style={styles.prevButtonText}>Back</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.emptyButton} />
            )}

            {currentStep < 4 ? (
              <TouchableOpacity 
                style={styles.nextButton}
                onPress={handleNextStep}
                disabled={isLoading}
              >
                <Text style={styles.nextButtonText}>Continue</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text style={styles.registerButtonText}>Create Account</Text>
                    <Ionicons name="checkmark-circle" size={20} color="#fff" style={styles.registerIcon} />
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* Already have account */}
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginLinkText}>Already have an account? </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Login')}
              disabled={isLoading}
            >
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* DEBUG: Direct navigation button */}
          <TouchableOpacity 
            style={styles.debugButton}
            onPress={() => navigation.replace('Login', { registeredEmail: 'test@example.com' })}
          >
            <Text style={styles.debugButtonText}>DEBUG: Direct to Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
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
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  stepCircleActive: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  stepCircleCompleted: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
  },
  stepNumberActive: {
    color: '#fff',
  },
  stepNumberCompleted: {
    color: '#fff',
  },
  stepLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
    position: 'absolute',
    top: 40,
    width: 60,
    left: -12,
  },
  stepLabelActive: {
    color: '#007AFF',
    fontWeight: '500',
  },
  stepLabelCompleted: {
    color: '#4CAF50',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  stepContent: {
    marginBottom: 40,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 25,
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
  eyeIcon: {
    padding: 5,
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 5,
  },
  passwordHint: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  reviewCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
  },
  reviewSection: {
    marginBottom: 20,
  },
  reviewSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  reviewLabel: {
    fontSize: 14,
    color: '#666',
    width: 120,
  },
  reviewValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  termsContainer: {
    marginTop: 20,
  },
  termsCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 10,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  termsLink: {
    color: '#007AFF',
    fontWeight: '500',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  emptyButton: {
    width: 100,
  },
  prevButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  prevButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 5,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
  },
  registerButtonDisabled: {
    backgroundColor: '#999',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerIcon: {
    marginLeft: 8,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginLinkText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  debugButton: {
    backgroundColor: '#FF9800',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  debugButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});