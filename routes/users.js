var express = require('express');
var router = express.Router();
var UrlService = require('../services/UrlService');
var Utils = require('../services/Utils');
/* GET users listing. */
router.get('/', function(req, res, next) {

  var url_key = Utils.decToSixtyTwoStr(4564564564);
  console.log(url_key);

  res.send('respond with a resource');
});

module.exports = router;
