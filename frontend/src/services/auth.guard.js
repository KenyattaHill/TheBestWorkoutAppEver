import React from 'react';
import { Redirect } from 'react-router-dom';
import authService from './auth.service';
import messageService from './message.service';

export default function AuthGuard(Component) {
  return () => {
    const isAuthenticated = authService.getCurrentUser();
    if (!isAuthenticated) {
      messageService.error('You must be logged in ')
    }
    return isAuthenticated ? <Component /> : <Redirect to='/signIn' />
  }
}