import axios from 'axios';
import messageService from './message.service';

const USER_KEY = 'user'

const signUp = ({ userName, firstName, lastName, email, password }) =>
  axios.post('/api/auth/signUp', {
    userName,
    firstName,
    lastName,
    email,
    password
  });

const signIn = ({ userName, password }) =>
  axios.post('/api/auth/signIn', { userName, password })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.data))
      }
      return response.data;
    })

const logout = (history) => {
  localStorage.removeItem(USER_KEY);
  messageService.info('Thank you come back soon!');
  history.push('/signIn')
};

const getCurrentUser = () => JSON.parse(localStorage.getItem(USER_KEY))

export const authHeader = () => {
  const user = getCurrentUser();
  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return {}
  }
}

export default {
  signUp,
  signIn,
  logout,
  getCurrentUser
}