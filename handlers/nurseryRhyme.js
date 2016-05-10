var bodyParser  = require('body-parser');

module.exports = {
    nurseryRhyme: function(req,res){
        res.render('nursery-rhyme');
    },
    nurseryRhymeAjax: function(req,res){
        res.json({
            animal: 'squirrel',
            bodyPart: 'tail',
            adjective: 'bushy',
            noun: 'heck'
        });
    },
}
