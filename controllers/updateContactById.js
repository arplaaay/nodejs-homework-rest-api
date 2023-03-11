const { Contact } = require("../models/contacts");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

  if (!result) {
    res.json({ message: "Not found!" });
  }

  res.json(result);
};

module.exports = updateContactById;
