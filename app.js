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
  handler(argv) {
    notes.addNote(argv.title, argv.body, "text");
  }
})

yargs.command({
  command: "add-list",
  describe: "Add a new list",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: 'string'
    },
    items: {
      describe: "List of items in the note(--item item_1 item_2 item_3....)",
      demandOption: true,
      type: 'array'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.items, "list");
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