const express = require('express');
const { notes } = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const { fstat } = require('fs');
const req = require('express/lib/request');
const PORT = process.env.PORT || 3001;


const app = express();
// middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function creatNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );
    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

// api routes
app.get('/api/notes', (req, res) =>{
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
    res.json(result);
    } else {
        res.sendStatus(404);
    }
})

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not complete.');
    } else {
    const note = creatNewNote(req.body, notes);
    res.json(note);
    }
});


// html routes
// landing page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// notes page route 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
// // anything else send to homepage
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });



app.listen(PORT, ()=> {
    console.log(`API server now on port ${PORT}!`);
});