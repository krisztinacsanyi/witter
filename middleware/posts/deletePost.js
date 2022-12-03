module.exports = function (objRepo) {
    const {postModel, saveToDatabase} = objRepo
    return (req, res, next) => {
        console.log(postModel)
        postModel.remove(res.locals.post)
        console.log(postModel)
        return saveToDatabase(err => {
            if (err) {
                return next(err)
            }
            return res.redirect('/')
        })
    }
}