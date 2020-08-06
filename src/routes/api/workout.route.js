const router = require("express").Router();
const workoutController = require('../../controllers/workout.controller')
router.get("/", workoutController.getAll)
router.get('/:id', workoutController.getById)
router.post('/', workoutController.create)
router.put('/:id', workoutController.update)
router.delete('/:id', workoutController.remove)

module.exports = router