import React, { useState } from 'react';
import { Form, Message } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import authService from '../../services/auth.service';
import { useHistory } from 'react-router-dom';
import messageService from '../../services/message.service';

export default function SignIn({ setUser }) {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);

  const OnSubmit = data => {
    setLoading(true);
    authService
      .signIn(data)
      .then(user => {
        messageService.info(`Welcome ${user.firstName}`);
        setLoading(false);
        setUser(user);
        history.push('/');
      })
      .catch(error => {
        messageService.error(error.response.data.message);
        setLoading(false);
      });
  };
  return (
    <div className='app-form'>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit(OnSubmit)} loading={loading}>
        <Form.Field>
          <label>User Name</label>
          <input
            name='userName'
            placeholder='User Name'
            ref={register({ required: 'This is required!' })}
          />
          {errors.userName && (
            <Message negative>{errors.userName.message}</Message>
          )}
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            ref={register({
              required: 'This is required!',
              minLength: {
                value: 8,
                message: 'Password must be greater than 8 characters!',
              },
            })}
          />
          {errors.password && (
            <Message negative>{errors.password.message}</Message>
          )}
        </Form.Field>
        <Form.Button>Sign In</Form.Button>
      </Form>
    </div>
  );
}
