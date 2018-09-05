const User = require('../Model/UserModel');
const GoodsCategory = require('../Model/GoodsCategoryModel');
const ShopList = require('../Model/ShopListModel');
const moment = require('moment');
const jwt = require('../config/jwt');
const config = require('../config/config');
const crypto = require('crypto');           //引入加密模块

const api = {
    login: ( req, res, next ) => {            //密码登录
        User.findOne({ username: req.body.username },( err, data ) => {
            if( data ){
                if( data.username != req.body.username ) {
                    res.json({ success: false, message: '用户名不存在' });
                } else {
                    //对密码进行加密，再和数据库的加密密码作比较
                    let md5 = crypto.createHash("md5");
                    let pwd = md5.update(req.body.password).digest("hex");
                    if( data.password != pwd ) {
                        res.json({ success: false, message: '密码错误' });
                    } else {
                        let token = jwt.encode( data.username, config.secret );          //创建token
                        User.update({ username: req.body.username },{ token: token,update_time: moment().format('YYYY-MM-DD HH:mm:ss')},(err)=>{
                            if(err) return next(err);
                        });
                        res.json({
                            success: true,
                            message: '登录成功',
                            token: token
                        });
                    }
                }
            } else {
                res.json({ success: false, message: '用户不存在' });
            }
        });
    },
    getUserInfo: ( req, res ) => {
        let token = req.headers.authorization.split(' ')[1];
        User.findOne({ token: token }).then(( doc ) => {
            if( doc ) {
                res.status(200).json({
                    success: true,
                    username: doc.username,
                    mobile: doc.mobile,
                    url: doc.src
                })
            } else {
                res.status(401).json({
                    success: false,
                    message: '请重新登录'
                })
            }
        });
    },
    updatePass: ( req, res ) => {
        let md5 = crypto.createHash("md5");
        let pwd = md5.update(req.body.password).digest("hex");
        User.findOne({
            password: pwd
        }, ( err, data ) => {
            if( data ) {
                let md5 = crypto.createHash("md5");
                let newPwd = md5.update(req.body.newPass).digest("hex");
                User.update({ password: pwd },{ password: newPwd }, err => {
                    if( err ) return next( err );
                    res.json({
                        success: true,
                        message: '密码修改成功'
                    });
                });
            } else {
                res.json({
                    success: false,
                    message: '旧密码错误'
                })
            }
        });
    },
    goods_cate: ( req, res ) => {
        GoodsCategory.find({},( err, doc ) => {
            res.json({
                success: true,
                goodsList: doc
            })
        })
    },
    shoplist: ( req, res ) => {
        ShopList.find({ cid : req.body.cid },(err,doc) => {
            if(err) throw err;
            if( doc ) {
                res.json({
                    success: true,
                    data: doc
                });
            }
        })
    },
    tjshop: ( req, res ) => {
        ShopList.find({ rand: { $gte: Math.random() }},(err,doc) => {
            if(err) throw err;
            res.json({
                success: true,
                data: doc
            });
        })
    },
    conditionSearch: ( req, res ) => {
        switch( req.body.index ) {
            case 1:
                ShopList.find({cid: req.body.cid, sales: {$gte: 1000}},(err,doc) => {
                    if(err) throw err;
                    console.log(doc)
                    res.json({
                        success: true,
                        data: doc
                    })
                });
                break;
            case 2:
                ShopList.find({cid: req.body.cid, star: {$gte: 4.8}},(err,doc) => {
                    if(err) throw err;
                    res.json({
                        success: true,
                        data: doc
                    })
                });
                break;
            case 3:
                ShopList.find({cid: req.body.cid, dispatch: {$lte: 3}},(err,doc) => {
                    if(err) throw err;
                    res.json({
                        success: true,
                        data: doc
                    })
                });
                break;
        }
    }
}

module.exports = api;