import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import SignIn from './components/sign-in/sign-in';
import SignUp from './components/sign-up/sign-up';
import authService from './services/auth.service';
import authGuard from './services/auth.guard';
import Workouts from './components/workouts/workouts';
import AddWorkout from './components/workouts/add-workout';
import Exercises from './components/exercises/exercises';
import NotFound from './components/not-found/not-found';
import ExerciseDetail from './components/exercises/exercise-detail';

function App() {
  const [user, setUser] = useState(authService.getCurrentUser());
  const history = useHistory();

  const logout = () => {
    setUser(null);
    authService.logout(history);
  };

  const AuthWorkouts = authGuard(Workouts);
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
      <Navbar user={user} logout={logout} />
      <div className='app'>
        <Switch>
          <Route exact path='/signUp'>
            <SignUp />
          </Route>
          <Route exact path='/signIn'>
            <SignIn setUser={setUser} />
          </Route>
          <Route exact path='/workouts'>
            <AuthWorkouts />
          </Route>
          <Route exact path='/workout/new'>
            <AuthAddWorkout />
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
