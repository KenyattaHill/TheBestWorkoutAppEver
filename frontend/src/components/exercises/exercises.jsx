import React, { useState, useEffect } from 'react';
import exercisesService from '../../services/exercises.service';
import ExerciseFilter from './exercise-filter';
import ExerciseList from './exercise-list';
import { Segment } from 'semantic-ui-react';

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
    const getExercises = async filter => {
      setLoading(true);
      setExercises(await exercisesService.getByFilter(filter));
      setLoading(false);
    };
    getExercises(filter);
  }, [filter]);

  return (
    <Segment loading={loading}>
      <h1>Exercises</h1>
      <ExerciseFilter defaultValues={defaultFilter} setFilter={setFilter} />
      <ExerciseList exercises={exercises} />
    </Segment>
  );
}
