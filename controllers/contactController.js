exports.getContact = async (req, res) => {
    try {
        res.render("contact");
    } catch (error) {
        console.log(error);
    }
};
