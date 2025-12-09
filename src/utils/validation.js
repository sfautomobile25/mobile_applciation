export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // At least 6 characters
  return password.length >= 6;
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validatePhone = (phone) => {
  const re = /^[\+]?[1-9][\d]{0,15}$/;
  return re.test(phone.replace(/\D/g, ''));
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const validateBusinessName = (businessName) => {
  return businessName.trim().length >= 2;
};

export const validateForm = (formData, formType = 'login') => {
  const errors = {};

  if (formType === 'login') {
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 6 characters';
    }
  }

  if (formType === 'register') {
    if (!formData.name) {
      errors.name = 'Full name is required';
    } else if (!validateName(formData.name)) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (!validateConfirmPassword(formData.password, formData.confirmPassword)) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.businessName) {
      errors.businessName = 'Business name is required';
    } else if (!validateBusinessName(formData.businessName)) {
      errors.businessName = 'Business name must be at least 2 characters';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
  }

  if (formType === 'forgot') {
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
  }

  return errors;
};