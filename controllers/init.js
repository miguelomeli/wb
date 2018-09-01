'use strict'


function Post(req , res){
	res.status(200).send({status:true , msg:'Metodo Post'});
}

function Get(req , res){
	res.status(200).send({status:true , msg:'Metodo Get'});
}

function Put(req , res){
	res.status(200).send({status:true , msg:'Metodo Put'});
}

function Delete(req , res){
	res.status(200).send({status:true , msg:'Metodo Delete'});
}









module.exports = {
	Post,
	Get,
	Put,
	Delete,
	

};