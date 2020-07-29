import './App.css';
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

function App() {
  const [user, setUser] = useState(authService.getCurrentUser());
  const history = useHistory()
  const logout = () => {
    setUser(null);
    authService.logout(history);
  };
  return (
    <div>
      <Navbar user={user} logout={logout} />
      <Switch>
        <Route exact path='/' render={authGuard(Home)} />
        <Route exact path='/signUp'>
          <SignUp />
        </Route>
        <Route exact path='/signIn'>
          <SignIn setUser={setUser} />
        </Route>
        <Route exact path='/workouts' render={authGuard(Workouts)} />
        <Route exact path='/exercises' render={authGuard(Exercises)} />
      </Switch>
      <ToastContainer newestOnTop={true} />
    </div>
  );
}

export default App;