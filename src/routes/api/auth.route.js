const router = require("express").Router();
const authController = require("../../controllers/auth.controller")
const checkDuplicateUserNameOrEmail = require("../../middleware/verifySignup")
router.post("/signUp", checkDuplicateUserNameOrEmail, authController.signUp)
router.post("/signIn", authController.signIn)
module.exports = router;
