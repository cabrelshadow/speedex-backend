const db = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
	const magasins = await db.Magasin.findAll({ include: ["User"], raw: true });
	const getUsers = await db.User.findAll({ include: ["Role"], raw: true });
	const users = getUsers.filter(
		(user) => String(user["Role.name"]).toLocaleLowerCase() === "partenaire",
	);
	return res.render("magasin/", { magasins, users });
});

router.post("/add", async (req, res) => {
	const { name, user_id } = req.body;
	db.Magasin.create({ name, user_id, active: true });
	return res.redirect(req.headers.referer);
});
module.exports = router;
