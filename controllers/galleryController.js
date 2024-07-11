const multer = require("multer");
const path = require("path");
const fs = require("fs")
const filename = require("../middleware/imageUpload");
const Gallery = require("../models/Gallery");

//get gallery
exports.getPictures = async (req, res) => {
    try {
        const pics = await Gallery.find().sort({ createdAt: -1 });

        if (req.user.isAuthenticated) {
            res.render("account-gallery", { pics });
        } else {
            res.render("gallery", { pics });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong"});
    }
}

//post new picture to the gallery
exports.uploadPicture = async (req, res) => {
    try {
        const { content } = req.body;
        const img = req.file.filename;

        if (!content ) {
            res.status(500).json({ message: "Something went wrong" });
        }

        const pic = new Gallery({ content, img });
        await pic.save()
        // res.status(201).json({ pics });
        res.redirect("/gallery");

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// delete picture
exports.deletePicture = async (req, res) => {
    try {
        const picId = req.body.deleteBtn;
  
        // Find the picture by Id
        const pic = await Gallery.findById(picId);
  
        if (!pic) {
            return res.status(404).json({ message: 'Picture not found' });
        }
  
        // Delete associated images in the uploads dir
        if (pic.img) {
            const imgPath = path.join(__dirname, '../public/uploads', pic.img);
            fs.unlinkSync(imgPath);
        }
  
        // Remove the picture from the database
        await Gallery.findByIdAndDelete(picId);
  
        res.redirect("/gallery");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
