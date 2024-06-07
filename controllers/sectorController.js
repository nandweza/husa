const Sector = require("../models/Sector");
const filename = require("../middleware/imageUpload");
const path = require("path");
const fs = require("fs");

// return all sectors
exports.getSector = async (req, res) => {
    try {
        res.render("sectors");
    } catch (error) {
        console.log(error);
    }
};

// get all sectors
exports.getSectors = async (req, res) => {
    try {
        const sectors = await Sector.find().sort({ createdAt: -1 });
        res.status(200).json({ sectors })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// return one sector by id
exports.getSectorById = async (req, res) => {
    try {
        const { sectorId } = req.params;
        const sector = await Sector.findOne({ _id: sectorId });

        res.status(200).json({ sector });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong"});
    }
}


// post a sector
exports.postSector = async (req, res) => {
    try {
        const { title, content } = req.body;
        const img = req.file && req.file.filename ? req.file.filename : '';

        if (!title || !content) {
            res.status(403);
        }

        const sector = new Sector({ title, content, img });
        await sector.save()
        res.status(201).json({ message: "Success", sector });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// update sector by id
exports.updateSector = async (req, res) => {
    try {
        const { sectorId } = req.params;
        const { title, content } = req.body;
        const img = req.file ? req.file.filename : undefined;

        try {
            await Sector.updateOne({ _id: sectorId }, { title, content, img });
            res.status(200).json({ message: "Updated Sector Successfully..." });
        } catch (updateError) {
            console.log(updateError);
            res.status(500).json({ message: "Something went wrong"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong"});
    }
}

// delete sector
exports.deleteSector = async (req, res) => {
    try {
        const sectorId = req.body.deleteBtn;

        const sector = await Sector.findById(sectorId);

        if (!sector) {
            res.status(404).json({ message: "Sector Not Found" });
        }

        // delete the sector image in the uploads directory
        if (sector.img) {
            const imgPath = path.join(__dirname, "../public/uploas", sector.img);
            fs.unlinkSync(imgPath);
        }

        //delete sector from the database
        await Sector.findByIdAndDelete(sectorId);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong"});
    }
}
