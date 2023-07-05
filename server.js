const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const session = require("express-session");
const passport = require("passport");
const Handlebars = require("handlebars");
const { engine } = require("express-handlebars");
const {
	allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const { jwtAuth } = require("./config/passport");
app.use(cors());
//app.use(express.static("public"));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	}),
);
app.use((err, req, res, next) => {
	// Handle the error
	res.status(500).json({ error: "Internal Server Error" });
});

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(function (req, res, next) {
	res.locals.user = req.user || null;
	next();
});
app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: false,
		maxAge: new Date(Date.now() + 3600000),
	}),
);
app.use(passport.initialize());
app.use(passport.session());
jwtAuth(passport);
const port = process.env.PORT || 8000;

app.use("/user", require("./routes/user"));
app.use("/categorie", require("./routes/categorie"));
app.use("/role", require("./routes/roles"));
http.createServer(app).listen(port, () => {
	console.log("Run server on port " + port);
});
