var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 8000;
var mongoose = require('mongoose');
var bountyHunter = require('./models/bounty');


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)))

app.use('/api/bounty', require('./routes/bountyRoutes'));

mongoose.connect('mongodb://localhost/bounty', function (err) {
	if (err) {
		throw err;
	}
	console.log('Connected to the database!');
});




app.listen(port, function() {
	console.log("Server is listening on port " + port);
})



