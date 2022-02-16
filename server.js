var express = require("express");
var app = express();
var cors = require('cors')

const mongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://gbriedis:strongpw@cluster0.pr4ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(cors())


// get all lessons from MongoDB
let database
let lessons = []
mongoClient.connect(uri, function(err,client){
    database = client.db('cst3145')
})

app.param('collectionName', function(req,res,next,collectionName){
  req.collection = database.collection(collectionName)
  return next()
})

//root url
app.get('/',function(req,res){
  res.send("/collection/lessonsDB to view all lessons")
})

//gets all lessons
app.get('/collection/:collectionName',function(req,res,next){
  req.collection.find({}).toArray(function(err,results){
      if (err){
          return next(err)
      }
      else{
          res.send(results)
      }
  })
})

// returning a 404 error when path is not found
app.use(function (request, response) {
  response.status(404).send("page not found");
});

const port = process.env.PORT || 3000
app.listen(port)

