module.exports = function (objRepo) {
    const { userModel, saveToDatabase, bcrypt, uuid } = objRepo
    return (req, res, next) => {
        if (typeof req.body.username == 'undefined'
            && typeof req.body.email == 'undefined'
            && typeof req.body.pwd == 'undefined'
            && typeof req.body.pwd2 == 'undefined'
            && typeof req.body.pp == 'undefined') {
            return next()
        }
        if (req.body.pwd != req.body.pwd2) {
            res.locals.errors = res.locals.errors || []
            res.locals.errors.push('Passwords do not match')
            return next()
        }
        const user = userModel.findOne({
            username: req.body.username.trim()
        })
        if(user) {
            res.locals.errors = res.locals.errors || []
            res.locals.errors.push('Username exists')
            return next()
        }
        const hash = bcrypt.hashSync(req.body.pwd, 12)
        try {
            userModel.insert({
                id: uuid.v4(),
                username: req.body.username,
                email: req.body.email.trim().toLowerCase(),
                profilepic: '',
                password: hash,
                secret: uuid.v4()
            })
        } catch (error) {
            return next()
        }
        return saveToDatabase(err => {
            if (err) {
                return next(err)
            }
            return res.redirect('/login')
        })
    }
}