const { Category, Equipment, Muscle } = require('../models');

async function getCategories(request, response) {
  const categories = await Category.find({}).catch(error =>
    response.status(500).send({
      message: error
    }));

  if (categories.length === 0) {
    return response.status(404).send({
      message: 'No categories'
    })
  }

  return response.status(200).json({
    categories: categories.map(({ _id, name }) => ({ id: _id, name }))
  })
}

async function getMuscles(request, response) {
  const muscles = await Muscle.find({}).catch(error =>
    response.status(500).send({
      message: error
    }));

  if (muscles.length === 0) {
    return response.status(404).send({
      message: 'No muscles'
    })
  }

  return response.status(200).json({
    muscles: muscles.map(({ _id, name, isFront }) => ({ id: _id, name, isFront }))
  })
}

async function getEquipment(request, response) {
  const equipment = await Equipment.find({}).catch(error =>
    response.status(500).send({
      message: error
    }));

  if (equipment.length === 0) {
    return response.status(404).send({
      message: 'No equipment'
    })
  }

  return response.status(200).json({
    equipment: equipment.map(({ _id, name }) => ({ id: _id, name }))
  })
}

module.exports = { getCategories, getEquipment, getMuscles };