const db = require("../../models");

const router = require("express").Router();

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const quartiers = await db.Quartier.findAll({
		where: { ville_id: id },
		raw: true,
	});
	return res.status(200).json(quartiers);
});

module.exports = router;
