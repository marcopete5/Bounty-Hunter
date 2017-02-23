var express = require('express');
var bountyRoutes = express.Router();
var Bounty = require('../models/bounty');


bountyRoutes.route('/')

.get(function (req, res){

	var query = {};
	if (req.query.firstName) query.firstName = req.query.firstName;
	if (req.query.lastName) query.lastName = req.query.lastName;
	if (req.query.type) query.type = req.query.type;
	if (req.query.living) query.living = req.query.living;


	Bounty.find(query, function (err, bounty) {
		if (err) return res.status(500).send(err);
		res.send(bounty);
	})
	
})

.post(function (req, res){
	
	var newBounty = new Bounty(req.body);
	
	newBounty.save(function (err) {
		if (err) return res.status(500).send(err);

		res.status(201).send(newBounty);
	})
})

bountyRoutes.route('/:id')

.get(function (req, res) {

	Bounty.findById(req.params.id, function (err, bounty) {
		if (err) return res.status(500).send(err);
		res.send(bounty);
	});
	
})

.delete(function (req, res) {
	Bounty.findByIdAndRemove(req.params.id, function (err, bounty) {
		if (err) return res.status(500).send(err);
		res.send({message: "Successfully deleted bounty", success: true});
	})

})

.put(function (req, res) {
	Bounty.findByIdAndUpdate(req.params.id, function (err, updatedBounty) {
		if (err) return res.status(500).send(err);
		res.send(updatedBounty);
	})
	
})

module.exports = bountyRoutes;