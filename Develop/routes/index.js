const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db/notes.json');
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
router.delete('/api/notes/:id', (req, res) => {
    console.log(req.params)
}
)


module.exports = router;