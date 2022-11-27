module.exports = function (objRepo) {
    const {postModel, saveToDatabase, uuid} = objRepo
    return (req, res, next) => {
        return next()
    }
}