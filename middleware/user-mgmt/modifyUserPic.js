module.exports = function (objRepo) {
    const {userModel, saveToDatabase} = objRepo
    return (req, res, next) => {
        return next()
    }
}