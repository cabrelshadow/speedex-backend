const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const session = require("express-session");
const passport = require("passport");
const { jwtAuth } = require("./config/passport");
const { engine } = require("express-handlebars");
const { Server } = require("socket.io");
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use(
	express.urlencoded({
		extended: false,
	}),
);
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use((err, req, res, next) => {
	// Handle the error
	res.status(500).json({ error: "Internal Server Error" });
});
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

app.use("/", require("./routes/index"));
app.use("/admin/user", require("./routes/user"));
app.use("/admin/role", require("./routes/role"));
app.use("/admin/categories", require("./routes/categorie"));
app.use("/admin/articles", require("./routes/article"));
app.use("/commandes", require("./routes/commandes"));
app.use("/admin/stocks", require("./routes/stocks"));
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
