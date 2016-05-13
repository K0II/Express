module.exports = {
    add: function(req,res){
        res.render('cart/add',{sku:req.query.sku});
    },
}
