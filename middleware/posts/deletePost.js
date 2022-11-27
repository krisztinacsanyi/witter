module.exports = function (objRepo) {
    const {postModel, saveToDatabase} = objRepo
    return (req, res, next) => {
        return next()
    }
}