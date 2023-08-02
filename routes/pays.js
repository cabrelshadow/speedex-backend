const { ensureAuthenticated } = require("../config/auth");
const db = require("../models");

const router = require("express").Router();
router.get("/", ensureAuthenticated, async (req, res) => {
	console.log(req.user);
	return res.render("pays");
});

router.get("/", ensureAuthenticated, async (req, res) => {
	const pays = await db.User.findAll({
		include: [""],
		raw: true,
	});
	const roles = await db.Role.findAll({ raw: true });
	res.status(200).render("settings/user", { users, roles });
});

module.exports = router;