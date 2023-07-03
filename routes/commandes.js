const db = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
	const commandes = await db.Commande.findAll({
		raw: true,
	});
	const articles = await db.Article.findAll({
		raw: true,
	});
	return res.render("commandes/", { commandes, articles });
});
router.get("/live", async (req, res) => {
	const commandes = await db.Article_commande.findAll({
		include: ["Commande", "Article"],
		raw: true,
	});
	const articles = await db.Article.findAll({
		raw: true,
	});
	return res.render("commandes/live", { commandes, articles });
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
