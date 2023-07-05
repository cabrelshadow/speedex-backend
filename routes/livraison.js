const db = require("../models");

const router = require("express").Router();
router.get("/", async (req, res) => {
	return res.render("livreur");
});
module.exports = router;
