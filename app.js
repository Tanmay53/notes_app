const chalk = require('chalk');
const notes = require('./notes.js');
const {program} = require('commander');

program.version("0.0.2");

// Adding a new note.
program
  .command("add <title> [body...]")
  .description("Create a new note")
  .option("-t, --text", "Create a text note", true)
  .option("-l, --list", "Create a list note", false)
  .action( (title, body, commandObject) => {
      var type = "";
      if(commandObject.list) {
        type = "list";
      }
      else if((commandObject.text) || ((! commandObject.text) && (! commandObject.list))) {
        type = "text";
      }
  
      notes.addNote(title, body, type);
  });

// Removing an existing note.
program
  .command("remove <title>")
  .alias("rm")
  .description("Remove an existing note")
  .action( (title) => {
    notes.removeNote(title);
  });

// Listing all the notes.
program
  .command('list', {isDefault: true})
  .description('List all notes in current folder')
  .action( () => {
    notes.getNotes();
  });

// Reading the notes
program
  .command('read <title>')
  .description("Read a note")
  .action( (title) => {
    notes.getNoteData(title);
  });

program.parse();