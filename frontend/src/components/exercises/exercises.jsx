import React from 'react';
import exercisesService from '../../services/exercises.service';

export default function Exercises() {
  exercisesService.getByFilter('10', '3').then(console.log)
  return (
    <>
      <h1>Exercises Component</h1>
    </>
  );
}
