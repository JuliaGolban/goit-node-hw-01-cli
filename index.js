const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();

const operations = require('./contacts');

/*
 * Get all contacts - operations.listContacts();
 * Get contact by id - operations.getContactById(id);
 * Add new contact - operations.addContact(name, email, phone);
 * Delete contact by id - operations.removeContact(id);
 */

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const list = await operations.listContacts();
      console.table('list', list);
      break;

    case 'get':
      const contact = await operations.getContactById(id);
      console.log('get', contact);
      break;

    case 'add':
      await operations.addContact(id, name, email, phone);
      break;

    case 'remove':
      const deletedContact = await operations.removeContact(id);
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
