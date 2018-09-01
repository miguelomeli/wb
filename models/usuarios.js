'use strict'

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
require('mongoose-query-random');
var Float = require('mongoose-float').loadType(mongoose);
var Schema = mongoose.Schema;



var TableSchema = Schema({
	role: {type: String, default: 'ROLE_USER'},
	uuid: {type: String, default: ''},
	nombre: {type: String, default: ''},
	apellido: {type: String, default: ''},
	email: {type: String, default: ''},
	password: {type: String, default: ''},
	fecha: {type: Date, default: Date.now},
	status: {type: Boolean, default: false}
});


TableSchema.index({ uuid:1 }, { unique : true });
module.exports = mongoose.model('Usuarios', TableSchema);

