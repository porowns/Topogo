var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  console.log("hello");

  res.json({
    success: true,
    message: "Hello world!"
  });
});


module.exports = router;
