// backend/routes/user.js
const express = require("express");

const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signupBody = zod.object({
	username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string(),
});

router.post("/signup", async (req, res) => {
	const { success } = signupBody.safeParse(req.body);

	if (!success) {
		return res.status(411).json({
			message: "Incorrect inputs",
		});
	}

	const existinguser = await User.findOne({
		username: req.body.username,
	});
	if (existinguser) {
		return res.status(411).json({
			message: "Email already taken / Incorrect inputs",
		});
	}

	const user = await User.create({
		username: req.body.username,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	});

	const userId = user._id;

	await Account.create({
		userId,
		balance: 1 + Math.random() * 10000,
	});

	const token = jwt.sign(
		{
			userId,
		},
		JWT_SECRET
	);

	res.json({
		message: "User registered successfully!",
		token: token,
	});
});

const signinBody = zod.object({
	username: zod.string().email(),
	password: zod.string(),
});

router.post("/signin", async (req, res) => {
	const { success } = signinBody.safeParse(req.body);

	if (!success) {
		return res.status(411).json({
			message: "Incorrect inputs",
		});
	}

	const user = await User.findOne({
		username: req.body.username,
		password: req.body.password,
	});

	if (user) {
		const token = jwt.sign(
			{
				userId: user._id,
			},
			JWT_SECRET
		);

		res.json({
			token: token,
		});
		return;
	}

	res.status(411).json({
		message: "Error while logging in",
	});
});

const updateBody = zod.object({
	password: zod.string(),
	firstName: zod.string(),
	lastName: zod.string(),
});

router.put("/", authMiddleware, async (req, res) => {
	const { success } = updateBody.safeParse(req.body);

	if (!success) {
		return res.status(411).json({
			message: "Incorrect inputs",
		});
	}
	try {
		await User.updateOne({ _id: req.userId }, req.body);
	} catch (err) {
		return res.status(403).json({ error: err });
	}
	res.json({ message: "updated succcessfully!..." });
});

router.get("/bulk", authMiddleware, async (req, res) => {
	const filter = req.query.filter || "";

	const users = await User.find({
		$or: [
			{
				firstName: {
					$regex: filter,
				},
			},
			{
				lastName: {
					$regex: filter,
				},
			},
		],
	});

	//console.log(users);
	const filteredUsers = users.filter((user) => user._id != req.userId);

	res.json({
		user: filteredUsers.map((user) => ({
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			_id: user._id,
		})),
	});
});

module.exports = router;
