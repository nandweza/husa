exports.getAdminPage = async (req, res) => {
    try {
        res.render("admin");
    } catch (error) {
        console.log(error);
    }
}
