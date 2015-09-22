
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RaffleSchema = new Schema({
	name				: String,
	numbers : {type: [], unique: true}, // ID que proporciona Twitter o Facebook
	users			 : [], 
	createdAt	 : {type: Date, default: Date.now} // Fecha de creación
});

var Raffle = mongoose.model('Raffle', RaffleSchema);
