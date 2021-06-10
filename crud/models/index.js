// More info about this API: https://jsonplaceholder.typicode.com/guide/.
const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.person = require("./person.model.js")(mongoose);

module.exports = db;