const fs = require("fs");
const path = require("path");
const filename = require("../middleware/imageUpload");
const Sector = require("../models/Sector");
const User = require("../models/User");

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
// const sanitizer = require('sanitize-html');

// Function to sanitize HTML content
function sanitizeHTML(content) {
    const window = (new JSDOM('')).window;
    const DOMPurify = createDOMPurify(window);
    return DOMPurify.sanitize(content);
}

// get all sectors
exports.getSectors = async (req, res) => {
    try {
        const sectors = await Sector.find().sort({ createdAt: -1 });

        if (req.user.isAuthenticated) {
            res.render("account-sectors", { sectors });
        } else {
            res.render("sectors", { sectors });
        }
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
        // console.log(sector.content);

        const sectors = await Sector.find();

        // res.status(200).json({ sector });
        if (req.user.isAuthenticated) {
            res.render("account-sector", { sector });
        } else {
            res.render("sector", { sector, sectors });
        }

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

        // const sector = new Sector({ title, content, img });
        // await sector.save()

        const sanitizedContent = sanitizeHTML(content);
        const newSector = new Sector({ title, content: sanitizedContent, img });
        await newSector.save();
        res.redirect("/admin");
        // res.status(201).json({ message: "Success", sector });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// get update page
exports.getUpdatePage = async (req, res) => {
    try {
        const { sectorId } = req.params;
        const getData = await Sector.findOne({ _id: sectorId });
        res.render('updateSector', { sector: getData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// update sector by id
// exports.updateSector = async (req, res) => {
//     try {
//         const { sectorId } = req.params;
//         const { title, content } = req.body;
//         const img = req.file ? req.file.filename : undefined;

//         try {
//             await Sector.updateOne({ _id: sectorId }, { title, content, img });
//             // res.status(200).json({ message: "Updated Sector Successfully..." });
//             res.redirect("/sectors");
//         } catch (updateError) {
//             console.log(updateError);
//             res.status(500).json({ message: "Something went wrong"});
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Something went wrong"});
//     }
// }

exports.updateSector = async (req, res) => {
    try {
        const { sectorId } = req.params;
        const { title, content } = req.body;
        const newImg = req.file ? req.file.filename : undefined;

        // Fetch the current sector data to get the existing image file name
        const sector = await Sector.findById(sectorId);
        if (!sector) {
            return res.status(404).json({ message: "Sector not found" });
        }

        const oldImg = sector.img;

        // If a new image is provided, delete the old image
        if (newImg && oldImg) {
            const oldImgPath = path.join(__dirname, '../uploads', oldImg);
            fs.unlink(oldImgPath, (err) => {
                if (err) {
                    console.log('Failed to delete old image:', err);
                } else {
                    console.log('Old image deleted successfully');
                }
            });
        }

        // Update the sector data
        sector.title = title;
        sector.content = content;
        if (newImg) {
            sector.img = newImg;
        }

        await sector.save();
        res.redirect("/sectors");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// delete sector
exports.deleteSector = async (req, res) => {
    try {
        const sectorId = req.body.deleteBtn;
  
        // Find the course by courseId
        const sector = await Sector.findById(sectorId);
  
        if (!sector) {
            return res.status(404).json({ message: 'Sector not found' });
        }
  
        // Delete associated images in the uploads dir
        if (sector.img) {
            const imgPath = path.join(__dirname, '../public/uploads', sector.img);
            fs.unlinkSync(imgPath);
        }
  
        // Remove the course from the database
        await Sector.findByIdAndDelete(sectorId);
  
        res.redirect("/sectors");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
