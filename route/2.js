const express = require('express');

module.exports = function () {
    var router = express.Router();
    router.get('/1.html', function(req, res){
        res.send('1111').end();
    });
    router.get('/2.html', function(req, res){
        res.send('2222').end();
    });
    return router;
}
