exports.tutorAccess = (req, res) => {
    res.status(200).send("akses tutor");
};
exports.studentAccess =  (req, res) => {
    res.status(200).send("akses murid");
}