var express = require("express");
var app = express();
var cors = require('cors')

const mongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://gbriedis:strongpw@cluster0.pr4ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(cors())



let database
let lessons = []
// connect to CST3145 database which contains multiple collections (lessons/users/orders placed)
mongoClient.connect(uri, function(err,client){
    database = client.db('cst3145')
})

// parameter blueprint
app.param('collectionName', function(req,res,next,collectionName){
  req.collection = database.collection(collectionName)
  return next()
})

//get Database data of the appropriate collection name
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

//saves new order to the collection
app.post('/collection/:collectionName',function(req,res,next){
    console.log("REQ DETAILS!!!!!!!!!!!!")
    console.log(req)


    app.send("Checked")
})

// returning a 404 error when path is not found
app.use(function (request, response) {
  response.status(404).send("page not found");
});

const port = process.env.PORT || 3000
app.listen(port)

