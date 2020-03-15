const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../db/db.json");

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    fs.readFile(filePath, "utf8", function(err, data) {
      if (err) throw err;
      res.json(JSON.parse(data));
    });
  });
  app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    console.log(newNote);
    fs.readFile(filePath, "utf8", function(err, data) {
      console.log("made it to post");
      if (err) throw err;
      var noteInfo = JSON.parse(data);

      noteInfo.push(newNote);
      noteInfo.forEach((item, i) => (item.id = i + 1));
      console.log(noteInfo);

      fs.writeFile(filePath, JSON.stringify(noteInfo), "utf8", function(err) {
        if (err) throw err;
        console.log("made it to write");
      });
    });
    res.json(newNote);
  });
  app.delete("/api/notes/:id", function(req, res) {
    var emptyNote = req.params.id;
    console.log(emptyNote);

    fs.readFile(filePath, "utf8", function(err, data) {
      if (err) throw err;

      var noteDelete = JSON.parse(data);
      var index = parseInt(emptyNote) - 1;
      noteDelete.splice(index, 1);

      fs.writeFile(filePath, JSON.stringify(noteDelete), "utf8", function(err) {
        if (err) throw err;
        console.log("made it to delete");
      });
    });
    res.send(emptyNote);
  });
};
