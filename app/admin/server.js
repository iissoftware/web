const express = require('express');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

// var secret = 'i am goood man';
// var token = jwt.sign({name: 'iissoftware'},secret,{expiresIn: 60 * 60 * 24});


//解密token
// jwt.verify(token,secret,function(err,decoded){
//     if(!err) {
//         console.log(decoded)
//     }
// })

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

router(app);

app.listen(3000,'localhost',() => {
    mongoose.connect('mongodb://localhost:27017/elem')
    let db = mongoose.connection;
    db.once('open',() => {
        console.log('数据库连接成功~~~~');
    });
    console.log('服务器启动成功~~~~')
});
