var express = require("express");
var app = express();
var cors = require('cors')

const mongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://gbriedis:strongpw@cluster0.pr4ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(cors())


// get all lessons from MongoDB
let lessons = []
mongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("cst3145");
  dbo.collection("lessonsDB").find({}).toArray(function(err, result) {
    if (err) throw err;
    lessons = result
    db.close();
  });
});

// GET requests to /users returns user information
app.get("/lessons", function(req, res) {
  res.send(lessons)
})

// returning a 404 error when path is not found
app.use(function (request, response) {
  response.status(404).send("page not found");
});

const port = process.env.PORT || 3000
app.listen(port)

