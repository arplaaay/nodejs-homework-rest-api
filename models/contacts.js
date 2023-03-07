const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./models/contacts.json");

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
}

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const findContactId = contacts.find((contact) => contact.id === contactId);

  return findContactId;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const findContactIndex = contacts.findIndex((contact) => contact.id === contactId);

  if (findContactIndex > -1) {
    const removeContact = contacts.splice(findContactIndex, 1);

    updateContacts(contacts);
    return removeContact;
  } else {
    console.log("Enter valid value!");
  }
};

async function addContact(body) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };

  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const findContactIndex = contacts.findIndex(({ id }) => id === contactId);

  if (findContactIndex > -1) {
    const updContact = contacts[findContactIndex];

    contacts[findContactIndex] = {
      ...updContact,
      ...body,
    };

    updateContacts(contacts);
    return contacts[findContactIndex];
  }

  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
