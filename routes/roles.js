const db = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
	const roles = await db.Role.findAll({ raw: true });
	return res.status(200).json(roles);
});

router.post("/add", (req, res) => {
	db.Role.create(req.body);
	return res.status(201).send("success");
});

router.put("/edit/:id", (req, res) => {
	db.Role.update(req.body, { where: { id: req.params.id } });
	return res.status(200).send("success");
});

router.delete("/delete/:id", (req, res) => {
	db.Role.destroy({ where: { id: req.params.id } });
	return res.status(200).send("success");
});

module.exports = router;
