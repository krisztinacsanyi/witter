module.exports = function (objRepo) {
    const { userModel, bcrypt } = objRepo
    return (req, res, next) => {
        if (typeof req.body.username == 'undefined'
            && typeof req.body.password == 'undefined') {
            return next()
        }
        const user = userModel.findOne({
            username: req.body.username.trim()
        })
        if (!user) {
            res.locals.errors = res.locals.errors || []
            res.locals.errors.push('User not found')
            return next()
        }
        const iscorrect =  bcrypt.compareSync(req.body.password, user.password)
        if(!iscorrect){
            res.locals.errors = res.locals.errors || []
            res.locals.errors.push('Wrong password')
            return next()
        }
        req.session.userid = user.id
        return req.session.save(err => {
            if (err) {
                return next(err)
            }
            return res.redirect('/')
        })
    }
}