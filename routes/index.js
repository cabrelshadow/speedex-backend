const { ensureAuthenticated } = require("../config/auth");
const db = require("../models");

const router = require("express").Router();

router.get("/", ensureAuthenticated, async (req, res) => {
	const countArticle = await db.Article.findAll({
		attributes: [
			[db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "article_count"],
		],
		raw: true,
	});
	const countUser = await db.User.findAll({
		attributes: [
			[db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "user_count"],
		],
		raw: true,
	});
	const countCommande = await db.Commande.findAll({
		attributes: [
			[db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "commande_count"],
		],
		raw: true,
	});
	const countMagasin = await db.Magasin.findAll({
		attributes: [
			[db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "magasin_count"],
		],
		raw: true,
	});
	const { commande_count } = countCommande[0],
		{ article_count } = countArticle[0],
		{ magasin_count } = countMagasin[0],
		{ user_count } = countUser[0];
	return res.render("index", {
		magasin_count,
		commande_count,
		article_count,
		user_count,
	});
});

module.exports = router;
