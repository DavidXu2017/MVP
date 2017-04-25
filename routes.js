var express = require('express');
var app = express();
var http = require('http');
var request = require("request");
var bodyParser = require("body-parser");

var pokemonName = '';

app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'));

app.post('/', function(req, res) {
  console.log('received!!!');
	pokemonName = req.body.data;
  console.log('pokemonName is ', pokemonName);
  request('http://pokeapi.co/api/v2/pokemon/' + pokemonName, function (error, response, body) {
    if(error) {
      console.log('This is error: ', error);
    }
    res.end(body);
  });

})

app.get("*", function(req, res) {
	res.end("404!");
})

module.exports = app;
