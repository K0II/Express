module.exports = {
    newsLetter: function(req,res){
        res.render('newsletter', { csrf: 'CSRF token goes here' });
    },
    newsletterPost: function(req,res){
        res.redirect(303,'/thank-you');
    }
}
