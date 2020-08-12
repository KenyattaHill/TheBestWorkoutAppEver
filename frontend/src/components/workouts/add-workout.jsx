import React from 'react';
import { Segment, Message, Form } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useService } from '../../services/use-service';

export default function AddWorkout() {
  const { register, handleSubmit, errors } = useForm();
  const { workoutService, messageService } = useService();
  const history = useHistory();
  const OnSubmit = data => {
    workoutService
      .create(data.workoutName)
      .then(({ _id }) => {
        messageService.success('Workout created');
        history.push('/workouts/' + _id);
      })
      .catch(error => {
        console.log(error.response.data.message);
        messageService.error(
          error?.response?.data?.message || 'Something went wrong!'
        );
      });
  };
  return (
    <Segment className='auth-form'>
      <h1>Create Workout</h1>
      <Form onSubmit={handleSubmit(OnSubmit)}>
        <Form.Field>
          <label>Workout Name</label>
          <input
            name='workoutName'
            placeholder='Workout Name'
            ref={register({ required: true })}
          />
          {errors.workoutName && (
            <Message negative>{errors.workoutName.message}</Message>
          )}
        </Form.Field>
        <Form.Button floated='right'>Add</Form.Button>
      </Form>
    </Segment>
  );
}
