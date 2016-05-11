// Home处理器 和  About处理器，以及所有任何不属于其他逻辑分组的处理器

var fortune = require('../lib/fortune');

module.exports = {
    home: function(req,res){
        res.render('home');
    },
    about: function(req,res){
        res.render('about',{
            fortune: fortune.getFortune(),
            pageTestScript: '/qa/tests-about.js'
        });
    },
    header: function(req,res){
        res.set('Content-Type','text/plain');
        var q = '';
        for( var name in req.headers ) {
            q += name + ':' + req.headers[name] + '\n';
        }
        res.send(q);
    },
    error: function(req,res){
        res.status(505).render('error');
    },
    test: function(req,res){
        res.type('text/plain');
        res.send('this is a test');
    },
    noLayout: function(req,res){
        res.render( 'no-layout', {layout:null} );
    },
    thankYou: function(req,res){
      res.render('thank-you');
    }
}
