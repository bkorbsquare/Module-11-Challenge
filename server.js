/*const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(require('./Develop/controller/htmlController'));
app.use(require('./Develop/controller/notesController'));

app.listen(PORT, function () {
    console.log("Server is listening at http://localhost:" + PORT);
});
*/

const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));

app.get('/api/notes', (req, res) => {
    readFileAsync('./Develop/db/db.json', 'utf8').then((data) => {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

app.post('/api/notes', (req, res) => {
    const note = req.body;
    readFileAsync('./Develop/db/db.json', 'utf8').then((data) => {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1;
        notes.push(note);
        return notes;
    }).then((notes) => {
        writeFileAsync('./Develop/db/db.json', JSON.stringify(notes)).then(() => {
            res.json(note);
        })
    })
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    readFileAsync('./Develop/db/db.json', 'utf8').then((data) => {
        let notes = [].concat(JSON.parse(data));
        notes = notes.filter(note => note.id != id);
        return notes;
    }).then((notes) => {
        writeFileAsync('./Develop/db/db.json', JSON.stringify(notes)).then(() => {
            res.json(notes);
        })
    })
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});