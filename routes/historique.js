const { Op } = require("sequelize");
const { ensureAuthenticated } = require("../config/auth");
const db = require("../models");

const router = require("express").Router();
router.get("/", ensureAuthenticated, async (req, res) => {
	try {
		console.log(req.user);
		const commandes = req.user["Role.isAdmin"]
			? await db.Commande.findAll({
					/* where: {
						[Op.and]: [{ delievred: { [Op.or]: [true, false, null] } }],
					}, */
					include: ["User", "Magasin"],
					raw: true,
			  })
			: await db.Commande.findAll({
					where: {
						[Op.and]: [{ user_id: req.user.id }],
					},
					include: ["User", "Magasin"],
					raw: true,
			  });
		const Commandes = [];
		for (const commande of commandes) {
			const get_articles_commandes = await db.Article_commande.findAll({
				where: { commande_id: commande.id },
				raw: true,
			});

			const articles_commandes = await Promise.all(
				get_articles_commandes.map(async (article) => {
					const getArticle = await db.Article.findOne({
						where: { id: article.article_id },
						raw: true,
					});
					getArticle.quantite = article.quantite;
					return getArticle;
				}),
			);

			const call_center = await db.User.findOne({
				where: { id: commande.user_call_center },
				raw: true,
			});

			Commandes.push({ ...commande, articles_commandes, call_center });
		}
		return res.render("historiquecomande", { Commandes });
	} catch (err) {
		console.error("Error fetching commandes:", err);
		res.status(500).json({ error: "Internal Server Error" });
	}
});
module.exports = router;
