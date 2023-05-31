const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.json');
const fs = require('fs');

router.get('/api/notes', (req, res) => {
    res.json(db)
}
);

router.post('/api/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    db.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db)
});




router.delete('/api/notes/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    const noteIndex = db.findIndex((note) => note.id === noteId);
  
    if (noteIndex === -1) {
      return res.status(404).json({ error: 'Note not found' });
    }
  
    db.splice(noteIndex, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json({ message: 'Note deleted successfully' });
  });



module.exports = router;