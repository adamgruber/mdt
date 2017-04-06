#!/usr/bin/env node
const yargs = require('yargs');
const mdt = require('./main');

/* Required Args
 * @argument {string} markdown-file File to display
 */

// Setup yargs
yargs
  .usage('Usage: $0 [markdown-file] [options]')
  .demand(1)
  .help('help').alias('h', 'help')
  .epilog('Copyright 2017 Adam Gruber').argv;

// Call the main cli program
mdt(yargs.argv);