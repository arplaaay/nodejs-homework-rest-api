const express = require("express");
const router = express.Router();
const Joi = require("joi");

const contacts = require("../../models/contacts");

const defaultSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().required(),
});

const putSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  phone: Joi.string(),
}).min(1);

router.get("/", async (req, res, next) => {
  const listOfAllContacts = await contacts.listContacts();

  res.json(listOfAllContacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const findContactId = await contacts.getContactById(contactId);

  if (!findContactId) {
    res.json({ message: "Not found!" });
  }

  res.json(findContactId);
});

router.post("/", async (req, res, next) => {
  const { error } = defaultSchema.validate(req.body);

  if (error) {
    res.json(error.details);
  }

  const result = await contacts.addContact(req.body);

  res.json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);

  if (!result) {
    res.json({ message: "Not found!" });
  }

  res.json({ message: "Contact successfully deleted!" });
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = putSchema.validate(req.body);

  if (error) {
    return res.json(error.details);
  }

  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    res.json({ message: "Not found!" });
  }

  res.json(result);
});

module.exports = router;
