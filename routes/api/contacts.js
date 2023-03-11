const express = require("express");

const controllers = require("../../controllers/index");
const controllerWrapper = require("../../helpers/controllerWrapper");
const { schemas } = require("../../models/contacts");
const validation = require("../../helpers/validation");

const router = express.Router();

router.get("/", controllerWrapper(controllers.getAllContacts));
router.get("/:contactId", controllerWrapper(controllers.getContactById));
router.post("/", validation(schemas.defaultSchema), controllerWrapper(controllers.addContact));
router.delete("/:contactId", controllerWrapper(controllers.deleteContactById));
router.put("/:contactId", validation(schemas.putSchema), controllerWrapper(controllers.updateContactById));
router.patch("/:contactId", validation(schemas.patchSchema), controllerWrapper(controllers.updateFavoriteContact));

module.exports = router;
