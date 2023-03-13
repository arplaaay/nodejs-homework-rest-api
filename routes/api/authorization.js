const express = require("express");

const controllers = require("../../controllers/users/index");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { schemas } = require("../../models/users");
const validation = require("../../helpers/validation");
const { checkToken, upload } = require("../../middlewares/index");

const router = express.Router();

router.post("/register", validation(schemas.registerSchema), controllerWrapper(controllers.userRegister));

router.post("/login", validation(schemas.loginSchema), controllerWrapper(controllers.userLogin));

router.post("/logout", checkToken, controllerWrapper(controllers.userLogout));

router.post("/current", checkToken, controllerWrapper(controllers.currentUser));

router.patch("/avatars", checkToken, upload.single("avatar"), controllerWrapper(controllers.userAvatar));

module.exports = router;
