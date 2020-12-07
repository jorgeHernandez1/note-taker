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
app.get("/api/notes", (req, res) => {
    //read notes from fs and return all in json
    res.json(getNotesFromFS());
});
// API Routes
app.post("/api/notes", (req, res) => {
    //read notes from fs and return all in json
    let notes = getNotesFromFS();

    notes.push(
        {
            title: req.body.title,
            text: req.body.text,
            id: notes.length   
        }
    );
    fs.writeFileSync("../../../db/db.json",JSON.stringify(notes));

    res.json(getNotesFromFS());
});

//Functions
const getNotesFromFS = () => {
    return JSON.parse(fs.readFileSync("../../../db/db.json"));
}

// Start server
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});