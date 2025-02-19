const express = require("express");

const controllers = require("../../controllers/contacts/index");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { schemas } = require("../../models/contacts");
const validation = require("../../helpers/validation");
const checkToken = require("../../middlewares/checkToken");
const isValidId = require("../../middlewares/isValidId");

const router = express.Router();

router.get("/", checkToken, controllerWrapper(controllers.getAllContacts));

router.get("/:contactId", checkToken, isValidId, controllerWrapper(controllers.getContactById));

router.post("/", checkToken, validation(schemas.defaultSchema), controllerWrapper(controllers.addContact));

router.delete("/:contactId", checkToken, isValidId, controllerWrapper(controllers.deleteContactById));

router.put("/:contactId", checkToken, isValidId, validation(schemas.putSchema), controllerWrapper(controllers.updateContactById));

router.patch("/:contactId", checkToken, isValidId, validation(schemas.patchSchema), controllerWrapper(controllers.updateFavoriteContact));

module.exports = router;
