
module.exports = function (objRepo) {
    const { userModel, postModel } = objRepo
    return (req, res, next) => {
        const user = userModel.findOne({
            id: req.params.userid
        })
        res.locals.user = user
        return next()
    }
}