//  暂时没有调出来
var express = require('express');
var util = require('util');
var api = express();
var bodyParser  = require('body-parser');
var fortune = require('./lib/fortune');


api.use(bodyParser.json());

api.use(bodyParser.urlencoded({
  extended: true
}));


var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
api.engine('handlebars',handlebars.engine);
api.set('view engine','handlebars');

api.use(express.static(__dirname + '/public'));

api.set('port', process.env.PORT || 8080);



// 提供一个 API
var tours = [
  { id:0, name:'Hood River', price:99.99 },
  { id:1, name:'Oregon Coast', price:149.95 }
];

//简单的 GET ，只返回 JSON 数据
api.get('/api/tours-json', function(req,res){
  res.json(tours);
  //  [{"id":0,"name":"Hood River","price":99.99},{"id":1,"name":"Oregon Coast","price":149.95}]
});

// 根据客户端的首选项，使用 Express 中的 res.format 方法对其响应
api.get('/api/tours', function(req,res){

    var toursXml = '<?xml version="1.0"?>' +
                      '<tours>' +
                          tours.map(function(p){
                            return '<tour price="' + p.price + '" id="' + p.id +'">' + p.name + '</tour>';
                          }).join('') +   // <?xml version="1.0"?><tours><tour price="p.price" id="p.id">p.name</tour></tours>
                      '</tours>';

    var tourText = tours.map(function(p){
                      return p.id + ': ' + p.name + ' (' + p.price + ')';
                   }).join('\n');

    res.format({
        'application/json' : function() {
          res.json(tours);
        },
        'application/xml' : function() {    //  application/xml 会根据 xml 头指定的编码格式来
          res.type('application/xml');
          res.send(toursXml);
        },
        'text/xml' : function() {    //  text/xml 忽略 xml 头所指定编码格式而默认采用 us-ascii 编码
          res.type('text/xml');
          res.send(toursXml);
        },
        'text/plain' : function() {
          res.type('text/plain');
          res.send(tourText);
        }
    });
});

// 用于更新的 PUT 节点
// PUT节点更新一个产品信息然后返回JSON
// 参数在查询字符串中传递
// 路由字符串中的 :id 命令 Express 在 req.params 中增加一个 id 属性
api.put('/api/tours/:id', function(){   // 暂时只能用 get
    var p = tours.some(function(p){
        return p.id = req.params.id;
    });
    // 没有过来？
    if( p ) {
        if( req.query.name ) {
          p.name = req.query.name;
        }
        if( req.query.price ) {
          p.price = req.query.price;
        }
        res.json({success: true});
    } else {
        res.json({error: 'No such tour exists.'});
    }
});

// 用于删除的 DEL 节点
api.del('api/tours/:id', function(req,res) {    //  get 都不行？
    var i;
    for( i=tours.length-1 ; i>=0; i-- ) {   //  i=1;i>=0;i--
        if( tours[i].id == req.params.id ) break;
        if( i>=0 ) {
            tours.splice(i,1);
            res.json({success:true});
        } else {
            res.json({error:'No such tour exists.'});
        }
    }
});

//  ----------------- 添加错误处理程序 -----------------  //
// 定制 404 页面
api.use(function(err,req,res,next){
  res.status(404);
  res.render('404');
});

// 定制 500 页面
api.use(function(err,req,res,next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});
//  -- 出现在所有路由方法的结尾，需要注意的是即使你不需要一个 "下一步 " 方法他也必须包含。以便 Express 将他识别为一个错误处理程序 --  //


api.listen(api.get('port'),function(){
  console.log( 'Express started on http://localhost' + api.get('port') );
});
