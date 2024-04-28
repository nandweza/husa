const express = require("express");
const teamController = require("../controllers/teamController");

const router = express.Router();

router
    .route("/")
    .get(teamController.getOurTeam)

module.exports = router;
6