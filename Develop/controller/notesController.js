const express = require('express');
const router = express.Router();
const Note = require('../model/notes');
// Use fs system to read/write files (json)
const fs = require('fs');


router.get("/api/notes", function (req, res) {
    // load the content from db.json
    // return that content to the browser
    let results = data
    
    /*
    1) Use db.json to store/retrieve the notes (per README)
        e.g., results = fs.readFileSync('../db/db.json', 'utf8');

    2) You COULD read it here, and then just send its content to the browser as res.

    3) Alternatively, you can use the Note class and have the read/write stuff there.

    */

    Note.getNotes()
        .then(results => res.json(results))
        .catch(console.error);
});


router.post("/api/notes", function (req, res) {

    Note.createNote(req.body.title, req.body.text)
        .then(results => res.json(results))
        .catch(console.error);
});

router.delete("/api/notes/:id", function (req, res) {

    const id = req.params.id
    Note.deleteNote(id)
        .then(results => res.json(results))
        .catch(console.error);
});

module.exports = router;