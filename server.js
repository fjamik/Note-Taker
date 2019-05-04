// import dependencies
const express = require('express');
const connection = require('./db/connection');
const path = require('path');

// create server using express() and set a port
const app = express();
const PORT = process.env.PORT || 3000;

// set up our middleware to handle incoming POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up our routes
app.get('/', function(req, res) {
  // send index.html when user hits "root"
  res.sendFile(path.join(__dirname, './html/index.html'));
});

app.get('/add', function(req, res) {
  // send add.html when user hits "/add"
  res.sendFile(path.join(__dirname, './html/add.html'));
});

// API ROUTES

app.get('/api/notes', function(req, res) {
  // query db
  connection.query('SELECT * FROM notes', function(err, notesData) {
    if (err) {
      return res.status(500).json(err);
    }
    // if no error, send back array of table data
    res.json(notesData);
  });
});

// Clear note by ids
app.delete("/api/notes/:id", function(req, res) {
  console.log(req.params.id);

  connection.query("DELETE FROM notes where id=" + req.params.id, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// POST route that takes in req.body and creates a new note
app.post('/api/notes', function(req, res) {
  console.log(req.body);
  
  connection.query('INSERT INTO notes SET ?',{
    title: req.body.title,
    note: req.body.note
  }, function(err,
    notesListData
  ) {
   res.json(notesListData)
  });
});




app.get('*', function(req, res) {
  res.send('<h1>💁‍♀️ 404 Error!</h1>');
});

// turn on server, make sure this is last in the file
app.listen(PORT, () => console.log(`🗺️ You are now on localhost:${PORT}.`));
