var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get(/^\/commit\/(\w+)(?:\.\.(\w+))?$/, (req, res, next) => {
  const from = req.params[0];
  const to   = req.params[1] || 'HEAD';

  res.send('commit range ' + from + '..' + to);
});

module.exports = router;
