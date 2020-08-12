import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from './use-auth';
import { useService } from './use-service';

export default function AuthGuard(Component) {
  const { user } = useAuth();
  const { messageService } = useService();
  return props => {
    if (!user) {
      messageService.error('You must be logged in ')
    }
    return user ? <Component {...props} /> : <Redirect to='/signIn' />
  }
}