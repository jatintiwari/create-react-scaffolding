#!/usr/bin/env node
"use strict";

const program = require('commander');

const app = {
  contacts: {
    "000": 'hulu lulu'
  },
  addContact: function (name = "", contact = "000") {
    console.info('Adding contact: ', name, contact);
    return this.contacts[contact] = name;
  },
  getContact: function (contact) {
    const foundContact = this.contacts[contact] ? this.contacts[contact] : 'none';
    console.info(`${foundContact == 'none' ? 'None' : '1'} contact found. Phone: ${contact} => `, foundContact);
    return contact;
  }
}


program
  .version('0.0.1')
  .description('Contact management system');

program
  .command('addContact <name> <contact>')
  .alias('a')
  .description('Add a contact')
  .action(app.addContact.bind(app));

program
  .command('get contact <contact>')
  .alias('g')
  .description('Get a contact')
  .action(app.getContact.bind(app));

program.parse(process.argv);