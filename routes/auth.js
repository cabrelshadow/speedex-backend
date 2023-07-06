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

module.exports = router;
