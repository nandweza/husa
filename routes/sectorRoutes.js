const express = require("express");
const sectorController = require("../controllers/sectorController");
const uploads = require("../middleware/imageUpload");

const router = express.Router();

router
    .route("/")
    .get(sectorController.getSector)
    .post(uploads, sectorController.postSector);

router
    .route("/:sectorId")
    .get(sectorController.getSectorById)
    .post(uploads, sectorController.updateSector)
 
router
    .route("/delete")
    .post(sectorController.deleteSector);

module.exports = router;
