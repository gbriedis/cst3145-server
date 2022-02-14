var express = require("express");
var app = express();
app.use(express.static("public"));

// Routes GET requests to /lessons to the request handler
app.get("/lessons", function (request, response) {
  response.send([
    { topic: "Maths", location: "London", price: 100 },
    { topic: "Maths", location: "Liverpool", price: 80 },
    { topic: "Maths", location: "Oxford", price: 90 },
    { topic: "Maths", location: "Bristol", price: 122 },
  ]);
});

// GET requests to /users returns user information
app.get("/user", function (request, response) {
  response.send({ email: "user@email.com", password: "mypassword" });
});

// returning a 404 error when path is not found
app.use(function (request, response) {
  response.status(404).send("page not found");
});

const port = process.env.PORT || 3000
app.listen(port)
console.log("Listening on port " + 3000);
