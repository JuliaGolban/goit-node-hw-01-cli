const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { argv } = yargs(hideBin(process.argv));

const contacts = require('./contacts');

/*
 * Get all contacts - contacts.listContacts();
 * Get contact by id - contacts.getContactById(id);
 * Add new contact - contacts.addContact(name, email, phone);
 * Delete contact by id - contacts.removeContact(id);
 */

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const list = await contacts.listContacts();
      console.log('list', list);
      break;

    case 'get':
      const contact = await contacts.getContactById(id);
      console.log('get', contact);
      break;

    case 'add':
      await contacts.addContact(id, name, email, phone);
      break;

    case 'remove':
      const deletedContact = await contacts.removeContact(id);
      console.log('remove', deletedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

// use IIFE invokeAction(argv)
(async () => {
  await invokeAction(argv);
})();

// (async () => {
//   await invokeAction({ action: 'list' });
// })();

// (async () => {
//   await invokeAction({ action: 'get', id: '3' });
// })();

// (async () => {
//   await invokeAction({
//     action: 'add',
//     id: '11',
//     name: 'Julia',
//     email: 'julia@gmail.com',
//     phone: '(068) 068 68 68',
//   });
// })();

// (async () => {
//   await invokeAction({
//     action: 'remove',
//     id: '11',
//   });
// })();
