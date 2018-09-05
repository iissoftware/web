const api = require('./api');
const multer = require('multer');
const fs = require('fs');
const User = require('../Model/UserModel');

let upload = multer({
    dest: './public/upload/head/'       //图片上传的临时目录
});

module.exports = app => {
    app.post('/user/login',api.login);          //密码登录
    app.post('/user/getUserInfo',api.getUserInfo);      //用户信息
    app.post('/user/updatePass',api.updatePass);      //更新密码
    app.post('/user/uploadImg',upload.single('file'), ( req, res, next ) => {       //更换头像
        let file = req.file;
        let ext = file.mimetype.split('/')[1];
        let filePath = './public/upload/head/' + file.filename + '.' + ext;
        let token = req.headers.authorization.split(' ')[1];
        //先找到数据库中的该图片地址
        User.findOne({token: token},( err,data ) => {
            if(err) throw err;
            if( data.src ) {
                fs.unlinkSync(data.src);
                //重命名保存
                fs.rename(file.path, filePath ,err => {
                    if(err) throw err;
                    User.update({token: token},{src: filePath},err => {
                        if( err ) throw err;
                    });
                });
                res.json({
                    success: true,
                    message: '头像更换成功',
                    url: filePath
                });
            } else {
                //重命名保存
                fs.rename(file.path, filePath ,err => {
                    if(err) throw err;
                    User.update({token: token},{src: filePath},err => {
                        if( err ) throw err;
                    });
                });
                res.json({
                    success: true,
                    message: '头像更换成功',
                    url: filePath
                });
            }
        })
    });
    app.post('/goods/goods_cate',api.goods_cate);       //商品分类
    app.post('/goods/shoplist',api.shoplist);       //商品分类
    app.post('/goods/tjshop',api.tjshop);       //商品分类
    app.post('/goods/conditionSearch',api.conditionSearch);       //条件查询
}