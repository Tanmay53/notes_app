const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// Create Remove Command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.addNote(argv.title, argv.body);
  }
})

// Creating a Remove Command
yargs.command({
  command: "remove",
  describe: "Remove a note.",
  handler: function() {
    console.log(chalk.red("Removing a note."));
  }
})

// Creating a list Command
yargs.command({
  command: "list",
  describe: "List all notes",
  handler: function() {
    console.log(chalk.yellow("Listing all the notes."));
  }
})

// Creating a read Command
yargs.command({
  command: "read",
  describe: "Read a note",
  handler: function() {
    console.log(chalk.blue("Reading a note."));
  }
})

yargs.parse();