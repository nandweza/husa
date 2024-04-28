exports.getWhoWeAre = async (req, res) => {
    try {
        res.render("who-we-are");
    } catch (error) {
        console.log(error);
    }
};

