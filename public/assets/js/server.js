// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "notes.html"));
});

// API Routes
// Get all Notes
app.get("/api/notes", (req, res) => {
  //read notes from fs and return all in json
  res.json(getNotesFromFS());
});

// Create note
app.post("/api/notes", (req, res) => {
  //read notes from fs and return all in json
  let notes = getNotesFromFS();
  notes.push({
    title: req.body.title,
    text: req.body.text,
    id: randNum(),
  });
  fs.writeFileSync("../../../db/db.json", JSON.stringify(notes));

  res.json(getNotesFromFS());
});

//Delete Note
app.delete("/api/notes/:id", (req, res) => {
  let notes = getNotesFromFS().filter((note) => note.id != req.params.id);
  fs.writeFileSync("../../../db/db.json", JSON.stringify(notes));
  res.json(getNotesFromFS());
});

//Functions
const getNotesFromFS = () => {
  return JSON.parse(fs.readFileSync("../../../db/db.json"));
};

const randNum = () =>{
    return Math.floor((Math.random() * 9999) + 1);
};

// Start server
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
