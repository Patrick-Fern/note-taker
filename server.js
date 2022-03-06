const express = require('express');
const { notes } = require('./db/db.json');

const app = express();

// api routes
app.get('/api/notes', (req, res) =>{
    res.json(notes)
})


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



app.listen(3001, ()=> {
    console.log(`API server now on port 3001!`);
});