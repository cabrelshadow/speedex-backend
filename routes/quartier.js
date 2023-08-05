const { ensureAuthenticated } = require("../config/auth");
const db = require("../models");

const router = require("express").Router();
router.get("/", ensureAuthenticated, async (req, res) => {
	const villes = await db.Ville.findAll({ raw: true });
	const quartiers = await db.Quartier.findAll({ raw: true });
	return res.render("quartier", { villes, quartiers });
});

router.post("/add-quartier", async (req, res, next) => {
	if (Object.keys(req.body).length > 0) {
		const { nomquartier } = req.body;
		const getquartier = await db.Quartier.findOne({ where: { nomquartier } });
		if (getquartier) {
			req.session.messages.push({
				type: "danger",
				msg: "le quartier a été déjà créer",
			});
			return res.redirect(req.headers.referer);
		}
		await db.Quartier.create(req.body)
			.then(() => {
				req.session.messages.push({
					type: "success",
					msg: "quartier a été bien créer",
				});
				return res.redirect(req.headers.referer);
			})
			.catch((err) => {
				next(err);
			});
	}
});
module.exports = router;
