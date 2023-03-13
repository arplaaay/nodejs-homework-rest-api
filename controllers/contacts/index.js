const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const deleteContactById = require("./deleteContactById");
const updateContactById = require("./updateContactById");
const updateFavoriteContact = require("./updateFavoriteContact");

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  updateFavoriteContact,
};
