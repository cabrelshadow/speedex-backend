const router = require("express").Router();
const passport = require("passport");
router.get("/login", (req, res) => {
	return res.render("user/login", { layout: false });
});

router.post("/login", async (req, res, next) => {
	const fieldEmpty =
		!!Object.keys(req.body).filter((k) => Object.values(req.body).at(k) === "")
			.length > 0;
	if (fieldEmpty) {
		req.flash("error", "Veuillez renseigner tous les champs...");
		return res.redirect(req.headers.referer);
	}
	passport.authenticate("local", {
		failureRedirect: "/auth/login",
		//successRedirect: "/",
		successRedirect: "/auth/redirectLogin",
		failureFlash: true,
	})(req, res, next);
});
router.get("/redirectLogin", (req, res, next) => {
	if (req.user["Role.name"]) return res.redirect("/");
});
router.get("/logout", (req, res) => {
	req.logout(() => {
		res.redirect("/auth/login");
	});
});
module.exports = router;
