const chalk = require('chalk');
const getNotes = require('./notes.js');

var msg = getNotes();
console.log(msg);

console.log(chalk.bgWhite.bold.italic.rgb(20, 129, 30)(" Success "));

console.log(process.argv);