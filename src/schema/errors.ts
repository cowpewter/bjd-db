import { createError } from 'apollo-errors';

// tslint:disable:variable-name

export const AuthError = createError('AuthError', {
  message: 'You must be logged in',
});

// User.ts errors

export const LoginError = createError('LoginError', {
  message: 'Invalid username or password',
});

export const SignupError = createError('SignupError', {
  message: 'Unable to create account',
});

export const SignedOutError = createError('SignedOutError', {
  message: 'Please log in again',
});

export const PasswordError = createError('PasswordError', {
  message: 'Your password is incorrect',
});

export const UserNotFoundError = createError('UserNotFoundError', {
  message: 'Cannot find a user',
});
