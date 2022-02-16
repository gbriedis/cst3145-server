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
  req.collection = db.collection(collectionName)
  return next()
})


// mongoClient.connect(uri, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("cst3145");
//   dbo.collection("lessonsDB").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     lessons = result
//     db.close();
//   });
// });

//root url
app.get('/',function(req,res){
  res.send("/collection/lessonsDB")
  console.log(res)
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

