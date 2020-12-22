const fs = require("fs");
const path = require("path");
const { uuid } = require("uuidv4");

// Раскомментируй и запиши значение
const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log("listContacts", err);
    }
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log("getContactById", err);
    }
    const searchContactById = JSON.parse(data).find(
      (contact) => contact.id === contactId
    );
    console.log(searchContactById);
  });
}
function removeContact(contactId) {
  // ...твой код
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log("removeContact", err);
    }
    const removeContact = JSON.parse(data).filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(removeContact), (err) => {
      if (err) {
        console.log(err);
      }
    });
    console.table(removeContact);
  });
}

function addContact(name, email, phone) {
  // ...твой код
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    const newContacts = [
      ...JSON.parse(data),
      { id: uuid(), name, email, phone },
    ];
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err, data) => {
      if (err) {
        console.log(err);
      }
      console.table(newContacts);
    });
  });
}

// listContacts();
// getContactById();
// removeContact();
// addContact();

module.exports = { listContacts, getContactById, addContact, removeContact };
