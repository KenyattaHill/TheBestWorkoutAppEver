import React, { useState, useEffect } from 'react';
import exercisesService from '../../services/exercises.service';
import ExerciseFilter from './exercise-filter';
import ExerciseList from './exercise-list';
import { Segment } from 'semantic-ui-react';
import messageService from '../../services/message.service';

export default function Exercises() {
  const [filter, setFilter] = useState({});
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const defaultFilter = {
    searchName: '',
    category: 0,
    equipment: 0,
    muscle: 0,
  };

  useEffect(() => {
    setLoading(true);
    exercisesService
      .getByFilter(filter)
      .then(exercises => {
        setLoading(false);
        setExercises(exercises);
      })
      .catch(error => {
        setLoading(false);
        messageService.error(
          error?.response?.data?.message || 'Something went wrong'
        );
      });
  }, [filter]);

  return (
    <Segment loading={loading}>
      <h1>Exercises</h1>
      <ExerciseFilter defaultValues={defaultFilter} setFilter={setFilter} />
      <ExerciseList exercises={exercises} />
    </Segment>
  );
}
