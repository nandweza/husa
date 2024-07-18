const multer = require('multer');

const Storage = multer.diskStorage({
    destination: "./public/uploads",
    videoname: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: Storage }).single('video');

module.exports = upload;
