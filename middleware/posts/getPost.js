module.exports = function (objRepo) {
    const {postModel} = objRepo
    return (req, res, next) => {
        return next()
    }
}