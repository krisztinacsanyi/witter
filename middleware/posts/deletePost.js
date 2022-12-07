/**
 * Delete a post
 * @param {*} objRepo 
 * @returns 
 */
module.exports = function (objRepo) {
    const {postModel, saveToDatabase} = objRepo
    return (req, res, next) => {
        postModel.remove(res.locals.post)
        return saveToDatabase(err => {
            if (err) {
                return next(err)
            }
            return res.redirect('/')
        })
    }
}