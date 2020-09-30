"use strict";

const {MongoClient} = require('mongodb'); // vanilla MongoDB driver. No Mongoose for you, come back next year!

let _db;

module.exports.connect = (dbURL, dbName, callback) => {
	MongoClient.connect(dbURL, {useUnifiedTopology: true}).then((mongoClient) => {
		_db = mongoClient.db(dbName);
		callback();
	}).catch(error => console.error(error));
};

module.exports.getDatabase = () => _db;