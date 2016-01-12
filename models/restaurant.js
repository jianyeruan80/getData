var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Restaurant = new Schema({
    state:String,
	name: String,
    phone: String
});


module.exports = mongoose.model('restaurants', Restaurant);