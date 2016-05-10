var util = require('util');
var bodyParser  = require('body-parser');
bodyParser.json();
bodyParser.urlencoded({extended: true});
module.exports = {
    processPage: function(req,res){
        res.render('process-contact');
    },
    processPost: function(req,res){
        console.log('Received contact from ' + util.inspect(req.body) + req.body.username + '<' + req.body.email + '>');
        //  { username: '213', email: '123213@qq.com', password: '123213' }     req.body 是一个对象
        try{
        // 保存到数据库
        return res.xhr ? res.render({ success:true }) : res.redirect( 303, '/thank-you' );
        } catch(e) {
        return res.xhr ? res.json({ error:'Database error' }) : res.redirect( 303, '/database-error');
        }
    },
    processAjax: function(req,res){
        if( req.xhr || req.accepts('json,html')==='json' ){
            res.send({success:true});
        } else {
            res.redirect(303,'/thank-you');
        }
    }
}
