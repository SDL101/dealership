const express = require("express");
var db = require('../database/db-connector')

const Router = express.Router();

module.exports = () => {
	Router.get('/health', (req, res) => {
		res.send('HEALTHY');
	});

	Router.get('/all', (req, res) => {
		query = "SELECT * FROM Sale_Cars"
		db.pool.query(query, function (err, results, fields){
			if(err) 
				res.send({err})
			else 
				res.send({results})
		});
	});

	Router.get('/', (req, res) => {
		// Create a dynamic get path - basically a string with values substituted in
		res.send('API for CS340 project');
	});
	
	Router.post('/', (req, res) => {
		const sale_id = req.query.sale_id || 0
		const car_id = req.query.car_id || 0

		const query = `INSERT INTO Sale_Cars (sale_id, car_id) VALUES \
		((SELECT sale_id FROM Sales WHERE sale_id = ${sale_id}), (SELECT car_id FROM Cars WHERE car_id = ${car_id}));`

		db.pool.query(query, function(err, results, fields){
			if(err) 
				res.send({err})
			else 
				res.send({results}) 
		});
	});

	Router.put('/', (req, res) => {
		const sale_id = req.query.sale_id || 0
		const car_id = req.query.car_id || 0
		const car_id2 = req.query.car_id2 || 0

		const query = `UPDATE Sale_Cars SET car_id = ${car_id2} WHERE sale_id = ${sale_id} AND car_id = ${car_id};`

		db.pool.query(query, function(err, results, fields){
			if(err) 
				res.send({err})
			else 
				res.send({results}) 
		});
	});

	Router.delete('/', (req, res) => {
		const sale_id = req.query.sale_id || 0
		const car_id = req.query.car_id || 0

		const query = `DELETE FROM Sale_Cars WHERE sale_id = ${sale_id} AND car_id = ${car_id};`

		db.pool.query(query, function(err, results, fields){
			if(err) 
				res.send({err})
			else 
				res.send({results}) 
		});
	});
	

	return Router;
};