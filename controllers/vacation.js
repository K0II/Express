var Vacation = require('../models/vacation.js');
var VacationInSeasonListener = require('../models/vacationInSeasonListener.js');

module.exports = {
    // vacation: function(req,res){
    //     Vacation.find( { available: true }, function(err,vacations){
    //         var context = {
    //             vacations: vacations.map(function(vacation){
    //                 return {
    //                     sku: vacation.sku,
    //                     name: vacation.name,
    //                     description: vacation.description,
    //                     price: vacation.getDisplayPrice(),
    //                     inSeason: vacation.inSeason,
    //                 }
    //             })
    //         };
    //         res.render('vacation',context);
    //     });
    // },
    vacation: function(req,res){
    //  更改
    //     Vacation.findOne({name:'Hood River Day Trip'},function(err,doc){
    //         doc.set({tags:['day trip', 'hood river']});
    //         doc.save();
    //     });
    //     res.render('vacation');
    // },
        Vacation.find( function(err,vacations){
            var context = {
                vacations: vacations.map(function(vacation){
                    return {
                        name: vacation.name,
                        category: vacation.category,
                        sku: vacation.sku,
                        priceInCents: vacation.priceInCents,
                        inSeason: vacation.inSeason,
                        maximumGuests: vacation.maximumGuests,
                        available: vacation.available,
                        packagesSold: vacation.packagesSold,
                    }
                })
            };
            res.render('vacation',context);
        });
    },
    notifyMeWhenInSeason: function(req,res){
        res.render('notify-me-when-in-season', { sku: req.query.sku });
    },
    notifyMeWhenInSeasonPost: function(req,res){
        VacationInSeasonListener.update(
            {email: req.body.email},
            {$push: {sku:req.body.sku}},
            {upsert: true},
            function(err){
                if(err){
                    console.error(err.stack);
                    req.session.flash = {
                        type: 'danger',
                        introl: 'Ooops!',
                        message: 'There was an error processing your request.'
                    };
                    return res.redirect(303,'/vacation');
                }
                req.session.flash = {
                    type: 'success',
                    introl: 'Thank you!',
                    message: 'You will notified when this vacation is in season.',
                };
                return res.redirect(303,'/vacation');
            }
        )
    },
}
