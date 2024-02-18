const mongo = require("mongoose");

mongo.connect(connecctionString.uri);

const userSchema = new mongo.Schema({
	username: String,
	password: String,
	firstname: String,
	lastname: String,
});

const accountSchema = new mongo.Schema({
	userId: {
		type: mongo.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	balance: {
		type: Number,
		required: true,
	},
});

const Account = mongo.model("Account", accountSchema);
s;
const User = mongo.model("User", userSchema);

module.exports = {
	User,
	Account,
};
