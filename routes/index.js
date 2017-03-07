var express = require('express');
var router = express.Router();
var UrlService = require("../services/UrlService");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET 解析key_url*/
router.get('/:url_key',function(req,res,next){
  var url_key = req.param('url_key');

  UrlService.findByUrlKey(url_key,function(err,vals,fields){
    if(err){
      return next();
    }
    if(vals.length <= 0){
      return next();
    }
    return res.redirect(vals[0].src_url);
  });

})

module.exports = router;
