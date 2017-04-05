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

    router.get('/get_banners', (req, res)=>{
        db.query(`SELECT * FROM banner_table`, (err, data)=>{
            if(err){
                res.status(500).send('database error').end();
            }else{
                res.send(data).end();
            }
        })
    });

    router.get('/get_customs', (req, res)=>{
        db.query(`SELECT * FROM custom_evaluation_table`, (err, data)=>{
            if(err){
                res.status(500).send('database error').end();
            }else{
                res.send(data).end();
            }
        })
    })


    return router;
}