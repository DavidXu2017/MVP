var express = require('express');
var app = express();
var http = require('http');
//var controller = require('./controllers')
var request = require("request");
var bodyParser = require("body-parser");

var pokemonName = '';

// app.get('/', function(req, res) {
// 	res.end(controller.apiMessages.get(req, res));
// })

// app.get('/', function(req, res) {
// 	res.sendfile('./client/index.html');
// })

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'));

//check this code after doing the clint;
app.post('/', function(req, res) {
  console.log('received!!!');
	pokemonName = req.body.data;//check here!
  console.log('pokemonName is ', pokemonName);
  request('http://pokeapi.co/api/v2/pokemon/' + pokemonName, function (error, response, body) {
    if(error) {
      console.log('This is error: ', error);
    }
    console.log("Hello I'm here!!!!!!!!!!!!!!!!!!!");
    var reqBody = JSON.parse(body)
    var pokemonDatas = {
      'id': reqBody.id,
      'name': reqBody.name.toUpperCase(),
      'weight': reqBody.weight,
      'height': reqBody.height,
      'types': getTypes(reqBody.types),
      'hp': reqBody.stats[5].base_stat,
      'attack': reqBody.stats[4].base_stat,
      'defense': reqBody.stats[3].base_stat,
      'special-attack': reqBody.stats[2].base_stat,
      'special-defense': reqBody.stats[1].base_stat,
      'speed': reqBody.stats[0].base_stat,
      'abilities': getAbilitiesName(reqBody.abilities),
      "front_default": reqBody.sprites.front_default,
      "front_shiny": reqBody.sprites.front_shiny,
      "back_default": reqBody.sprites.back_default,
      "back_shiny": reqBody.sprites.back_shiny
    }
    console.log('This is response: ', pokemonDatas);
    res.end(JSON.stringify(pokemonDatas));
  });

})

// app.get('/', function(req, res){
//   request('http://pokeapi.co/api/v2/pokemon/' + pokemonName, function (error, response, body) {
//   	if(error) {
//   		console.log(error);
//   	}
//     console.log("Hello I'm here!!!!!!!!!!!!!!!!!!!");
//   	var reqBody = JSON.parse(body)
//   	var pokemonDatas = {
//   		'id': reqBody.id,
//   		'name': reqBody.name.toUpperCase(),
//   		'weight': reqBody.weight,
//   		'height': reqBody.height,
//   		'types': getTypes(reqBody.types),
//   		'hp': reqBody.stats[5].base_stat,
//   		'attack': reqBody.stats[4].base_stat,
//   		'defense': reqBody.stats[3].base_stat,
//   		'special-attack': reqBody.stats[2].base_stat,
//   		'special-defense': reqBody.stats[1].base_stat,
//   		'speed': reqBody.stats[0].base_stat,
//   		'abilities': getAbilitiesName(reqBody.abilities),
//    	  "front_default": reqBody.sprites.front_default,
//       "front_shiny": reqBody.sprites.front_shiny,
//       "back_default": reqBody.sprites.back_default,
//    	  "back_shiny": reqBody.sprites.back_shiny
//   	}

//   	res.end(JSON.stringify(pokemonDatas));

// 	});
// })

app.get("*", function(req, res) {
	res.end("404!");
})

module.exports = app;


//helper functions
var getAbilitiesName = function(arr) {
  var output = '';
	arr.forEach(val => output += val.ability.name + ", ");
  return output.slice(0,-2);  
}

var getTypes = function(arr) {
  var output = '';
  arr.forEach(val => output += val.type.name + ", ");
  return output.slice(0,-2);
}