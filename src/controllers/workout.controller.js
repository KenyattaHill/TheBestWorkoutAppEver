const { Workout } = require('../models');

const getAll = async (request, response) => {
  const { userId } = request;
  const workouts = await Workout.find({ userId }).catch(error => response.status(500).send({ message: error }));
  response.status(200).json(workouts)
}

const getById = async (request, response) => {
  const { id } = request.params;

  const workout = await Workout.findById(id).catch(error => response.status(500).send({ message: error }));

  if (!workout) {
    return response.status(404).send({ message: 'Workout not found!' })
  }

  response.status(200).json(workout);
}

const create = async (request, response) => {
  const { userId } = request;
  const { name } = request.body;

  const newWorkout = await Workout.create({ name, userId }).catch(error => response.status(500).send({ message: error }));

  response.status(200).json(newWorkout)
}

const update = async (request, response) => {
  const { id } = request.params;
  const { name, exercises } = request.body;

  const query = { name };

  if (exercises && exercises.length) {
    query.exercises = exercises;
  }

  const workout = await Workout.findByIdAndUpdate(id, query).catch(error => response.status(500).send({ message: error }));
  if (!workout) {
    return response.status(404).send({ message: 'Workout not found!' })
  }
  response.status(200).json(workout)
}

const remove = async (request, response) => {
  const { id } = request.params;
  const workout = await Workout.findByIdAndDelete(id).catch(error => response.status(500).send({ message: error }));
  if (!workout) {
    return response.status(404).send({ message: 'Workout not found!' })
  }
  response.status(200).json(workout)
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}