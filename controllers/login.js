'use strict'


var Bcrypt = require('bcrypt-nodejs');
var uuid = require('uuid');

var configs = require('../configs');
var jwt = require('../services/jwt');

var User = require('../models/usuarios');



function Registro(req , res){
	var params = req.body;
	if(params.nombre != null && params.apellido != null && params.email != null && params.password != null){
		User.findOne({email: params.email} , (err , userFind) => {
			if(err){
				res.status(500).send({status:false , msg:'ERROR'});
			} else {
				if(userFind){
					res.status(500).send({status:false , msg:'userYaExiste'});
				} else {
					Bcrypt.hash(params.password , null , null , (err , hash) => {
						if(err){
							res.status(500).send({status:false , msg:'ERROR'});
						} else {
							let u = new User();
							u.uuid = uuid.v4();
							u.nombre = params.nombre;
							u.apellido = params.apellido;
							u.email = params.email;
							u.password = hash;
							u.status = true;
							u.save((err , userStored) => {
								if(err){
									res.status(500).send({status:false , msg:'ERROR'});
								} else {
									res.status(200).send({status:true , msg:'userRegister'});
								}
							});
						}
					});
				}
			}
		});
	} else {
		res.status(500).send({status:false , msg:'enterFields'});
	}
}



function Login(req , res){
	var params = req.body;
	if(params.email != null && params.password != null){
		User.findOne({email: params.email} , (err , userFind) => {
			if(err){
				res.status(500).send({status:false , msg:'ERROR'});
			} else {
				if(userFind){
					Bcrypt.compare(params.password, userFind.password, (err, resB) => {
						if(err){
							res.status(500).send({status:false , msg:'ERROR'});
						} else {
							if(resB){
								let tokenJwt = jwt.createToken(userFind);
								res.status(200).send({status:true , msg:'OK' , token:tokenJwt});
							} else {
								res.status(500).send({status:false , msg:'passIncorrect'});
							}
						}
					});
				} else {
					res.status(500).send({status:false , msg:'userNoExist'});
				}
			}
		});
	} else {
		res.status(500).send({status:false , msg:'enterFields'});
	}
}




function Check1(req , res){
	res.status(200).send({status:true , msg:'OK' , data:req.user});
}



function Check2(req , res){
	if( req.user.role != null && req.user.role == 'ROLE_ADMIN' ){
		res.status(200).send({status:true , msg:'OK' , data:req.user});
	} else {
		res.status(500).send({status:false , msg:'noAdmin'});
	}
}




module.exports = {
	Registro,
	Login,
	Check1,
	Check2

	

};