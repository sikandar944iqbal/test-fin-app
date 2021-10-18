var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'MSS NodeJS MicroService' });
});


router.get('/readiness', function (req, res) {
  return res.status(200).json({ status: 'OK' });
});
 router.get('/liveness', function (req, res) {
  return res.status(200).json({ status: 'OK' });
});

module.exports = router;
