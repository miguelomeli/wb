'use strit'

var app = require('./app');
var mongoose = require('mongoose');
var port = 5050;

var Promise = require('bluebird');
mongoose.Promise = global.Promise;
Promise.promisifyAll(mongoose); 


mongoose.connect('mongodb://127.0.0.1:27017/webservice' , { useNewUrlParser: true } , (err , res) => {
	if(err){
		console.log("Error en la db");
		throw err;
	} else {
		console.log("La db esta corriendo normalmente.");
		app.listen(port , function(){
		  console.log('Servidor de Webservice corriendo correctamente');
		});
	}
});