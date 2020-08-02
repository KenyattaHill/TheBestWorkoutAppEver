const axios = require('axios');
const { Category, Equipment, Muscle, Exercise, Comment, Image } = require('./index');

const BASE_URL = `https://wger.de/api/v2/`;

const workoutManager = (endpoint, params = {}) => axios.get(BASE_URL + endpoint, { params })

const store = async () => {
  const categoryCount = await Category.estimatedDocumentCount();
  const equipmentCount = await Equipment.estimatedDocumentCount();
  const muscleCount = await Muscle.estimatedDocumentCount();
  const exerciseCount = await Exercise.estimatedDocumentCount();
  const commentCount = await Comment.estimatedDocumentCount();
  const imageCount = await Image.estimatedDocumentCount();

  if (categoryCount === 0) {
    const wCategories = (await workoutManager('exercisecategory')).data;
    const newCategories = wCategories.map(({ id, name }) => ({ _id: id, name }))
    await Category.insertMany(newCategories)
    console.log('Categories Inserted');
  }

  if (equipmentCount === 0) {
    const wEquipment = (await workoutManager('equipment')).data;
    const newEquipment = wEquipment.map(({ id, name }) => ({ _id: id, name }))
    await Equipment.insertMany(newEquipment)
    console.log('Equipment Inserted');
  }

  if (muscleCount === 0) {
    const wMuscles = (await workoutManager('muscle')).data;
    const newMuscles = wMuscles.map(({ id, name, is_front }) => ({ _id: id, name, isFront: is_front }))
    await Muscle.insertMany(newMuscles)
    console.log('Muscles Inserted');

  }

  if (exerciseCount === 0) {
    const wExercises = await workoutManager('exercise', { status: 2, language: 2 });
    const newExercises = wExercises.data.map(({ id, name, description, muscles, equipment, category, muscles_secondary }) =>
      ({ _id: id, name, description, muscles, equipment, category, musclesSecondary: muscles_secondary }))
    await Exercise.insertMany(newExercises)
    console.log('Exercises Inserted');
  }

  if (commentCount === 0) {
    const wComments = (await workoutManager('exercisecomment', { status: 2, language: 2 })).data;
    const newComments = wComments.map(({ id, comment, exercise }) => ({ _id: id, comment, exercise }))
    await Comment.insertMany(newComments)
    console.log('Comments Inserted');

  }

  if (imageCount === 0) {
    const wImages = (await workoutManager('exerciseimage', { status: 2, language: 2 })).data;
    const newImages = wImages.map(({ id, image, exercise }) => ({ _id: id, image, exercise }))
    await Image.insertMany(newImages)
    console.log('Images Inserted');

  }

}

const remove = async () => {
  await Category.deleteMany()
  await Equipment.deleteMany();
  await Muscle.deleteMany();
  await Exercise.deleteMany()
  await Comment.deleteMany();
  await Image.deleteMany()
  console.log('Collections removed')
}

module.exports = {
  store,
  remove
}