'use strict'

var uuid = require('uuid');
var Paquetes = require('../models/paquetes');
var mongoosePagination = require('mongoose-pagination');


function Insertar(req , res){
	let params = req.body;
	if(params.paquete != null && params.precio != null){
		Paquetes.findOne({id_usuario: req.user.sub , paquete: params.paquete , precio: params.precio} , (err , paqFind) => {
			if(err){
				res.status(500).send({status:false , msg:'ERROR'});
			} else {
				if(paqFind){
					res.status(500).send({status:false , msg:'paqueteExist'});
				} else {
					let p = new Paquetes();
					p.id_usuario = req.user.sub;
					p.uuid = uuid.v4();
					p.paquete = params.paquete;
					p.precio = params.precio;
					p.status = true;
					p.save((err , paqStored) => {
						if(err){
							res.status(500).send({status:false , msg:'ERROR'});
						} else {
							res.status(200).send({status:true , msg:'paqRegister' , data:paqStored});
						}
					});
				}
			}
		});
	} else {
		res.status(500).send({status:false , msg:'enterFields'});
	}
}







function Actualizar(req , res){
	let params = req.body;
	let gets = req.params;
	if(params.paquete != null && params.precio != null && gets.id != null){
		Paquetes.findOne({id_usuario: req.user.sub , _id: gets.id} , (err , paqFind) => {
			if(err){
				res.status(500).send({status:false , msg:'ERROR'});
			} else {
				if(paqFind){
					let dataUp = {
						paquete: params.paquete,
						precio: params.precio,
					};
					Paquetes.findByIdAndUpdate(gets.id , dataUp , {new: true} , (err , paqUpdate) => {
						if(err){
							res.status(500).send({status:false , msg:'ERROR'});
						} else {
							if(!paqUpdate){
								res.status(500).send({status:false , msg:'ERROR'});
							} else {
								res.status(200).send({status:true , msg:'OK' , data:paqUpdate});
							}
						}
					});
				} else {
					res.status(500).send({status:false , msg:'paqNoExist'});
				}
			}
		});
	} else {
		res.status(500).send({status:false , msg:'enterFields'});
	}
}




function Eliminar(req , res){
	let gets = req.params;
	if(gets.id != null){
		Paquetes.findByIdAndRemove(gets.id , (err , paqDeleted) => {
			if(err){
				res.status(500).send({status:false , msg:'ERROR'});
			} else {
				res.status(200).send({status:true , msg:'OK'});
			}
		});
	} else {
		res.status(500).send({status:false , msg:'enterFields'});
	}
}



function Detalle(req , res){
	let gets = req.params;
	if(gets.id != null){
		Paquetes.findOne({id_usuario: req.user.sub , _id: gets.id} , (err , paqFind) => {
			if(err){
				res.status(500).send({status:false , msg:'ERROR'});
			} else {
				if(paqFind){
					res.status(200).send({status:true , msg:'OK' , data:paqFind});
				} else {
					res.status(500).send({status:false , msg:'paqNoExist'});
				}
			}
		});
	} else {
		res.status(500).send({status:false , msg:'enterFields'});
	}
}



function Listado(req , res){
	if(req.params.page){
		var page = req.params.page;
	} else {
		var page = 1;
	}
	let itemPerPage = 3;
	Paquetes.find({id_usuario: req.user.sub}).sort('fecha').paginate(page , itemPerPage , (err , paqFind , total) => {
		if(err){
			res.status(500).send({status:false , msg:'ERROR'});
		} else {
			if(!paqFind){
				res.status(500).send({status:false , msg:'noPaquetes'});
			} else {
				res.status(200).send({status:true , msg:'OK' , pages: total , data:paqFind});
			}
		}
	});
}




module.exports = {
	Insertar,
	Actualizar,
	Eliminar,
	Detalle,
	Listado,

	

};