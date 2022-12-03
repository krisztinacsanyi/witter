module.exports = function (objRepo) {
    const {postModel} = objRepo
    return (req, res, next) => {
        const post = postModel.findOne({
            id: req.params.id
        })
        res.locals.post = post
        return next()
    }
}