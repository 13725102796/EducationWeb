const express = require('express');
const mysql = require('mysql');


const db = mysql.createPool({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database:'nodejs',
    port: 3306
});

module.exports = function () {
    var router = express.Router();

    router.get('/', (req, res)=>{
        switch(req.query.act){
            case 'mod':
                db.query(`SELECT * FROM banner_table WHERE id=${req.query.id}`, (err, data)=>{
                    if(err){
                        res.status(500).send('database error').end();
                    }else if(data.length==0){
                        res.status(500).send('database not found').end();
                    }else{
                        db.query(`SELECT * FROM banner_table`, (err, bannerData)=>{
                            if(err){
                                res.status(500).send('database error').end();
                            }else{
                                res.render('admin/banners.ejs', {mod_data: data[0], bannerData});
                            }
                        });
                    }
                });
                break;
            case 'del':
                db.query(`DELETE FROM banner_table WHERE ID=${req.query.id}`, (err, data)=>{
                    if(err){
                        res.status(500).send('database error').end();
                    }else{
                        res.redirect('/admin/banners')
                    }
                });
                break;
            default:
                db.query(`SELECT * FROM banner_table`, (err, bannerData)=>{
                    if(err){
                        res.status(500).send('database error').end();
                    }else{
                        res.render('admin/banners.ejs', {bannerData});
                    }
                });
                break;
        }


    });

    router.post('/', (req, res)=>{
        //获取到提交的内容信息
        var title = req.body.title;
        var description = req.body.description;
        var href = req.body.href;

        if(!title || !description || !href) {
            res.status(400).send('填写内容不能为空').end();
        }else{
            if(req.body.mod_id){
                db.query(`UPDATE banner_table SET title='${req.body.title}', description='${req.body.description}', href='${req.body.href}' WHERE ID='${req.body.mod_id}'`, (err, data)=>{
                    if(err){
                        console.error(err);
                        res.status(500).send('database error').end();
                    }else{
                        res.redirect('/admin/banners');
                    }
                });
            }else{
                db.query(`INSERT INTO banner_table (title, description, href) VALUES('${title}', '${description}', '${href}')`, (err, data)=>{
                    if(err){
                        console.error(err);
                        res.status(500).send('database error').end();
                    }else{
                        res.redirect('/admin/banners')
                    }
                });
            };
        };
    });
    return router;
}