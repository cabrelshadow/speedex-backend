const router = require("express").Router();
const { compareSync, hashSync } = require("bcryptjs");
const db = require("../models");
const jwt = require("jsonwebtoken");
router.get("/", async (req, res) => {
	const users = await db.User.findAll({
		include: ["Role"],
		raw: true,
	});
	const roles = await db.Role.findAll({ raw: true });
	res.status(200).render("settings/user", { users, roles });
});

router.post("/add-user", async (req, res, next) => {
	req.body.password = hashSync(req.body.password, 10);
	await db.User.create(req.body)
		.then((result) => {
			return res.redirect(req.headers.referer);
		})
		.catch((err) => {
			next(err);
		});
});
router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	if (username !== "" && password !== "") {
		const user = await db.User.findOne({ where: { username } });
		if (!user) return res.status(401).send("Non authorisé");
		if (user) {
			if (compareSync(password, user.password)) {
				const token = jwt.sign(user, process.env.secret, { expiresIn: "1d" });
				return res.status(200).json(token);
			} else return res.status(401).send("Non authorisé");
		}
	}
});
module.exports = router;