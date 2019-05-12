var express = require('express');
var request = require('request');

var router = express.Router();
var artifactory = require('../artifactory.json');

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
router.post('/', function(req, res) {
  request({
    url: artifactory.artifactoryURL + "/api/system", //URL to hit
    method: 'GET', //Specify the method
    auth: {
      'user': artifactory.artifactoryUsername,
      'pass': artifactory.artifactoryPassword
    }
}, function (error, response, body) {
    if (error) {
        console.log(error);
    } else {
        res.json(body);

    }
})
});

module.exports = router;
