import React from 'react';
import { Segment, Message, Form } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import workoutsService from '../../services/workouts.service';
import messageService from '../../services/message.service';

export default function AddWorkout() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory()
  const OnSubmit = data => {
    workoutsService.create(data.workoutName).then(({_id}) => {
      messageService.success('Workout created')
      history.push('/workouts/' + _id)
    }).catch((error) => {
      console.log(error.response.data)
      messageService.error('Workout cannot be added at this time..')
    })
  }
  return (
    <Segment className='auth-form'>
      <h1>Create Workout</h1>
      <Form onSubmit={handleSubmit(OnSubmit)}>
        <Form.Field>
          <label>Workout Name</label>
          <input name="workoutName" placeholder="Workout Name" ref={register({required: true})} />
          {errors.workoutName && (<Message negative>{errors.workoutName.message}</Message>)}
        </Form.Field>
        <Form.Button floated='right'>Add</Form.Button>
      </Form>
    </Segment>
  );
}