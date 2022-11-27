module.exports = function (objRepo) {
    const {userModel, saveToDatabase} = objRepo
    return (req, res, next) => {
        if (typeof req.body.email == 'undefined') {
            return next()
        }
        return next()
    }
}