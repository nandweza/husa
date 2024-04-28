const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const homeRoutes = require("./routes/homeRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const teamRoutes = require("./routes/teamRoutes");
const contactRoutes = require("./routes/contactRoutes");
const blogRoutes = require("./routes/blogRoutes");
const projectRoutes = require("./routes/projectRoutes");

dotenv.config();

// register view engine
app.set("view engine", "ejs");
app.set("views", "views");

//middleware and static files
app.use(express.static('public'));
app.use(express.static('public/uploads'));
app.use(express.static('public/css/style.css'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// db connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected Successfully!"))
  .catch((err) => console.log(err));

app.use("/", homeRoutes);
app.use("/who-we-are", aboutRoutes);
app.use("/what-we-do", servicesRoutes);
app.use("/team", teamRoutes);
app.use("/contact", contactRoutes);
app.use("/projects", projectRoutes);
app.use("/blog", blogRoutes);

module.exports = app;
