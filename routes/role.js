const db = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
	const role = await db.Role.findAll({ raw: true });
	return res.render("settings/role", { role });
});
router.post("/add", (req, res, next) => {
	db.Role.create(req.body)
		.then(() => {
			return res.redirect(req.headers.referer);
		})
		.catch((err) => {
			next(err);
		});
});
module.exports = router;
