const Sector = require("../models/Sector");
const Post = require("../models/Blog");

exports.getAdminPage = async (req, res) => {
    try {
        const sectorCount = await Sector.countDocuments();
        const postCount = await Post.countDocuments();

        if (req.user.isAuthenticated) {
            res.render("admin", { sectorCount, postCount });
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.log(error);
    }
}
