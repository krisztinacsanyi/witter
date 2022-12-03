module.exports = function (objRepo, template) {
    return (req, res, next) => {
        if (typeof req.query.redirect != 'undefined') {
            res.locals.redirect = req.query.redirect
        }
        return res.render(template, res.locals);
    }
}