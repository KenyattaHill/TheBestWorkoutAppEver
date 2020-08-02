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
import Exercises from './components/exercises/exercises';
import NotFound from './components/not-found/not-found';

function App() {
  const [user, setUser] = useState(authService.getCurrentUser());
  const history = useHistory();
  const logout = () => {
    setUser(null);
    authService.logout(history);
  };
  const AuthWorkouts = authGuard(Workouts);
  const AuthExercises = authGuard(Exercises);
  return (
    <>
      <Navbar user={user} logout={logout} />
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
        <Route exact path='/exercises'>
          <AuthExercises />
        </Route>
        <Route exact path='/' render={Home} />
        <Route path='*' render={NotFound} />
      </Switch>
      <ToastContainer newestOnTop={true} />
    </>
  );
}

export default App;
