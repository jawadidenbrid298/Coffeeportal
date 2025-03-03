import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import LoginScreen from '../src/screens/auth/login/login';
import {signIn} from 'aws-amplify/auth';

// Mock navigation prop
const mockNavigation = {navigate: jest.fn()};

// Mock AWS Amplify signIn function
jest.mock('aws-amplify/auth', () => ({
  signIn: jest.fn()
}));

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(<LoginScreen navigation={mockNavigation} />);

    expect(getByText('Welcome Back!')).toBeTruthy();
    expect(getByPlaceholderText('Email address')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('shows validation errors for empty fields', async () => {
    const {getByText, getByTestId} = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(getByText('Email is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
    });
  });

  it('calls signIn function on valid login', async () => {
    signIn.mockResolvedValue({isSignedIn: true, nextStep: null});

    const {getByPlaceholderText, getByTestId} = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Email address'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({
        username: 'test@example.com',
        password: 'password123'
      });
      expect(mockNavigation.navigate).toHaveBeenCalledWith('landingpage');
    });
  });

  it('displays error message on failed login', async () => {
    signIn.mockRejectedValue({code: 'NotAuthorizedException', message: 'Incorrect email or password.'});

    const {getByPlaceholderText, getByTestId, getByText} = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Email address'), 'wrong@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(getByText('Incorrect email or password.')).toBeTruthy();
    });
  });
});
