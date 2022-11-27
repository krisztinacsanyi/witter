module.exports = function (objRepo) {
    const {userModel} = objRepo
    return (req, res, next) => {
        return next()
    }
}