"use strict";

const {MongoClient} = require('mongodb'); // vanilla MongoDB driver. No Mongoose for you, come back next year!

module.exports = {
	_db: null,

	connect: (dbURL, dbName, callback) => {
		MongoClient.connect(dbURL, {useUnifiedTopology: true}).then((mongoClient) => {
			this._db = mongoClient.db(dbName);
			callback();
		}).catch(error => console.error(error));
	},

	getDatabase: () => this._db,

	getCollection: (collectionName) => this._db.collection(collectionName)

};