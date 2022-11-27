module.exports = function (objRepo, template) {
    return (req, res, next) => {
        return res.render(template, res.locals);
    }
}