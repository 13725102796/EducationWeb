const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const consolidate = require('consolidate');
const mysql =require('mysql');
const expressRoute = require('express-route');

var server = express();

server.use(bodyParser.urlencoded({extended: false}));

server.listen(8080);

//1.获取请求数据
//get


server.use(multer({dest: './static/upload'}).any());

//2. cookie session

//签名
server.use(cookieParser('asdcascasxcasac'));

//加密 (使用闭包，防止污染环境变量)
(function () {
    var arr = [];
    for(var i=0; i<10000; i++){
        arr.push('keys_' + Math.random());
    }
    server.use(cookieSession({
        name: 'sess_id', keys: arr, maxAge: 20*2600*1000
    }));
})();


//3. 模版
//输出什么 （html）
server.set('view engine', 'html');

//模版文件在哪 （./template）
server.set('views', './template');

//使用哪一种模版文件 （ejs）
server.engine('html', consolidate.ejs);

//4. route
server.use('/admin/', require('./route/admin/index.js')());
server.use('/', require('./route/web/index.js')());


//5. default: static (默认静态文件路径)
server.use(static('./static/'));