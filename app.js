const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// Create Remove Command
yargs.command({
  command: "add [type]",
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
      type: 'array'
    }
  },
  handler(argv) {
    switch(argv.type) {
      case "text":
      case "list":
      case undefined:
        var contents = argv.body;

        if((argv.type === "text") || ((argv.type === undefined) && (argv.body.length === 1))) {
          contents = argv.body.join("\n");
        }
        
        notes.addNote(argv.title, contents, argv.type);

        break;
      default:
        console.log(chalk.red.inverse(" Note type is not availabe "));
        console.log(chalk.yellow("Use 'text' or 'list' as note types"));
    }
  }
})

// Creating a Remove Command
yargs.command({
  command: "remove",
  describe: "Remove a note.",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
})

// Creating a list Command
yargs.command({
  command: "list",
  describe: "List all notes",
  handler() {
    notes.getNotes();
  }
})

// Creating a read Command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.getNoteData(argv.title);
  }
})

yargs.parse();