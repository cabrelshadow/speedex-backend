const { ensureAuthenticated } = require("../config/auth");
const db = require("../models");

const router = require("express").Router();
router.get("/", ensureAuthenticated, async (req, res) => {
	console.log(req.user);
	return res.render("pays");
});

router.post("/add-pays", async (req, res, next) => {
	if (Object.keys(req.body).length > 0) {
		const { nompays } = req.body;
		const getPays = await db.Pays.findOne({ where: { nompays } });
		if (getPays) {
			req.session.messages.push({
				type: "danger",
				msg: "le pays a été déjà créer",
			});
			return res.redirect(req.headers.referer);
		}
		await db.Pays.create(req.body)
			.then(() => {
				req.session.messages.push({
					type: "success",
					msg: "pays a été bien créer",
				});
				return res.redirect(req.headers.referer);
			})
			.catch((err) => {
				next(err);
			});
	}
});
module.exports = router;