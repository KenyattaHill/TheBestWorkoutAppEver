import React from 'react';
import { Redirect } from 'react-router-dom';
import messageService from './message.service';
import { useAuth } from './use-auth';

export default function AuthGuard(Component) {
  const {user} = useAuth()
  return props => {
    if (!user) {
      messageService.error('You must be logged in ')
    }
    return user ? <Component {...props} /> : <Redirect to='/signIn' />
  }
}