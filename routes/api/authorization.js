const express = require("express");

const controllers = require("../../controllers/users/index");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { schemas } = require("../../models/users");
const validation = require("../../helpers/validation");
const { checkToken, upload } = require("../../middlewares/index");

const router = express.Router();

// register
router.post("/register", validation(schemas.registerSchema), controllerWrapper(controllers.userRegister));

// login
router.post("/login", validation(schemas.loginSchema), controllerWrapper(controllers.userLogin));

// verify email
router.get("/verify/:verificationToken", controllerWrapper(controllers.userVerifyEmail));

router.post("/verify", validation(schemas.verifyEmailSchema), controllerWrapper(controllers.userResendVerifyEmail));

// logout
router.post("/logout", checkToken, controllerWrapper(controllers.userLogout));

// current user
router.post("/current", checkToken, controllerWrapper(controllers.currentUser));

// upload user avatar
router.patch("/avatars", checkToken, upload.single("avatar"), controllerWrapper(controllers.userAvatar));

module.exports = router;
