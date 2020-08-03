import React, { useState } from 'react';
import { Form, Message } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import authService from '../../services/auth.service';
import { useHistory } from 'react-router-dom';
import messageService from '../../services/message.service';

export default function SignUp() {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);

  const OnSubmit = (data, e) => {
    setLoading(true);
    authService
      .signUp(data)
      .then(response => {
        setLoading(false);
        messageService.success(response.data.message);
        history.push('/signIn');
        messageService.info('Please sign in.');
      })
      .catch(error => {
        setLoading(false);
        messageService.error(error.response.data.message);
      });
  };
  return (
    <div className='auth-form'>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit(OnSubmit)} loading={loading}>
        <Form.Field>
          <label>First Name</label>
          <input
            name='firstName'
            placeholder='First Name'
            ref={register({ required: 'This is required' })}
          />
          {errors.firstName && (
            <Message negative>{errors.firstName.message}</Message>
          )}
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            name='lastName'
            placeholder='Last Name'
            ref={register({ required: 'This is required' })}
          />
          {errors.lastName && (
            <Message negative>{errors.lastName.message}</Message>
          )}
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            name='email'
            type='email'
            placeholder='Email'
            ref={register({
              required: 'This is required',
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <Message negative>{errors.email.message}</Message>}
        </Form.Field>
        <Form.Field>
          <label>User Name</label>
          <input
            name='userName'
            placeholder='User Name'
            ref={register({ required: 'This is required' })}
          />
          {errors.userName && (
            <Message negative>{errors.userName.message}</Message>
          )}
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            ref={register({
              required: 'This is required',
              minLength: {
                value: 8,
                message: 'Password must be greater than 8 characters',
              },
            })}
          />
          {errors.password && (
            <Message negative>{errors.password.message}</Message>
          )}
        </Form.Field>
        <Form.Button>Sign Up</Form.Button>
      </Form>
    </div>
  );
}
