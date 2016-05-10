var express = require('express');
var app = express();
var mongoose = require('mongoose');
var jqupload = require('jquery-file-upload-middleware');
var bodyParser  = require('body-parser');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var credentials = require('./credentials');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(credentials.cookieSecret));
app.use(session({
    secret: credentials.cookieSecret,
    resave: true,
    saveUninitialized: true
}));
// the default values will change so they want to ensure that by setting the values explicitly now,
// you won't run into unexpected behavior when the defaults do change (in the near future).

var weather = require('./lib/weather');
app.set('view cache', true);
var handlebars = require('express3-handlebars').create({
    defaultLayout:'main',
    extname: ".hbs",
    helpers: {
        section: function(name,options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('hbs',handlebars.engine);
app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 8080);// 可以使用下面命令指定端口号： PORT=3000 node app.js


var opts = {
    server: {
        socketOptions: {keepAlive: 1}
    }
};

switch(app.get('env')){
    case 'development':
        mongoose.connect( credentials.mongo.development.connectionString, opts );
        break;
    case 'production':
        mongoose.connect( credentials.mongo.production.connectionString, opts );
        break;
    default:
        throw new Error( 'Unknown execution enviroment: ' + app.get('env') );
}
var Vacation = require('./models/vacation.js');


// 添加初始数据   第一次执行时 find 返回的是空列表
 Vacation.find(function(err,vacations){
    if(vacations.length) return;    //   避免重复添加初始数据,如果数据库中已经有度假包了，那就是已经添加过了，我们就走开
    new Vacation({
        name: 'Hood River Day Trip',
        slug: 'hood-river-day-trip',
        category: 'Day Trip',
        sku: 'HR199',
        description: 'Spend a day sailing on the Columbia and ' +
            'enjoying craft beers in Hood River!',
        priceInCents: 9995,
        tags: ['day trip', 'hood river', 'sailing', 'windsurfing', 'breweries'],
        inSeason: true,
        maximumGuests: 16,
        available: true,
        packagesSold: 0,
    }).save();

    new Vacation({
        name: 'Oregon Coast Getaway',
        slug: 'oregon-coast-getaway',
        category: 'Weekend Getaway',
        sku: 'OC39',
        description: 'Enjoy the ocean air and quaint coastal towns!',
        priceInCents: 269995,
        tags: ['weekend getaway', 'oregon coast', 'beachcombing'],
        inSeason: false,
        maximumGuests: 8,
        available: true,
        packagesSold: 0,
    }).save();

    new Vacation({
        name: 'Rock Climbing in Bend',
        slug: 'rock-climbing-in-bend',
        category: 'Adventure',
        sku: 'B99',
        description: 'Experience the thrill of rock climbing in the high desert.',
        priceInCents: 289995,
        tags: ['weekend getaway', 'bend', 'high desert', 'rock climbing', 'hiking', 'skiing'],
        inSeason: true,
        requiresWaiver: true,
        maximumGuests: 4,
        available: false,
        packagesSold: 0,
        notes: 'The tour guide is currently recovering from a skiing accident.',
    }).save();
 });



// 创建一个中间件 res.locals.partials 对象添加这些数据
app.use(function(req,res,next){
    if(!res.locals.partials)    res.locals.partials = {};
    res.locals.partials.weather = weather.getWeatherData();
    next();
});

app.use(function(req,res,next){
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  // 如果 test=1 出现在任何页面的查询字符串中，属性res.locals.showTests 就会被设为true
  // res.locals 对象是要传给视图的上下文的一部分
  next();
});

// jQuery File Upload endpoint middleware
app.use('/upload', function(req, res, next){
    var now = Date.now();
    jqupload.fileHandler({
        uploadDir: function(){
            return __dirname + '/public/uploads/' + now;
        },
        uploadUrl: function(){
            return '/uploads/' + now;
        },
    })(req, res, next);
});

require('./routes.js')(app);

//  ----------------- 添加错误处理程序 -----------------  //
// 定制 404 页面
app.use(function(err,req,res,next){
  res.status(404);
  res.render('404');
});

// 定制 500 页面
app.use(function(err,req,res,next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});
//  -- 出现在所有路由方法的结尾，需要注意的是即使你不需要一个 "下一步 " 方法他也必须包含。
//  以便 Express 将他识别为一个错误处理程序 --  //


app.listen(app.get('port'),function(){
  console.log( 'Express started on http://localhost' + app.get('port') );
});
