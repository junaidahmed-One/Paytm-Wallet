const mongo = require("mongoose");

mongo.connect(connecctionString.uri);

const userSchema = new mongo.Schema({
	username: String,
	password: String,
	firstname: String,
	lastname: String,
});

const User = mongo.model("User", userSchema);

module.exports = {
	User,
};
