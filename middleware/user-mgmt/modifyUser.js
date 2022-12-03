module.exports = function (objRepo) {
    const {saveToDatabase, bcrypt } = objRepo
    return (req, res, next) => {
        if (typeof req.body.email == 'undefined'
            && typeof req.body.pwd1 == 'undefined'
            && typeof req.body.pwd2 == 'undefined'
            && typeof req.body.picture == 'undefined') {
            return next()
        }
        if (req.body.email !== "" && res.locals.user.email != req.body.email) {
            res.locals.user.email = req.body.email
        }
        if (req.body.pwd1 !== "" && req.body.pwd2!=="") {
            if (req.body.pwd1 != req.body.pwd2) {
                res.locals.errors = res.locals.errors || []
                res.locals.errors.push('Passwords do not match')
                return next()
            }
            const hash = bcrypt.hashSync(req.body.pwd1, 12)
            res.locals.user.password = hash
        }
        if (typeof req.file !== 'undefined'){
            res.locals.user.profilepic = req.file.filename
        }
        return saveToDatabase(err => {
            if (err) {
                return next(err)
            }
            return res.redirect('/')
        })
    }
}