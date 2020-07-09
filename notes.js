const fs = require('fs');
const chalk = require('chalk');

const getNotes = function() {
  return "Your Notes....";
}

const addNote = function(title, body) {
  const notes = readNotes();

  const noteIndex = notes.findIndex( (note) => (note.title === title) );

  if(noteIndex === -1) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);

    console.log(chalk.green.inverse("Note Added Successfully."));
  }
  else {
    console.log(chalk.red.inverse("Note Title already exists."));
  }
}

const readNotes = function() {
  try {
    const dataBuffer = fs.readFileSync("./notes.json");
    const dataString = dataBuffer.toString();
  
    return JSON.parse(dataString);
  }
  catch (e) {
    return [];
  }
}

const saveNotes = function(notesData) {
  const notesString = JSON.stringify(notesData);

  fs.writeFileSync("notes.json", notesString);
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote
};