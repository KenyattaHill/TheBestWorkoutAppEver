import React, { useState } from 'react';
import { Form, Message, Segment } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import messageService from '../../services/message.service';
import { useAuth } from '../../services/use-auth';

export default function SignIn() {
  const { signIn } = useAuth();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);

  const OnSubmit = data => {
    setLoading(true);
    signIn(data)
      .then((firstName) => {
        messageService.info(`Welcome ${firstName}`);
        setLoading(false);
        history.push('/');
      })
      .catch(error => {
        messageService.error(error.response.data.message);
        setLoading(false);
      });
  };
  return (
    <Segment className='auth-form'>
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
        <Form.Button primary>Sign In</Form.Button>
      </Form>
    </Segment>
  );
}
