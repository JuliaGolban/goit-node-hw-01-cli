const fs = require('fs').promises;
const path = require('path');

const uuid = require('uuid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath)
    .then(data => {
      const contacts = JSON.parse(data.toString());
      console.log('listContacts ~ contacts', contacts);
      return contacts;
    })
    .catch(err => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then(data => {
      const contacts = JSON.parse(data.toString());
      const contact = contacts.find(contact => {
        return contact.id === contactId;
      });
      console.log('getContactById ~ contact', contact);
      return contact;
    })
    .catch(err => console.log('getContactById', err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then(data => {
      const contacts = JSON.parse(data.toString());
      const index = contacts.findIndex(contact => contact.id === contactId);
      const deletedContact = contacts[index];
      if (index !== -1) {
        contacts.splice(index, 1);
        fs.writeFile(contactsPath, JSON.stringify(contacts));
      }
      console.log('removeContact ~ deletedContact', deletedContact);
      return deletedContact;
    })

    .catch(err => console.log('removeContact', err.message));
}

function addContact(name, email, phone) {
  const newContact = {
    id: uuid.v4(),
    name: name,
    email: email,
    phone: phone,
  };
  fs.readFile(contactsPath)
    .then(data => {
      const contacts = JSON.parse(data.toString());
      contacts.push(newContact);
      fs.writeFile(contactsPath, JSON.stringify(contacts));
      console.log('addContact ~ newContact', newContact);
      return newContact;
    })

    .catch(err => console.log('addContact', err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
