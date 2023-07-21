const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const db = require("../models");
router.get("/", ensureAuthenticated, async (req, res) => {
	if (req.user["Role.isAdmin"]) {
		const stocks = await db.Stock.findAll({
			include: ["Article", "Magasin"],
			raw: true,
		});
		const articles = await db.Article.findAll({ raw: true });
		const magasins = await db.Magasin.findAll({ raw: true });
		return res.render("stocks/", { stocks, articles, magasins });
	} else {
		const user_magasins = await db.Magasin.findAll({
			where: { user_id: req.user.id },
			raw: true,
		});
		const stocks = [];
		user_magasins.map(async (magasin) => {
			const getstocks = await db.Stock.findAll({
				include: ["Article", "Magasin"],
				where: { magasin_id: magasin.id },
				raw: true,
			});
			return stocks.push(...getstocks);
		});
		const articles = await db.Article.findAll({ raw: true });
		const magasins = await db.Magasin.findAll({ raw: true });
		return res.render("stocks/", { stocks, articles, magasins });
	}
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

router.post("/:magasin_id", ensureAuthenticated, async (req, res) => {
	const { magasin_id } = req.params;
	const articles = await db.Stock.findAll({
		include: ["Article"],
		raw: true,
		where: { magasin_id },
	});
	return res.status(200).json(articles);
});

/*  edite  stock*/
router.post("/edit-stock/:stockId", ensureAuthenticated, (req, res, next) => {
	const { stockId } = req.params; // Récupère l'ID du rôle à éditer
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
	const { stockId } = req.params; // Récupère l'ID du rôle à supprimer

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
