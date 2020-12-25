const fs = require("fs");
const path = require("path");
const { uuid } = require("uuidv4");

const contactsPath = path.join(__dirname, "db/contacts.json");

//get all contacts
function listContacts() {
  const result = fs.readFileSync(contactsPath, "utf-8", (err) => {
    if (err) {
      return console.log("listContacts", err);
    }
  });

  return JSON.parse(result);
}
//get contact by ID
function getContactById(contactId) {
  const findedContact = fs.readFileSync(contactsPath, "utf-8", (err) => {
    if (err) {
      console.log("getContactById", err);
    }
  });
  const data = JSON.parse(findedContact);
  const requiredContact = data.filter(
    (contact) => contact.id === Number(contactId)
  );
  return requiredContact[0];
}
// add contact
function addContact({ name, email, phone }) {
  const contacts = fs.readFileSync(contactsPath, "utf-8", (err) => {
    console.log(contacts);
    if (err) {
      console.log(err);
    }
  });
  const parseData = JSON.parse(contacts);
  const newID = parseData.length + 1;
  const newContact = [{ id: newID, name, email, phone }];
  const updatedContacts = [...parseData, ...newContact];
  const updatedContactJson = JSON.stringify(updatedContacts);
  fs.writeFileSync(contactsPath, updatedContactJson, (err) => {
    if (err) {
      console.log(err);
    }
  });
  return newContact[0];
}

// delete contact by ID
function removeContact(contactId) {
  const contacts = fs.readFileSync(contactsPath, (err) => {
    if (err) {
      console.log(err);
    }
  });
  const data = JSON.parse(contacts);
  const idForDelete = data.find((contact) => contact.id === Number(contactId));
  const filteredData = data.filter(
    (contact) => contact.id !== Number(contactId)
  );
  const filteredContactsJson = JSON.stringify(filteredData);
  fs.writeFileSync(contactsPath, filteredContactsJson, (err) => {
    if (err) {
      console.log(err);
    }
  });
  return idForDelete;
}
function updateContact(contactId, bodyPart) {
  const contacts = fs.readFileSync(contactsPath, (err) => {
    if (err) {
      console.log(err);
    }
  });
  const data = JSON.parse(contacts);
  const findIdxById = data.findIndex(
    (contact) => contact.id === Number(contactId)
  );
  if (findIdxById !== -1) {
    data[findIdxById] = {
      ...data[findIdxById],
      ...bodyPart,
    };
    const dataJson = JSON.stringify(data);
    fs.writeFileSync(contactsPath, dataJson, (err) => {
      if (err) {
        console.log(err);
      }
    });
    return data[findIdxById];
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
