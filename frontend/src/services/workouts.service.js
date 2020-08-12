
export default class WorkoutService{

  constructor(axios) {
    this.axios = axios
    this.BASE_URL = '/api/workout/'
  }
  create(name) {
    return this.axios.post(this.BASE_URL, { name }).then(response => response.data)
  }

  getAll() {
    return this.axios.get(this.BASE_URL).then(response => response.data)
  }

  getById(id) {
    return this.axios.get(this.BASE_URL + id).then(response => response.data)
  }

  remove(id) {
    return this.axios.delete(this.BASE_URL + id)
  }

  update({id, name, exercises}) {
    return this.axios.put(this.BASE_URL + id, { name, exercises }).then(response => response.data)
  }
}
