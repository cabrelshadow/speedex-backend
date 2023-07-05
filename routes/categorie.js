const db = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
	const categories = await db.Categorie.findAll({ raw: true });
	return res.status(200).json(categories);
});
router.post("/add", (req, res) => {
	if (
		Object.keys(req.body).length > 0 &&
		Object.keys(req.body).at(0) === "name"
	) {
		db.Categorie.create(req.body);
		return res.status(201).send("success");
	}
	next();
});

router.put("/edit/:id", (req, res) => {
	if (
		Object.keys(req.body).length > 0 &&
		Object.keys(req.body).at(0) === "name" &&
		req.params.id
	) {
		db.Categorie.update(req.body, { where: { id: req.params.id } });
		return res.status(200).send("success");
	}
});
router.delete("/delete/:id", (req, res) => {
	if (req.params.id) {
		db.Categorie.destroy({ where: { id: req.params.id } });
		return res.status(200).send("success");
	}
});
module.exports = router;
