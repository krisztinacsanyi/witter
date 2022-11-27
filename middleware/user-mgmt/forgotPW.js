module.exports = function (objRepo) {
    const { userModel, saveToDatabase } = objRepo
    return (req, res, next) => {
        if (typeof req.body.username == 'undefined') {
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
        console.log(`Copy and paste to change your password: /newpw/${user.username}/${user.secret}`)
        return next()
    }
}