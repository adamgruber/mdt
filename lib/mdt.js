const marked = require('marked');
const TerminalRenderer = require('marked-terminal');

marked.setOptions({
  renderer: new TerminalRenderer(),
  gfm: true,
  terminal: true
});

module.exports = str => console.log(marked(str));
