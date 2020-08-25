const fs = require('fs');
const chalk = require('chalk');
const { isArray } = require('util');

const addNote = (title, contents, type) => {
  const notes = readNotes();

  const noteIndex = notes.findIndex( (note) => (note.title === title) );

  if(type === undefined) {
    if(isArray(contents)) {
      type = "list";
    }
    else {
      type = "text";
    }
  }

  if(noteIndex === -1) {
    notes.push({
      title: title,
      body: contents,
      type: type
    });
    saveNotes(notes);
    console.log(chalk.green.inverse(" Note Added Successfully. "));
  }
  else {
    console.log(chalk.red.inverse(" Note Title already exists. "));
  }
}

const removeNote = (title) => {
  const notes = readNotes();

  const noteIndex = notes.findIndex( (note) => (note.title === title));

  if(noteIndex !== -1) {
    const removedNote = notes.splice(noteIndex, 1);

    saveNotes(notes);

    console.log(chalk.green.inverse(" Note Removed Successfully "));
    console.log(chalk.red.bold(removedNote[0].title));

    if(removedNote[0].type === "text") {
      console.log(chalk.red(removedNote[0].body));
    }
    else if(removedNote[0].type === "list") {
      removedNote[0].body.forEach( (item, index) => {
        console.log(chalk.red( (index + 1) + ". " + item));
      })
    }
  }
  else {
    console.log(chalk.yellow.inverse(" The Note was not found "));
  }
}

const getNotes = () => {
  const notes = readNotes();

  if(notes.length > 0) {
    console.log(chalk.greenBright("Your Notes in " + process.cwd() + " are :\n"));


    notes.forEach( (note) => {
      var title = note.title, description = "";

      if(title.indexOf(" ") !== -1) {
        title = "\"" + title + "\"";
      }

      if(note.type != "text") {
        description = " (" + note.type + ")";
      }

      console.log(chalk.yellowBright(title + description));
    });
  }
  else {
    console.log(chalk.yellow.inverse(" No Notes were found. "));
  }
}

const getNoteData = (title) => {
  const notes = readNotes();

  const noteData = notes.find( (note) => (note.title === title) );

  if(noteData) {
    console.log(chalk.yellow.bold(noteData.title));

    if(noteData.type == "text") {
      console.log(chalk.whiteBright(noteData.body));
    }
    else if(noteData.type == "list") {
      noteData.body.forEach( (item, index) => {
        console.log(chalk.whiteBright( (index + 1) + ". " + item));
      } );
    }
  }
  else {
    console.log(chalk.red.inverse(" The Note was not found. "));
  }
}

const readNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("./notes.json");
    const dataString = dataBuffer.toString();
  
    return JSON.parse(dataString);
  }
  catch (e) {
    return [];
  }
}

const saveNotes = (notesData) => {
  const notesString = JSON.stringify(notesData);

  fs.writeFileSync("notes.json", notesString);
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  getNoteData: getNoteData
};