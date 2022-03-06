const express = require('express');
const { notes } = require('./db/db.json');
const PORT = process.env.PORT || 3001;

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



app.listen(PORT, ()=> {
    console.log(`API server now on port 3001!`);
});