module.exports = function (objRepo) {
    const { postModel, userModel } = objRepo
    return (req, res, next) => {
        posts = postModel.find()
        for (let i = 0; i < posts.length; i++) {
            const user = userModel.findOne({
                id: posts[i].user_id
            })
            posts[i]['userid'] = user.id
            posts[i]['username'] = user.username
            posts[i]['profilepic'] = user.profilepic
        }
        res.locals.posts = posts
        return next()
    }
}