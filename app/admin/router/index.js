let user = require('../Model/UserModel');
let jwt = require('jwt-simple');
let config = require('../config');

module.exports = function (app) {
    app.get('/',( req, res ) => {
        res.send('这是后台首页')
    });
    app.post('/login',( req, res ) => {
        user.findOne({
            name: req.body.username
        },( err, data ) => {
            if(err) throw err;
            if(data){
                let token = jwt.encode({username: data.name,mobile: data.tel},config.secret);           //加密token
                res.send({token,msg: '登录成功',eid: 1});
            }else{
                res.send({msg: '用户名或密码错误',eid: 0});
            }
        });
    });
    app.post('/getMobile',( req, res ) => {
        let token = req.body.token;
        var decoded = jwt.decode(token, config.secret);             //解密token
        return res.send(decoded);
    });
}