import React, { useState, useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import messageService from '../../services/message.service';
import WorkoutList from './workout-list';
import { useService } from '../../services/use-service';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false)
  const { workoutService } = useService();

  useEffect(() => {
    setLoading(true)
    workoutService.getAll().then(workouts => {
      setLoading(false)
      setWorkouts(workouts)
    }).catch((error) => {
      console.log(error.response.data)
      console.log({error})
      setLoading(false)
      messageService.error(error?.response?.data?.message || 'Could not load workouts')
    })
  }, [])

  return (
    <Segment loading={loading} className='workouts'>
      <h1>Workouts</h1>
      <WorkoutList workouts={workouts} />
    </Segment>
  );
}
