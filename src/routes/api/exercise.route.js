const router = require('express').Router()
const exerciseController = require('../../controllers/exercise.controller')

router.get('/', exerciseController.getAllByFilter);
router.get('/:id', exerciseController.getDetail);
module.exports = router