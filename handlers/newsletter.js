module.exports = {
    newsLetter: function(req,res){
        res.render('newsletter', { csrf: 'CSRF token goes here' });
    },
}
