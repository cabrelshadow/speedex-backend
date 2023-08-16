const passport = require("passport");
module.exports = {
	ensureAuthenticated: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		// req.flash("error_msg", "Not Authorized");
		let path = "/auth/login";
		path += req.headers.referer ? `?next=${req.headers.referer}` : "";
		req.flash("error_message", "Veuillez-vous connecté");
		return res.redirect(path);
	},

	protect: () => {
		return passport.authenticate("jwt", { session: false });
	},
};
