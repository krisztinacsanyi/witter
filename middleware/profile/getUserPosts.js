module.exports = function (objRepo) {
    const { postModel } = objRepo
    return (req, res, next) => {
        const posts = postModel.find({
            user_id: res.locals.user.id
        })
        for (let i = 0; i < posts.length; i++) {
            posts[i]['userid'] = res.locals.user.id
            posts[i]['username'] = res.locals.user.username
            posts[i]['profilepic'] = res.locals.user.profilepic
        }
        res.locals.posts = posts
        return next()
    }
}