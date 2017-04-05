const express = require('express');

module.exports = function () {
    var router = express.Router();

    router.get('/', (req, res)=>{
        res.render('admin/news.ejs');
    });

    return router;
}