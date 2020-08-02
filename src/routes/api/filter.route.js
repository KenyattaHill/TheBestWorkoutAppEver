const router = require("express").Router();
const filterController = require('../../controllers/filter.controller')
router.get('/category', filterController.getCategories)
router.get('/equipment', filterController.getEquipment)
router.get('/muscle', filterController.getMuscles)
module.exports = router