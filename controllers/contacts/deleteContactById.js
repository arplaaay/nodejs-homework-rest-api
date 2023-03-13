const { Contact } = require("../../models/contacts");

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndDelete({ _id: contactId, owner });

  if (!result) {
    res.json({ message: "Not found!" });
  }

  res.json({ message: "Contact successfully deleted!" });
};

module.exports = deleteContactById;
