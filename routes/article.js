const { ensureAuthenticated } = require("../config/auth");
const db = require("../models");

const router = require("express").Router();

router.get("/", ensureAuthenticated, async (req, res) => {
	const categories = await db.Categorie.findAll({ raw: true });
	const articles = await db.Article.findAll({
		include: ["Categorie"],
		raw: true,
	});
	return res.render("articles/", { categories, articles });
});

router.post("/add", ensureAuthenticated, (req, res, next) => {
	db.Article.create(req.body)
		.then(() => {
			return res.redirect(req.headers.referer);
		})
		.catch((err) => {
			next(err);
		});
});

/*  edite  article*/
router.post(
	"/edit-article/:articleId",
	ensureAuthenticated,
	(req, res, next) => {
		const articleId = req.params.roleId; // Récupère l'ID du rôle à éditer
		const updatedData = req.body; // Récupère les nouvelles données du rôle depuis le corps de la requête

		db.Article.update(updatedData, {
			where: { id: articleId },
		})
			.then(() => {
				return res.redirect(req.headers.referer);
			})
			.catch((err) => {
				next(err);
			});
	},
);

/* DELETE article*/
router.get(
	"/delete-article/:articleId",
	ensureAuthenticated,
	(req, res, next) => {
		const articleId = req.params.roleId; // Récupère l'ID du rôle à supprimer

		db.Article.destroy({
			where: { id: articleId },
		})
			.then(() => {
				return res.redirect(req.headers.referer);
			})
			.catch((err) => {
				next(err);
			});
	},
);
module.exports = router;
