// Validates that two password strings match.
// Called before sign-up to avoid a round-trip to Supabase with bad data.

export interface PasswordValidationResult {
  valid: boolean;
  error?: string;
}

export function validatePasswords(
  password: string,
  confirmPassword: string
): PasswordValidationResult {
  if (password.length < 6) {
    return { valid: false, error: "Password must be at least 6 characters" };
  }
  if (password !== confirmPassword) {
    return { valid: false, error: "passwordMismatch" }; // i18n key
  }
  return { valid: true };
}
