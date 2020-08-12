export default class ExerciseService {
  constructor(axios) {
    this.axios = axios
    this.BASE_URL = '/api/'
    this.workoutManager = (endpoint, params = {}) => {
      return this.axios.get(this.BASE_URL + endpoint, { params }).then(response => response.data)
    }
  }

  getByFilter({ searchName, category, equipment, muscle }) {

    const params = new URLSearchParams();
    if (searchName) params.append('text', searchName)
    if (category) params.append('category', category)
    if (equipment) params.append('equipment', equipment)
    if (muscle) params.append('muscle', muscle)

    return this.workoutManager('exercise', params).then(({ exercises }) => exercises)
  }

  getById(id) {
    return this.workoutManager('exercise/' + id).then(({ exercise }) => exercise)
  }

  categories() {
    return this.workoutManager('filter/category').then(response => response.categories.map(({ id, name }) => ({ key: id, value: id, text: name })))
  }

  muscles() {
    return this.workoutManager('filter/muscle').then(response => response.muscles.map(({ id, name }) => ({ key: id, value: id, text: name })))
  }

  equipment() {
    return this.workoutManager('filter/equipment').then(response => response.equipment.map(({ id, name }) => ({ key: id, value: id, text: name })))
  }
}
