var User = require('../model/users');
function smartJoin(arr,separator) {
    if(!separator) separator = ' ';
    return arr.filter(function(elt){
        return elt !== undefined && elt !== null && elt.toString().trim() !== '';
    }).join(separator);
}

module.exports = function(username) {
    var user = User.findById(userID);
    if(!user) return {
        error: 'Unknown user'  + req.params.userID;
    }
    return {
        name: user.name,
        password: uer.password
    }
}
