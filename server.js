const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const session = require("express-session");
const passport = require("passport");
const Handlebars = require("handlebars");
var sqlite = require("better-sqlite3");
var SqliteStore = require("better-sqlite3-session-store")(session);
var sessionsDB = new sqlite("db/sessions.db");
const { engine } = require("express-handlebars");
const { jwtAuth, localAuth } = require("./config/passport");
const expressHandlebars = require("express-handlebars");
const {
	allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const { Server } = require("socket.io");
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use(
	express.urlencoded({
		extended: false,
	}),
);
/* expressHandlebars.create({
	
}); */

app.engine(
	".hbs",
	expressHandlebars.engine({
		defaultLayout: "main",
		extname: ".hbs",
		handlebars: allowInsecurePrototypeAccess(Handlebars),
		helpers: {
			selected: function (option, value) {
				if (parseInt(option) === parseInt(value)) {
					return "selected";
				} else {
					return "";
				}
			},
			multiplyBy: function (valueOne, valueTwo) {
				return valueOne * valueTwo;
			},
			checkStatus: function (status) {},
			if_not: function (val1, val2, opts) {
				if (val1 !== val2) {
					return opts.fn(this);
				} else {
					return opts.inverse(this);
				}
			},
			addition: (val1, value2) => {
				return parseInt(val1) + parseInt(value2);
			},
			if_equal: function (val1, val2, opts) {
				if (val1 === val2) {
					return opts.fn(this);
				} else {
					return opts.inverse(this);
				}
			},
			formDate: function (val1) {
				return FormatDate(val1);
			},
			lessThan: function (val1, val2) {
				if (val2 <= val1) {
					return "background-color: #e74c3c; color: white; font-size: 20px; text-align: center";
				}
			},
		},
	}),
);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: false,
		maxAge: new Date(Date.now() + 3600000),
		store: new SqliteStore({
			client: sessionsDB,
		}),
	}),
);
app.use(passport.initialize());
app.use(passport.session());
jwtAuth(passport);
localAuth(passport);
app.use((err, req, res, next) => {
	// Handle the error
	res.status(500).json({ error: "Internal Server Error" });
});
app.use(function (req, res, next) {
	res.locals.user = req.user || null;
	next();
});

const port = process.env.PORT || 8000;

app.use("/", require("./routes/index"));
app.use("/admin/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/admin/role", require("./routes/role"));
app.use("/admin/categories", require("./routes/categorie"));
app.use("/admin/articles", require("./routes/article"));
app.use("/commandes", require("./routes/commandes"));
app.use("/commande_live", require("./routes/commande_live"));
app.use("/admin/stocks", require("./routes/stocks"));
app.use("/livreur", require("./routes/livreur"));
app.use("/livraison", require("./routes/livraison"));
app.use("/callcenter", require("./routes/callcenter"));
app.use("/superviseur", require("./routes/superviseur"));
const httpServer = http.createServer(app);

const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", async (socket) => {
	// const active = await getActive();
	// io.emit("user connect", commandes);

	/*   socket.on("new", (data) => {
    console.log("data of commandes", data);
    //return data;
  });

  socket.on("test", (data) => {
    console.log("data of commandes", data);
    //return data;
  }); */

	socket.on("disconnect", () => {
		// clearInterval(interval);
		console.log("user disconnected  ");
	});
});

/* const socketIoObject = io;
module.exports.ioObject = socketIoObject; */

app.io = io;
httpServer.listen(port, () => {
	console.log("Run server on port " + port);
});
