const db = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
	const categories = await db.Categorie.findAll({ raw: true });
	const articles = await db.Article.findAll({
		include: ["Categorie"],
		raw: true,
	});
	return res.render("articles/", { categories, articles });
});

router.post("/add", (req, res, next) => {
	db.Article.create(req.body)
		.then(() => {
			return res.redirect(req.headers.referer);
		})
		.catch((err) => {
			next(err);
		});
});

module.exports = router;
