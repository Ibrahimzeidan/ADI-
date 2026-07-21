export interface PasswordValidationResult {
  valid: boolean;
  error?: string;
}

export function validatePasswords(
  password: string,
  confirmPassword: string
): PasswordValidationResult {
  if (password.length < 6) {
    // "passwordTooShort" is an i18n key in messages/en.json and ar.json
    return { valid: false, error: "passwordTooShort" };
  }
  if (password !== confirmPassword) {
    return { valid: false, error: "passwordMismatch" };
  }
  return { valid: true };
}
