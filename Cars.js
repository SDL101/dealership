const express = require("express");
var db = require('../database/db-connector')

const Router = express.Router();

module.exports = () => {
	Router.get('/all', (req, res) => {
		query = "SELECT * FROM Cars"
		db.pool.query(query, function (err, results, fields){
			if(err) 
				res.send({err})
			else 
				res.send({results})
		});
	});
	return Router;
}