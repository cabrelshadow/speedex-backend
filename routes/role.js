const { ensureAuthenticated } = require("../config/auth");
const db = require("../models");

const router = require("express").Router();

router.get("/", ensureAuthenticated, async (req, res) => {
	const role = await db.Role.findAll({ raw: true });
	return res.render("settings/role", { role });
});
//add role
router.post("/add", (req, res, next) => {
	db.Role.create(req.body)
		.then(() => {
			return res.redirect(req.headers.referer);
		})
		.catch((err) => {
			next(err);
		});
});

/*  edite  role*/
router.post("/edit/:roleId", ensureAuthenticated, (req, res, next) => {
	const roleId = req.params.roleId; // Récupère l'ID du rôle à éditer
	const updatedData = req.body; // Récupère les nouvelles données du rôle depuis le corps de la requête

	db.Role.update(updatedData, {
		where: { id: roleId },
	})
		.then(() => {
			return res.redirect(req.headers.referer);
		})
		.catch((err) => {
			next(err);
		});
});

/* DELETE ROLE */
router.get("/delete/:roleId", ensureAuthenticated, (req, res, next) => {
	const roleId = req.params.roleId; // Récupère l'ID du rôle à supprimer

	db.Role.destroy({
		where: { id: roleId },
	})
		.then(() => {
			return res.redirect(req.headers.referer);
		})
		.catch((err) => {
			next(err);
		});
});

module.exports = router;
