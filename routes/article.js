const { ensureAuthenticated } = require("../config/auth");
const db = require("../models");

const router = require("express").Router();

router.get("/", ensureAuthenticated, async (req, res) => {
	const categories = await db.Categorie.findAll({ raw: true });
	if (req.user["Role.isAdmin"]) {
		const articles = await db.Article.findAll({
			include: ["Categorie"],
			raw: true,
		});
		return res.render("articles/", { categories, articles });
	} else {
		const articles = await db.Article.findAll({
			include: ["Categorie"],
			raw: true,
		});
		return res.render("articles/", { categories, articles });
	}
});

router.post("/add", ensureAuthenticated, (req, res, next) => {
	if (req.user["Role.isAdmin"]) {
		db.Article.create(req.body)
			.then(() => {
				req.session.messages.push({type:"success",msg:"l'article a été bien créer"})
				return res.redirect(req.headers.referer);
			})
			.catch((err) => {
				next(err);
			});
	} else return res.status(401).send("Not allowed");
});

/*  edite  article*/
router.post(
	"/edit-article/:articleId",
	ensureAuthenticated,
	(req, res, next) => {
		const {articleId } = req.params;// Récupère l'ID du rôle à éditer
		const updatedData = req.body; // Récupère les nouvelles données du rôle depuis le corps de la requête

		if (req.user["Role.isAdmin"]) {
			db.Article.update(updatedData, {
				where: { id: articleId },
			})
				.then(() => {
					req.session.messages.push({type:"info",msg:"l'article a été bien editer"})
					return res.redirect(req.headers.referer);
				})
				.catch((err) => {
					next(err);
				});
		}
	},
);

/* DELETE article*/
router.get(
	"/delete-article/:articleId",
	ensureAuthenticated,
	(req, res, next) => {
		const {articleId } = req.params;  // Récupère l'ID du rôle à supprimer

		if (req.user["Role.isAdmin"]) {
			db.Article.destroy({
				where: { id: articleId },
			})
				.then(() => {
					req.session.messages.push({type:"info",msg:"l'article a été supprimer"})
					return res.redirect(req.headers.referer);
				})
				.catch((err) => {
					next(err);
				});
		}
	},
);


module.exports = router;
