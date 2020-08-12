import React from 'react';
import { Redirect } from 'react-router-dom';
import { useService } from '../../services/use-service';

export default function NotFound() {
  const { messageService } = useService();
  messageService.error('Sorry that page does not exist!');
  return <Redirect to='/' />
}