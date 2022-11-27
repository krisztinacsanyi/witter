module.exports = function (objRepo) {
    const {userModel, postModel} = objRepo
    return (req, res, next) => {
        return next()
    }
}