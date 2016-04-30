/**/var gpio = require("rpi-gpio");
var express = require('express');
var app = express();

//pi gpio setup
var ON = 38;
var OFF = 40;
gpio.setup(ON, gpio.DIR_OUT);
gpio.setup(OFF, gpio.DIR_OUT);

//HTTP request handlers
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/on', function(req, res) {
	on();
	res.send('OK');
});
app.get('/off', function(req, res) {
	off();
	res.send('OK');
});
app.use(express.static(__dirname + '/index.html'));
function on() {
	gpio.write(ON, 1);
	setTimeout(function() {
		gpio.write(ON, 0);
	}, 250);
}

function off() {
	gpio.write(OFF, 1);
	setTimeout(function() {
		gpio.write(OFF, 0);
	}, 250);
}

//Start the server yo
var server = app.listen(80, function() {
	console.log('Starting server');
});
