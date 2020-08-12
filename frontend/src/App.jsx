import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import SignIn from './components/sign-in/sign-in';
import SignUp from './components/sign-up/sign-up';
import authGuard from './services/auth.guard';
import Workouts from './components/workouts/workouts';
import AddWorkout from './components/workouts/add-workout';
import Exercises from './components/exercises/exercises';
import NotFound from './components/not-found/not-found';
import ExerciseDetail from './components/exercises/exercise-detail';
import WorkoutDetail from './components/workouts/workout-detail';

function App() {

  const AuthWorkouts = authGuard(Workouts);
  const AuthWorkoutDetail = authGuard(WorkoutDetail);
  const AuthAddWorkout = authGuard(AddWorkout);
  const AuthExercises = authGuard(Exercises);
  const AuthExerciseDetail = authGuard(ExerciseDetail);

  return (
    <div
      style={{
        backgroundImage: `url('/assets/fitness.jpg')`,
        backgroundSize: 'cover',
        overflow: 'scroll',
        height: '100vh',
      }}>
      <Navbar />
      <div className='app'>
        <Switch>
          <Route exact path='/signUp'>
            <SignUp />
          </Route>
          <Route exact path='/signIn'>
            <SignIn />
          </Route>
          <Route exact path='/workouts'>
            <AuthWorkouts />
          </Route>
          <Route exact path='/workouts/new'>
            <AuthAddWorkout />
          </Route>
          <Route exact path='/workouts/:id'>
            <AuthWorkoutDetail />
          </Route>
          <Route exact path='/exercises'>
            <AuthExercises />
          </Route>
          <Route exact path='/exercises/:id'>
            <AuthExerciseDetail />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='*' render={NotFound} />
        </Switch>
      </div>
      <ToastContainer newestOnTop={true} />
    </div>
  );
}

export default App;
