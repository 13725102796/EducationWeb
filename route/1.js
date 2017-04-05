const express = require('express');

module.exports = function () {
    var router = express.Router();
    router.get('/1.html', function(req, res){
        res.render('./1.ejs', {title: 'A+B', a: 2, b: 5})
    });
    router.get('/2.html', function(req, res){
        res.send('2222').end();
    });
    return router;
}
