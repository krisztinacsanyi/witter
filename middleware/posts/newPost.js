/**
 * Add a new post
 * @param {*} objRepo 
 * @returns 
 */
module.exports = function (objRepo) {
    const { postModel, saveToDatabase, uuid, moment } = objRepo
    return (req, res, next) => {
        if (typeof req.body.title == 'undefined'
            && typeof req.body.text == 'undefined') {
            return next()
        }
        try {
            postModel.insert({
                id: uuid.v4(),
                user_id: res.locals.user.id,
                title: req.body.title,
                body: req.body.text,
                last_saved: moment().format('YYYY-MM-DD HH:mm:ss')
            })
        } catch (error) {
            return next()
        }
        return saveToDatabase(err => {
            if (err) {
                return next(err)
            }
            return res.redirect('/')
        })
    }
}