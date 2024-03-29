/**
 * Save a new password, update user
 * @param {*} objRepo 
 * @returns 
 */
module.exports = function (objRepo) {
    const { userModel, saveToDatabase, bcrypt } = objRepo
    return (req, res, next) => {
        res.locals.username = req.params.username
        if (typeof req.body.pwd1 == 'undefined' && typeof req.body.pwd2 == 'undefined') {
            return next()
        }
        let user = userModel.findOne({
            username: req.params.username,
            secret: req.params.secret
        })
        console.log(user)
        if (!user) {
            res.locals.errors = res.locals.errors || []
            res.locals.errors.push('User not found')
            return next()
        }
        if (req.body.pwd != req.body.pwd2) {
            res.locals.errors = res.locals.errors || []
            res.locals.errors.push('Passwords do not match')
            return next()
        }
        const hash = bcrypt.hashSync(req.body.pwd, 12)
        try {
            user.password = hash
            console.log(user)
            userModel.update(user)
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