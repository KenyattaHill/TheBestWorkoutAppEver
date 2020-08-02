const router = require("express").Router();
const authRoutes = require("./auth.route");
const verifyToken = require('../../middleware/authjwt');
const filterRoutes = require('./filter.route');
const exerciseRoutes = require('./exercise.route');

router.use('/exercise', verifyToken, exerciseRoutes);
router.use('/filter', verifyToken, filterRoutes);
router.use("/auth", authRoutes)
module.exports = router;
