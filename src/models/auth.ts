export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
  redirectUrl?: string;
}

export interface PasswordSetRequest {
  token: string;
  secret: string;
  password: string;
  password_confirm: string;
}
