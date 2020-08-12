import React, { useContext, createContext } from 'react';
import axios from 'axios'
import ExerciseService from './exercises.service';
import { useAuth } from './use-auth';
import WorkoutService from './workouts.service';

const serviceContext = createContext();

export function ProvideService({ children }) {
  const services = useProvideService()
  return <serviceContext.Provider value={services}>{children}</serviceContext.Provider>
}

export const useService = () => {
  return useContext(serviceContext);
}

function useProvideService() {
  const { user } = useAuth();
  const client = axios.create({
    headers:{ 'x-access-token': user?.accessToken}
  })
  const workoutService = new WorkoutService(client)
  const exerciseService = new ExerciseService(client)

  return {
    exerciseService,
    workoutService
  }
}