const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const db = require("../models");
router.get("/", ensureAuthenticated, async (req, res) => {
	const stocks = await db.Stock.findAll({
		include: ["Article", "User"],
		raw: true,
	});
	const articles = await db.Article.findAll({ raw: true });
	const getUsers = await db.User.findAll({ include: ["Role"], raw: true });
	const users = getUsers.filter((user) => !user["Role.isAdmin"]);
	return res.render("stocks/", { stocks, articles, users });
});

router.post("/add", async (req, res, next) => {
	if (Object.keys(req.body).length > 0) {
		db.Stock.create(req.body)
			.then(() => {
				return res.redirect(req.headers.referer);
			})
			.catch((err) => {
				next(err);
			});
	}
});

/*  edite  stock*/
router.post("/edit-stock/:stockId", ensureAuthenticated, (req, res, next) => {
	const roleId = req.params.roleId; // Récupère l'ID du rôle à éditer
	const updatedData = req.body; // Récupère les nouvelles données du rôle depuis le corps de la requête

	db.Stock.update(updatedData, {
		where: { id: stockId },
	})
		.then(() => {
			return res.redirect(req.headers.referer);
		})
		.catch((err) => {
			next(err);
		});
});

/* DELETE STOCK */
router.get("/delete-stock/:stockId", ensureAuthenticated, (req, res, next) => {
	const stockId = req.params.roleId; // Récupère l'ID du rôle à supprimer

	db.Stock.destroy({
		where: { id: stockId },
	})
		.then(() => {
			return res.redirect(req.headers.referer);
		})
		.catch((err) => {
			next(err);
		});
});

module.exports = router;
