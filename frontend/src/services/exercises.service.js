import axios from 'axios';
// Endpoints
//exercise
//exerciseinfo
//exercisecategory
//exerciseimage
//muscle
//equipment
const BASE_URL = `https://wger.de/api/v2/`;

const workoutManager = (endpoint, params = {}) => axios.get(BASE_URL + endpoint, {params})

function getByFilter(category = '', equipment = '', muscles = '') {

  const params = new URLSearchParams({
    status: '2',
    format: 'json',
    language: '2'
  });
  if(category) params.append('category', category)
  if(equipment) params.append('equipment', equipment)
  if(muscles) params.append('muscles', muscles)
  return workoutManager('exercise', params)
    .then(response => response.data)

}

function getById(id) {
  
}

function categories() {
  
}

function muscles() {
  
}

function equipment() {
  
}

export default {
  getByFilter,
  getById,
  categories,
  muscles,
  equipment
}


//filter by category, equipment, muscle