import React, { useState, useContext, createContext } from 'react';
import axios from 'axios'


const authContext = createContext();
const USER_KEY = 'app-user'

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(USER_KEY)));

  const signIn = ({ userName, password }) =>
    axios.post('/api/auth/signIn', { userName, password })
      .then(response => {
        if (response.data.accessToken) {
          const user = response.data
          localStorage.setItem(USER_KEY, JSON.stringify(user))
          setUser(user)
          return response.data.firstName
        }
      })

  const signUp = ({ userName, firstName, lastName, email, password }) =>
    axios.post('/api/auth/signUp', {
      userName,
      firstName,
      lastName,
      email,
      password
    });

  const logout = () => {
    localStorage.removeItem(USER_KEY);
    setUser(null)
  };

  return {
    user,
    signIn,
    signUp,
    logout
  }
}