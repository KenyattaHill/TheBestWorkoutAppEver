import React, { useState } from 'react';
import exercisesService from '../../services/exercises.service';
import ExerciseFilter from './exercise-filter';
import { useEffect } from 'react';
import ExerciseList from './exercise-list';

export default function Exercises() {
  const defaultFilter = {
    searchName: 0,
    category: 0,
    equipment: 0,
    muscle: 0,
  };
  const [filter, setFilter] = useState({});
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  const getExercises = async filter => {
    setLoading(true);
    setExercises(await exercisesService.getByFilter(filter));
    setLoading(false);
  };

  useEffect(() => {
    getExercises(filter);
  }, [filter]);

  return (
    <div>
      <h1>Exercises Component</h1>
      <ExerciseFilter defaultValues={defaultFilter} setFilter={setFilter} />
      <ExerciseList loading={loading} exercises={exercises} />
    </div>
  );
}
