/* eslint-disable no-console */
var path = require('path');
var fs = require('fs-extra');
var mdt = require('../lib/mdt');

var mdExtRegex = /\.(?:md|markdown){1}$/;
var fileExtRegex = /\.[^.]*?$/;
var ERRORS = {
  NOT_FOUND: filename => `File not found: ${filename}`,
  NOT_MD: 'You must supply a markdown file.',
  GENERIC: 'There was a problem.',
};

/**
 * Load the markdown file
 *
 * @param {string} file File to load
 *
 * @return {string|Object} Markdown string, otherwise error object { err: message }
 */
function load(file) {
  let mdFile;

  // Was a markdown file provided?
  if (!mdExtRegex.test(file)) {
    return { err: ERRORS.NOT_MD };
  }

  // Try to read and parse the file
  try {
    mdFile = fs.readFileSync(file, 'utf-8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      return { err: ERRORS.NOT_FOUND(file) };
    }
    return { err: ERRORS.GENERIC };
  }

  return mdFile;
}

/**
 * Main CLI Program
 *
 * @param {Object} processArgs CLI arguments
 */
function mdtMain(processArgs) {
  const args = processArgs || { _: [] };

  // Try to load the test data
  const file = load(args._[0]);

  // Check for error in data load
  /* istanbul ignore else */
  if (file && file.err) {
    console.log(file.err);
    process.exitCode = 1;
    return;
  }

  // Good so far, now generate the report
  mdt(file);
}

module.exports = mdtMain;
