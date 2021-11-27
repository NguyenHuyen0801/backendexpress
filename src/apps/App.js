const express = require("express");
const app = express();
const config = require("config");
const session = require("express-session");


//config session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: config.get("app").session_key,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config.get("app").session_secure }
}));

//gio hang
app.use(require("../apps/middleware/cart"));
//share
app.use(require("../apps/middleware/share"));

//config views engine
app.set("views", config.get("app").views_folder);
app.set("view engine", config.get("app").view_engine);

//config static folder
app.use("/static", express.static(config.get("app").static_folder)); // gọi đến đối tượng app được config trong default.

//config form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("../routers/web"));

module.exports = app;