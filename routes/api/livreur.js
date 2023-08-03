const { compareSync, hashSync } = require("bcryptjs");
const db = require("../../models");
const { sign } = require("jsonwebtoken");
const { protect } = require("../../config/auth");

const router = require("express").Router();

router.get("/commandes", protect(), async (req, res) => {
	try {
		const commandes = await db.Commande.findAll({
			where: { user_id: req.user.id },
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
		console.log(Commandes);
		res.status(200).json(Commandes);
	} catch (err) {
		console.error("Error fetching commandes:", err);
		res.status(500).json({ error: "Internal Server Error" });
	}
});
router.post("/auth", async (req, res) => {
	const { username, password } = req.body;
	const user = await db.User.findOne({
		where: { username },
		include: ["Role"],
		raw: true,
	});
	if (!user) return res.status(401).send("Not authorize");
	const livreur = user["Role.name"] === "Livreur";
	if (!livreur) return res.status(401).send("Not authorize");
	if (user) {
		const isMatch = compareSync(password, user.password);
		if (!isMatch) return res.status(401).send("Not authorize");
		if (isMatch) {
			const payload = {
				id: user.id,
				fullname: user.fullname,
			};
			const token = sign(payload, "12345", { expiresIn: "1d" });
			res.status(200).json(token);
		}
	}
});
router.post("/check", protect(), (req, res) => {
	res.status(200).json(req.user);
});
module.exports = router;
