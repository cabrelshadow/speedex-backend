const router = require("express").Router();
const db = require("../models");
router.get("/", async (req, res) => {
	const stocks = await db.Stock.findAll({
		include: ["Article", "User"],
		raw: true,
	});
	const articles = await db.Article.findAll({ raw: true });
	const getUsers = await db.User.findAll({ include: ["Role"], raw: true });
	const users = getUsers.filter((user) => !user["Role.isAdmin"]);
	return res.render("stocks/", { stocks, articles, users });
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

module.exports = router;
