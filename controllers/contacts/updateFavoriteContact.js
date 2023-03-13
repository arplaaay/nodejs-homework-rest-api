const { Contact } = require("../../models/contacts");

const updateFavouriteContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findByIdAndUpdate({ _id: contactId, owner }, req.body, { new: true });

  if (!result) {
    res.json({ message: "Not found!" });
  }

  res.json(result);
};

module.exports = updateFavouriteContact;
