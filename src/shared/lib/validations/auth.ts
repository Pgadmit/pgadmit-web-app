export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthValidationErrors {
  [key: string]: string | undefined;
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'Email is required';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }

  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) {
    return 'Name is required';
  }

  if (name.length < 2) {
    return 'Name must be at least 2 characters long';
  }

  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  return null;
};

export const validateLoginForm = (
  credentials: LoginCredentials
): AuthValidationErrors => {
  const errors: AuthValidationErrors = {};

  const emailError = validateEmail(credentials.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(credentials.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateRegisterForm = (
  data: RegisterData
): AuthValidationErrors => {
  const errors: AuthValidationErrors = {};

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;

  const confirmPasswordError = validateConfirmPassword(
    data.password,
    data.confirmPassword
  );
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

  return errors;
};
