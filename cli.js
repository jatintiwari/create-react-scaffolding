#!/usr/bin/env node
"use strict";
/**
 * dependencies
 */
const program = require('commander');
const packageJSON = require('./package');
const { prompt } = require('inquirer');

/**
 * constants
 */
const version = packageJSON.version;
const name = packageJSON.name;

const questionsBeforeAdd = [{
  type: 'input',
  name: 'name',
  message: 'Please enter name   => '
},{
  type: 'input',
  name: 'contact',
  message: 'Please enter contact   => '
}]

const app = {
  contacts: {
    "000": 'hulu lulu'
  },
  addContact: function () {
    return prompt(questionsBeforeAdd).then((answer) => {
      console.info('Adding contact: ', answer);
      return this.contacts[answer.contact] = answer.name;
    })
  },
  getContact: function (contact) {
    const foundContact = this.contacts[contact] ? this.contacts[contact] : 'none';
    console.info(`${foundContact == 'none' ? 'None' : '1'} contact found. Phone: ${contact} => `, foundContact);
    return contact;
  }
}


program
  .version(version)
  .description(name);

program
  .command('addContact')
  .alias('a')
  .description('Add a contact')
  .action(app.addContact.bind(app));

program
  .command('get contact <contact>')
  .alias('g')
  .description('Get a contact')
  .action(app.getContact.bind(app));

program.parse(process.argv);