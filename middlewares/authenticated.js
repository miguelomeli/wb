'use strict'
 
var jwt = require('jwt-simple');
var moment = require('moment');
var configs = require('../configs');
var secret = configs.keyJWT;



exports.ensureAuth = function(req, res, next){
	if(!req.headers.authorization){
		return res.status(500).send({status:false , msg:'error_header'});
	}
	var token = req.headers.authorization.replace(/['"]+/g, '');
	try{
		var payload = jwt.decode(token, secret);
		if(payload.exp <= moment().unix()){
			return res.status(500).send({status:false , msg:'error_token_expirado'});
		}
	}catch(ex){
		return res.status(500).send({status:false , msg:'error_token'});
	}
	req.user = payload;
	next();
};