/**
 * Get the currently logged in user
 * @param {*} objRepo 
 * @returns user, loggedId
 */
module.exports = function (objRepo) {
    const { userModel } = objRepo
    return (req, res, next) => {
        if (typeof req.session.userid === 'undefined') {
            return next()
        }
        const user = userModel.findOne({
            id: req.session.userid
        })
        res.locals.user = user
        res.locals.loggedId = user.id
        return next()
    }
}