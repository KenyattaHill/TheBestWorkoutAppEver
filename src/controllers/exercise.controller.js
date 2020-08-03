const { Exercise, Comment, Image } = require('../models');

async function getAllByFilter(request, response) {
  const { category, equipment, muscle, text } = request.query

  const query = {}
  if (category) {
    query.category = category
  }
  if (equipment) {
    query.equipment = equipment
  }
  if (muscle) {
    query.muscles = muscle
  }
  if (text) {
    query.name = { $regex: text, $options: 'i' }
  }

  const exercises = await Exercise.find(query)
    .populate('equipment')
    .populate('muscles')
    .populate('musclesSecondary')
    .populate('category').catch(error => response.status(500).send({ message: error }))

  const mappedExercises = exercises.map(async ({ _id, name, description, muscles, musclesSecondary, equipment, category }) => {

    const image = await Image.findOne({ exercise: _id })
    const comment = await Comment.findOne({ exercise: _id })

    return {
      id: _id,
      name,
      description,
      image: image ? image.image : 'https://wger.de/static/images/icons/image-placeholder.svg',
      comment: comment ? comment.comment : '',
      category: category.name,
      equipment: equipment.map(({ _id, name }) => ({ id: _id, name })),
      muscles: muscles.map(({ _id, name, isFront }) => ({ id: _id, name, isFront })),
      musclesSecondary: musclesSecondary.map(({ _id, name, isFront }) => ({ id: _id, name, isFront }))
    }
  })

  response.json({ exercises: await Promise.all(mappedExercises) })
}

async function getDetail(request, response) {
  const { id } = request.params

  const exercise = await Exercise.findById(id)
    .populate('equipment')
    .populate('muscles')
    .populate('musclesSecondary')
    .populate('category').catch(error => response.status(500).send({ message: error }));

  if (!exercise) return response.status(404).send({
    message: 'Exercise not found!'
  });

  const image = await Image.findOne({ exercise: exercise.id })
  const comment = await Comment.findOne({ exercise: exercise.id })

  const mappedExercise = {
    id: exercise._id,
    name: exercise.name,
    description: exercise.description,
    image: image ? image.image : 'https://wger.de/static/images/icons/image-placeholder.svg',
    comment: comment ? comment.comment : '',
    category: exercise.category.name,
    equipment: exercise.equipment.map(({ _id, name }) => ({ id: _id, name })),
    muscles: exercise.muscles.map(({ _id, name, isFront }) => ({ id: _id, name, isFront })),
    musclesSecondary: exercise.musclesSecondary.map(({ _id, name, isFront }) => ({ id: _id, name, isFront }))
  }

  response.json({ exercise: mappedExercise })
}

module.exports = { getAllByFilter, getDetail }