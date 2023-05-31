const router = require('express').Router();             // Import the Router class from the Express module
const { v4: uuidv4 } = require('uuid');                 // Import the v4 function from the uuid module
const db = require('../db/db.json');                    // Import the db.json file that contains the notes data
const fs = require('fs');                               // Import the fs module to work with the file system
// Get all notes
router.get('/api/notes', (req, res) => {
    res.json(db)        // Respond with the 'db' array as JSON
}
);
// Create a new note
router.post('/api/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()                                      // Generate a unique ID using the uuidv4 function
    }
    db.push(newNote);                                     // Add the new note to the 'db' array
    fs.writeFileSync('./db/db.json', JSON.stringify(db)); // Write the updated 'db' array to the db.json file
    res.json(db)
});
// Delete a note by ID
router.delete('/api/notes/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    const noteIndex = db.findIndex((note) => note.id === noteId); // Find the index of the note with the matching ID
    if (noteIndex === -1) {
        return res.status(404).json({ error: 'Note not found' }); // Handle note not found
    }  
    db.splice(noteIndex, 1);                                      // Remove the note from the 'db' array
    fs.writeFileSync('./db/db.json', JSON.stringify(db));         // Write the updated 'db' array to the db.json file
    res.json({ message: 'Note deleted successfully' });
});
module.exports = router;