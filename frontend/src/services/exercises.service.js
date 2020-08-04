import axios from 'axios';
import authService from './auth.service';

const BASE_URL = `/api/`;

const workoutManager = (endpoint, params = {}) => axios.get(BASE_URL + endpoint, {
  params, headers: {
    'x-access-token': authService.getCurrentUser()?.accessToken || 'No Token'
  }
}).then(response => response.data)

function getByFilter({ searchName, category, equipment, muscle }) {

  const params = new URLSearchParams();
  if (searchName) params.append('text', searchName)
  if (category) params.append('category', category)
  if (equipment) params.append('equipment', equipment)
  if (muscle) params.append('muscle', muscle)

  return workoutManager('exercise', params).then(({ exercises }) => exercises)
}

function getById(id) {
  return workoutManager('exercise/' + id).then(({exercise}) => exercise)
}

function categories() {
  return workoutManager('filter/category').then(response => response.categories.map(({ id, name }) => ({ key: id, value: id, text: name })))
}

function muscles() {
  return workoutManager('filter/muscle').then(response => response.muscles.map(({ id, name }) => ({ key: id, value: id, text: name })))
}

function equipment() {
  return workoutManager('filter/equipment').then(response => response.equipment.map(({ id, name }) => ({ key: id, value: id, text: name })))
}

export default {
  getByFilter,
  getById,
  categories,
  muscles,
  equipment
}


//filter by category, equipment, muscle