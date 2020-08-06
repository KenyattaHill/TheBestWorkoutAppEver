const router = require("express").Router();
const authRoutes = require("./auth.route");
const verifyToken = require('../../middleware/authjwt');
const filterRoutes = require('./filter.route');
const exerciseRoutes = require('./exercise.route');
const workoutRoutes = require('./workout.route');

router.use('/workout', verifyToken, workoutRoutes)
router.use('/exercise', verifyToken, exerciseRoutes);
router.use('/filter', verifyToken, filterRoutes);
router.use("/auth", authRoutes)
module.exports = router;
