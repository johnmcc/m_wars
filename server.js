var express = require("express");
var app = express();

var parser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

app.use(parser.urlencoded({extended: true}));
app.use(express.static('client/build'));

MongoClient.connect("mongodb://localhost:27017/", function(err, client){
	if(err){
		return console.log(err);
	}

	db = client.db("star_wars");

	app.listen(3000, function(){
		console.log("Listening on port 3000");
	})
});

app.get("/", function(req, res){
	res.sendFile(__dirname + "/build/index.html");
});
