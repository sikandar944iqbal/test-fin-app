var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'MSS NodeJS MicroService' });
});


routes.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '../src/index.html'));
});

module.exports = router;
