const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const JwtStrategy = require("passport-jwt").Strategy,
	ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../models");

function localAuth(passport) {
	passport.use(
		new LocalStrategy(
			{ usernameField: "username" },
			(username, password, done) => {
				// Match user
				db.User.findOne({
					where: {
						username: username,
					},
					raw: true,
				}).then((user) => {
					if (!user) {
						console.log("No User Found");
						return done(null, false, { message: "No User Found" });
					}
					// Match password
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) throw err;

						if (isMatch) {
							return done(null, user);
						} else {
							//console.log("Incorrect");

							return done(null, false, { message: "Password Incorrect" });
						}
					});
				});
			},
		),
	);

	passport.serializeUser(function (user, cb) {
		process.nextTick(function () {
			return cb(null, {
				id: user.id,
				username: user.username,
				role: user.role,
			});
		});
	});

	passport.deserializeUser(function (user, cb) {
		const { id } = user;
		//User.findByPk(id);
		db.User.findByPk(id, { include: ["Role"], raw: true })
			.then((user) => {
				process.nextTick(function () {
					return cb(null, user);
				});
			})
			.catch((err) => cb(err));
	});
}

function jwtAuth(passport) {
	const opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = process.env.secret;
	passport.use(
		new JwtStrategy(opts, function (jwt_payload, done) {
			db.User.findOne({ where: { id: jwt_payload.id } }).then((user, err) => {
				if (err) {
					return done(err, false);
				}
				if (user) {
					process.nextTick(() => {
						return done(null, user);
					});
				} else {
					return done(null, false);
					// or you could create a new account
				}
			});
		}),
	);
}
module.exports = {
	jwtAuth,
	localAuth,
};
