const express = require('express');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use('/public',express.static('public'));            //设置访问静态资源
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


router(app);

app.listen(3000,'localhost',( err ) => {
    if( err ) throw err;
    mongoose.connect('mongodb://localhost:27017/app');
    let db = mongoose.connection;
    db.once('open',() => {
        console.log('数据库连接成功~~~');
    });
    db.once('disconnected', function () {    
        console.log('数据库连接断开');  
    });
});