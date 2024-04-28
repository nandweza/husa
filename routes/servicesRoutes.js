const express = require("express");
const servicesController = require("../controllers/servicesController");

const router = express.Router();

router
    .route("/")
    .get(servicesController.getWhatWeDo);

module.exports = router;