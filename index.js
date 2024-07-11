const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const homeRoutes = require("./routes/homeRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const teamRoutes = require("./routes/teamRoutes");
const contactRoutes = require("./routes/contactRoutes");
const blogRoutes = require("./routes/blogRoutes");
const sectorRoutes = require("./routes/sectorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

dotenv.config();

// register view engine
app.set("view engine", "ejs");
app.set("views", "views");

//middleware and static files
app.use(express.static('public'));
app.use(express.static('public/uploads'));
app.use(express.static('public/css/style.css'));

app.use(cookieParser());
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
app.use("/sectors", sectorRoutes);
app.use("/blog", blogRoutes);
app.use("/gallery", galleryRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);

module.exports = app;
