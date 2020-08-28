const fs = require('fs');
const chalk = require('chalk');
const { isArray } = require('util');

const addNote = (title, body, type) => {
  title = title.trim();
  if(title.length > 0) {
    if(body.length === 0) {
      
    }
  
    // Setting the flag to true for checking if the body has contents other than whitespaces
    bodyIsEmpty = true;
  
    body = body.map( (text) => {
      var text = text.trim();
  
      // Setting the flag to false if at least one line of the body has is not a whitespace.
      if(bodyIsEmpty && (text.length > 0)) {
        bodyIsEmpty = false;
      }
  
      return text;
    } );


    if(!bodyIsEmpty) {
      if(type === "text") {
        body = body.join("\n");
      }
    
      const notes = readNotes();
    
      const noteIndex = notes.findIndex( (note) => (note.title === title) );
    
      if(noteIndex === -1) {
        notes.push({
          title: title,
          body: body,
          type: type
        });
    
        saveNotes(notes);
        console.log(chalk.green.inverse(" Note Added Successfully. "));
    
        getNoteData(title);
      }
      else {
        console.log(chalk.red.inverse(" Note Title already exists. "));
      }
    }
    else {
      console.log(chalk.red.inverse(" The Body should have some text! "));
    }
  }
  else {
    console.log(chalk.red.inverse(" The Title should have some text! "));
  }
}

const removeNote = (title) => {
  title = title.trim();
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
  title = title.trim();
  const notes = readNotes();

  const noteData = notes.find( (note) => (note.title === title) );

  if(noteData) {
    console.log(chalk.yellow.bold(noteData.title));

    if(noteData.type == "text") {
      console.log(chalk.blueBright(noteData.body));
    }
    else if(noteData.type == "list") {
      noteData.body.forEach( (item, index) => {
        console.log(chalk.greenBright(( (index + 1) + ". ") + chalk.blueBright(item)));
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