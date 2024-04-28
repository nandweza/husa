exports.getBlogPage = async (req, res) => {
    try {
        res.render("blog");
    } catch (error) {
        console.log(error);
    }
}
