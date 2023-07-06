const router = require("express").Router();
const passport = require("passport");
router.get("/login", (req, res) => {
	return res.render("user/login", { layout: false });
});

router.post("/login", async (req, res, next) => {
	passport.authenticate("local", {
		failureRedirect: "/auth/login",
		//successRedirect: "/",
		successRedirect: "/auth/redirectLogin",
		// failureFlash: true,
	})(req, res, next);
});
router.get("/redirectLogin", (req, res, next) => {
	if (req.user["Role.name"] === "Administrateur") return res.redirect("/");
});
router.get("/logout", (req, res) => {
	req.logout(() => {
		res.redirect("/auth/login");
	});
});
module.exports = router;
