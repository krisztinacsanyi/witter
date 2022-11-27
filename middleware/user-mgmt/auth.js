module.exports = function (objRepo) {
    return (req, res, next) => {
        if (typeof req.session.userid === 'undefined') {
            return res.redirect('/login')
        }
        return next()
    }
}