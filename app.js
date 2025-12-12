const express = require("express");
const mysql = require("mysql2");
const parser = express.urlencoded(({extended:false}));
const app = express();

app.listen('3000', ()=>
console.log('сервер запущен на порту 3000'));


const pool = mysql.createPool(
    {
        connectionLimit: 5,
        host: "localhost",
        user: "root",
        database:"svaz",
        password:"1111"
    }
);

app.get('/',(req,res)=>
{
    res.sendFile(__dirname + '/index.html');
});

app.post('/s', parser, (req,res)=>
{
    let names = req.body.names;
    let emails = req.body.emails;
    let texts = req.body.texts;

    pool.query("insert into sv(name_s,email_s,text_s) values(?,?,?)", [names,emails,texts],(err,results)=>{
        if(err) console.log(err);
        res.send("сообщение отправлено!!!!!!!!");
        
    });

});
