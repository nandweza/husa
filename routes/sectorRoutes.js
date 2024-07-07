const express = require("express");
const sectorController = require("../controllers/sectorController");
const uploads = require("../middleware/imageUpload");
const { checkAuthentication } = require("../middleware/auth");

const router = express.Router();

router
    .route("/")
    .get(checkAuthentication, sectorController.getSectors)
    .post(uploads, sectorController.postSector);

router
    .route("/:sectorId")
    .get(checkAuthentication, sectorController.getSectorById)
    .post(sectorController.deleteSector);

// updated routes
router
    .route("/update/:sectorId")
    .get(sectorController.getUpdatePage)
    .post(uploads, sectorController.updateSector)

// router
//     .route("/delete")
//     .post(sectorController.deleteSector);

module.exports = router;
