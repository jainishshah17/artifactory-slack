var express = require('express');
var jfrog = require('jfrog-cli-go');

var router = express.Router();
var secrets = require('../secrets.json')
var clientId = secrets.clientId
var clientSecret = secrets.clientSecret;

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
router.post('/', function(req, res) {
  jfrog.jfrog
  res.send('Your ngrok tunnel is up and running!');
});

module.exports = router;
