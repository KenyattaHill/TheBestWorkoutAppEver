import axios from 'axios'
import authService from './auth.service'

const BASE_URL = '/api/workout/';
const axiosClient = axios.create({
  headers: {
    'x-access-token': authService.getCurrentUser()?.accessToken || 'No Token'
  }
})

const create = (name) => axiosClient.post(BASE_URL, { name }).then(response => response.data)

const getAll = () => axiosClient.get(BASE_URL).then(response => response.data)

const getById = id => axiosClient.get(BASE_URL + id).then(response => response.data)

const remove = id => axiosClient.delete(BASE_URL + id)

const update = ({ id, name, exercises }) =>
  axiosClient.put(BASE_URL + id, { name, exercises }).then(response => response.data)

export default {
  create,
  getAll,
  getById,
  remove,
  update
}