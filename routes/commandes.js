const { ensureAuthenticated } = require("../config/auth");
const db = require("../models");

const router = require("express").Router();

router.get("/", ensureAuthenticated, async (req, res) => {
	let Commandes = {};
	const commandes = await db.Commande.findAll({
		include: ["User", "Magasin"],
		raw: true,
	});
	const articles = await db.Stock.findAll({
		raw: true,
		include: db.Article,
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
				articles_commandes.push(getArticle);
			});
		});
		const call_center = await db.User.findOne({
			where: { id: commande.user_call_center },
			raw: true,
		});
		Commandes[commande.id] = { ...commande, articles_commandes, call_center };
	});
	const magasins = await db.Magasin.findAll({ raw: true });
	const getUsers = await db.User.findAll({ include: ["Role"], raw: true });
	const users = getUsers.filter(
		(user) => String(user["Role.name"]).toLocaleLowerCase() === "callcenter",
	);
	const parternaires = getUsers.filter(
		(user) => String(user["Role.name"]).toLocaleLowerCase() === "partenaire",
	);
	const quartiers = await db.Quartier.findAll({ raw: true });
	const villes = await db.Ville.findAll({ raw: true });
	return res.render("commandes/", {
		Commandes,
		articles,
		magasins,
		users,
		parternaires,
		quartiers,
		villes,
	});
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
	const {
		name,
		numero_client,
		address_livraison,
		total,
		partenaire_id,
		magasin_id,
		articles,
		address_recup,
		quartier_recup,
		frais_livraison,
		frais_emballage,
	} = req.body;
	console.log(req.body);
	db.Commande.create({
		name,
		numero_client,
		partenaire_id,
		total,
		address_recup,
		quartier_recup,
		frais_livraison,
		frais_emballage,
		magasin_id,
		status_commande: "Nouvelle",
		address_livraison,
		numero_commande: "SPD-" + (Math.ceil(Math.random(300000) * 1000) + 9000),
		user_commande_id: req.user.id,
	}).then(async (commande) => {
		articles.map(async (article) => {
			await db.Article_commande.create({
				article_id: article.article_id,
				commande_id: commande.id,
				quantite: article.quantite,
			});
			const getarticle = await db.Stock.findOne({
				where: { article_id: article.article_id },
				raw: true,
			});
			if (!!getarticle) {
				await db.Stock.update(
					{
						quantite:
							parseInt(getarticle.quantite) - parseInt(article.quantite),
					},
					{ where: { article_id: getarticle.article_id } },
				);
			}
		});
		req.session.messages.push({
			type: "success",
			msg: "commande  a été bien ajouter",
		});
	});
	res.status(201).send("ok");
});
router.post("/assign/:cmd_id", async (req, res) => {
	const { user_call_center } = req.body;
	if (user_call_center) {
		await db.Commande.update(
			{
				user_call_center,
				date_assignation: new Date(),
				status_commande: "En cours",
			},
			{ where: { id: req.params.cmd_id } },
		);

		return res.redirect(req.headers.referer);
	}
});

//afficher les commande assignés
/*const Commandes = {};

const commandes = db.Commande.findAll();

for (const commande of commandes) {
  const user = db.User.findOne({ id: commande.user_id, type: "call_center" });

  if (user) {
    const articles_commandes = [];
    const articleCommandes = db.Article_commande.findAll({ commande_id: commande.id });

    for (const articleCommande of articleCommandes) {
      const article = db.Article.findOne({ id: articleCommande.article_id });
      articles_commandes.push(article);
    }

    Commandes[commande.id] = {
      details: commande,
      articles_commandes,
      call_center: user
    };
  }
}*/

module.exports = router;
