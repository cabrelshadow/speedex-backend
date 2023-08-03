const { ensureAuthenticated } = require("../config/auth");
const db = require("../models");

const router = require("express").Router();
router.get("/", ensureAuthenticated, async (req, res) => {
	let Commandes = [];
	const commandes = await db.Commande.findAll({
		where: { user_call_center: req.user.id },
		include: ["User", "Magasin"],
		raw: true,
	});
	commandes.filter(async (commande) => {
		const get_articles_commandes = await db.Article_commande.findAll({
			where: { commande_id: commande.id },
			raw: true,
		});
		const articles_commandes = [];
		get_articles_commandes.map(async (article) => {
			await db.Article.findOne({
				where: { id: article.article_id },
				raw: true,
			}).then((getArticle) => {
				getArticle.quantite = article.quantite;
				articles_commandes.push(getArticle);
			});
		});
		const call_center = await db.User.findOne({
			where: { id: commande.user_call_center },
			raw: true,
		});
		Commandes[commande.id] = { ...commande, articles_commandes, call_center };
	});
	const getUsers = await db.User.findAll({ include: ["Role"], raw: true });
	const users = getUsers.filter(
		(user) => String(user["Role.name"]).toLocaleLowerCase() === "livreur",
	);

	return res.render("callcenter", { Commandes, users });
});

router.post("/edit/:cmd_id", async (req, res) => {
	const { user_id, quartier, adresse_livraison, comment, status } = req.body;
	if (user_id) {
		await db.Commande.update(
			{
				user_id,
				quartier,
				adresse_livraison,
				comment,
				status_commande: status,
				date_validation: new Date(),
				validate: true,
			},
			{ where: { id: req.params.cmd_id } },
		);
		return res.redirect(req.headers.referer);
	}
});

module.exports = router;
