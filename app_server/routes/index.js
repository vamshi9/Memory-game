var express = require('express');
var router = express.Router();
//var ctrl = require('../controllers/controller');
/* GET home page. */
router.get('/',function(req, res, next) {
            res.render('index', { title: 'Memory game! '});
});

module.exports = router;
