const { ensureAuthenticated } = require("../config/auth");
const db = require("../models");

const router = require("express").Router();

router.get("/", ensureAuthenticated, async (req, res) => {
	let Commandes = {};
	const commandes = await db.Commande.findAll({
		raw: true,
	});
	const articles = await db.Stock.findAll({
		raw: true,
		include: db.Article,
	});
	commandes.map(async (commande) => {
		const articles_commandes = await db.Article_commande.findAll({
			where: { commande_id: commande.id },
			raw: true,
		});
		Commandes = { ...Commandes, ...commande, articles_commandes };
	});
	setTimeout(() => {
		console.log(Commandes);
	}, 5000);
	const magasins = await db.Magasin.findAll({ raw: true });

	return res.render("commandes/", { commandes, articles, magasins });
});
router.get("/live", ensureAuthenticated, async (req, res) => {
	const commandes = await db.Commande.findAll({
		include: db.Article,
		raw: true,
	});
	const articles = await db.Article.findAll({
		raw: true,
	});
	return res.render("commandes/live", { commandes, articles });
});
router.post("/add", ensureAuthenticated, (req, res, next) => {
	const { name, numero_client, address_livraison, stock_id, articles } =
		req.body;
	db.Commande.create({
		name,
		numero_client,
		address_livraison,
		user_commande_id: req.user.id,
	}).then(async (commande) => {
		articles.map(async (article) => {
			await db.Article_commande.create({
				article_id: article.article_id,
				commande_id: commande.id,
				quantite: article.quantite,
			});
		});
	});
	res.status(201).redirect(req.headers.referer);
});

module.exports = router;
