const db = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
	if (req.user["Role.isAdmin"]) {
		const magasins = await db.Magasin.findAll({ include: ["User"], raw: true });
		const getUsers = await db.User.findAll({ include: ["Role"], raw: true });
		const users = getUsers.filter(
			(user) => String(user["Role.name"]).toLocaleLowerCase() === "partenaire",
		);
		return res.render("magasin/", { magasins, users });
	} else {
		const magasins = await db.Magasin.findAll({
			include: ["User"],
			raw: true,
			where: { user_id: req.user.id },
		});
		const getUsers = await db.User.findAll({
			include: ["Role"],
			raw: true,
			where: { id: req.user.id },
		});
		const users = getUsers.filter(
			(user) => String(user["Role.name"]).toLocaleLowerCase() === "partenaire",
		);
		return res.render("magasin/", { magasins, users });
	}
});

router.post("/add", async (req, res) => {
	const { name, user_id, address } = req.body;
	await db.Magasin.create({ name, user_id, active: true, address });
	return res.redirect(req.headers.referer);
});
router.post("/:id", async (req, res) => {
	const { id } = req.params;
	const magasins = await db.Magasin.findAll({
		where: { user_id: id },
	});
	return res.status(200).json(magasins);
});
module.exports = router;
