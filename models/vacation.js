var mongoose = require('mongoose');

// 定义模式
var vacationSchema = mongoose.Schema({
    name: String,
    slug: String,
    category: String,
    sku: String,         //  Stock Keeping Unit（库存量单位）
    description: String,
    priceInCents: Number,
    tags: [String],    //  字符串数组
    inSeason: Boolean,
    available: Boolean,
    requiresWaiver: Boolean,     //  免责
    maximumGuests: Number,
    notes: String,
    packagesSold: Number,
});

// 在创建模型之前必须先定义方法
vacationSchema.methods.getDisplayPrice = function(){
    return '$' + (this.priceInCents / 100).toFixed(2);
}

var Vacation = mongoose.model('Vacation', vacationSchema);    //  创建模型
module.exports = Vacation;    //  导出模型