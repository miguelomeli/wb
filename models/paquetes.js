'use strict'

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
require('mongoose-query-random');
var Float = require('mongoose-float').loadType(mongoose);
var Schema = mongoose.Schema;



var TableSchema = Schema({
	id_usuario: {type: Schema.ObjectId, ref: 'Usuarios'},
	uuid: {type: String, default: ''},
	paquete: {type: Number, default: 0},
	precio: {type: Number, default: 0},
	fecha: {type: Date, default: Date.now},
	status: {type: Boolean, default: false}
});


TableSchema.index({ uuid:1 }, { unique : true });
module.exports = mongoose.model('Paquetes', TableSchema);

