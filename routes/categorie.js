const { ensureAuthenticated } = require("../config/auth");
const db = require("../models");

const router = require("express").Router();

router.get("/", ensureAuthenticated, async (req, res) => {
	const categories = await db.Categorie.findAll({ raw: true });
	return res.status(200).json(categories);
});
router.post("/add", (req, res) => {
	if (
		Object.keys(req.body).length > 0 &&
		Object.keys(req.body).at(0) === "name"
	) {
		db.Categorie.create(req.body)
			.then(() => {
				return res.redirect(req.headers.referer);
			})
			.catch((err) => {
				next(err);
			});
	}
});

router.put("/edit/:id", ensureAuthenticated, (req, res) => {
	if (
		Object.keys(req.body).length > 0 &&
		Object.keys(req.body).at(0) === "name" &&
		req.params.id
	) {
		db.Categorie.update(req.body, { where: { id: req.params.id } });
		return res.redirect(req.headers.referer);
	}
});
router.delete("/delete/:id", ensureAuthenticated, async (req, res) => {
	if (req.params.id) {
		db.Categorie.destroy({ where: { id: req.params.id } });
		return res.status(200).send("success");
	}
	const categorie = await db.Categorie.findAll({ raw: true });
	return res.redirect(req.headers.referer);
});

module.exports = router;
