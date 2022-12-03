module.exports = function (objRepo) {
    const { saveToDatabase, moment } = objRepo
    return (req, res, next) => {
        if (typeof req.body.title == 'undefined'
            && typeof req.body.text == 'undefined') {
            return next()
        }
        res.locals.post.title = req.body.title
        res.locals.post.body = req.body.text
        res.locals.post.last_saved = moment().format('YYYY-MM-DD HH:mm:ss')
        return saveToDatabase(err => {
            if (err) {
                return next(err)
            }
            return res.redirect('/')
        })
    }
}