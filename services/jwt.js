'use strict'
 
var jwt = require('jwt-simple');
var moment = require('moment');
var configs = require('../configs');
var secret = configs.keyJWT;


exports.createToken = function(user){
	try{
		var payload = {
			role: user.role,
			sub: user._id,
            uuid: user.uuid,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            status: user.status,
			iat: moment().unix(),
			exp: moment().add(30 , 'days').unix
		};
		return jwt.encode(payload , secret);
	} catch(err){
		return null;
	}
};
