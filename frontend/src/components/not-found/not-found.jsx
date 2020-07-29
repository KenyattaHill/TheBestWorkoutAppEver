import React from 'react';
import { Redirect } from 'react-router-dom';
import messageService from '../../services/message.service';

export default function NotFound() {
  messageService.error('Sorry that page does not exist!');
  return <Redirect to='/' />
}