const { ensureAuthenticated } = require("../config/auth");
const db = require("../models");

const router = require("express").Router();
router.get("/", ensureAuthenticated, async (req, res) => {
	const villes = await db.Ville.findAll({ raw: true });
	return res.render("ville", { villes });
});
router.post("/add-ville", async (req, res, next) => {
	if (Object.keys(req.body).length > 0) {
		const { nomville } = req.body;
		const getVille = await db.Ville.findOne({ where: { nomville } });
		if (getVille) {
			req.session.messages.push({
				type: "danger",
				msg: "ville a été déjà créer",
			});
			return res.redirect(req.headers.referer);
		}
		await db.Ville.create(req.body)
			.then(() => {
				req.session.messages.push({
					type: "success",
					msg: "ville a été bien créer",
				});
				return res.redirect(req.headers.referer);
			})
			.catch((err) => {
				next(err);
			});
	}
});

module.exports = router;
