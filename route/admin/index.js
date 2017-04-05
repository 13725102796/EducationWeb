const express = require('express');

module.exports = function () {
    var router = express.Router();

    //检查登录状态
    router.use((req, res, next)=>{
        if(!req.session['admin_id'] && req.url!='/login'){
            res.redirect('/admin/login');
        }else{
            next();
        }
    });



    router.get('/', (req, res)=>{

        res.render('admin/index.ejs');
    });
    
    router.use('/banners', require('./banners.js')());
    router.use('/blog', require('./blog.js')());
    router.use('/contact', require('./contact.js')());
    router.use('/custom', require('./custom.js')());
    router.use('/intro', require('./intro.js')());

    router.use('/msg', require('./msg.js')());
    router.use('/news', require('./news.js')());
    router.use('/login', require('./login.js')());


    return router;
}