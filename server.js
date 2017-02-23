var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var uuid = require('uuid');
var path = require('path');
var router = express.Router();
var port = process.env.PORT || 8000;
var mongoose = require('mongoose');


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)))

var bounties = [];

app.route('/api')

.get(function (req, res, next){
	res.send('This page works, but nothing is here')
})

app.route('/api/bounty')

.get(function (req, res){
	res.send(bounties);
})

.post(function (req, res){
	console.log(req.body);
	var newBounty = req.body;
	newBounty.id = uuid.v4();
	bounties.push(newBounty);
	res.send(newBounty);
})

app.route('/api/bounty/:id')

.get(function (req, res) {
	for ( var i = 0; i < bounties.length; i++) {
		if (bounties[i].id === req.params.id) {
			return res.send(bounties[i]);
		}
	}
	res.status(404).send({message: "Not Found"});
})

.delete(function (req, res) {
	for (var i = 0; i < bounties.length; i++){
		if (bounties[i].id === req.params.id) {
			var deletedItem = bounties.splice(i, 1);
			return res.send(deletedItem);
		}
	}
	res.status(404).send({message: "Not Found"})
})

.put(function (req, res) {
	for (var i = 0; i < bounties.length; i++) {
		if (bounties[i].id === req.params.id) {
					for (var k in req.body) {
						if (bounties[i][k] != req.body[k]){
							bounties[i][k] = req.body[k]
						}
					}
					return res.send(req.body)
		}

	}
	
})

app.listen(8000, function() {

})



