const db = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
	const categorie = await db.Categorie.findAll({ raw: true });
	return res.render("settings/categorie", { categorie });
});
router.post("/add", (req, res, next) => {
	db.Categorie.create(req.body)
		.then(() => {
			return res.redirect(req.headers.referer);
		})
		.catch((err) => {
			next(err);
		});
});
module.exports = router;
