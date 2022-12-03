const uuid = require('uuid')
const bcrypt = require('bcrypt')
const moment = require('moment')
const path = require('path')
const multer = require('multer')

const getLoggedinUserMW = require('../middleware/profile/getLoggedinUser')
const getUserPostsMW = require('../middleware/profile/getUserPosts')
const getUserByIdMW = require('../middleware/profile/getUserById')

const authMW = require('../middleware/user-mgmt/auth')
const loginMW = require('../middleware/user-mgmt/login')
const registerMW = require('../middleware/user-mgmt/register')
const logoutMW = require('../middleware/user-mgmt/logout')
const forgotPWMW = require('../middleware/user-mgmt/forgotPW')
const newPWMW = require('../middleware/user-mgmt/newPW')
const modifyUserMW = require('../middleware/user-mgmt/modifyUser')

const deletePostMW = require('../middleware/posts/deletePost')
const getAllPostsMW = require('../middleware/posts/getAllPosts')
const getPostMW = require('../middleware/posts/getPost')
const modifyPostMW = require('../middleware/posts/modifyPost')
const newPostMW = require('../middleware/posts/newPost')

const uploadMW = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            return cb(null, `./uploads`)
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname).toLowerCase();
            return cb(null, `${req.res.locals.user.id}-${Date.now()}-pic${ext}`)
        }
    })
})

const render = require('../middleware/render')

module.exports = function (app, { userModel, postModel, saveToDatabase }) {
    const objRepo = {
        userModel,
        postModel,
        uuid,
        bcrypt,
        saveToDatabase,
        moment
    }
    /**
    * Login
    */
    app.use('/login',
        loginMW(objRepo),
        render(objRepo, 'login'))
    /**
    * Register
    */
    app.use('/register',
        registerMW(objRepo),
        render(objRepo, 'register'))
    /**
    * Logout
    */
    app.get('/logout', logoutMW(objRepo))
    /**
    * Forgot password
    */
    app.use('/forgotpw',
        forgotPWMW(objRepo),
        render(objRepo, 'forgotpw'))
    /**
    * New password
    */
    app.use('/newpw/:username/:secret',
        newPWMW(objRepo),
        render(objRepo, 'newpw'))
    /**
     * Main page
     */
    app.get('/',
        getLoggedinUserMW(objRepo),
        getAllPostsMW(objRepo),
        render(objRepo, 'main'))
    /**
    * User profile
    */
    app.get('/profile/:userid',
        getUserByIdMW(objRepo),
        getUserPostsMW(objRepo),
        render(objRepo, 'profile'))
    /**
    * My profile
    */
    app.get('/profile',
        authMW(objRepo),
        getLoggedinUserMW(objRepo),
        getUserPostsMW(objRepo),
        render(objRepo, 'my-profile'))
    /**
    * Profile settings
    */
    app.use('/settings',
        authMW(objRepo),
        getLoggedinUserMW(objRepo),
        uploadMW.single('picture'),
        modifyUserMW(objRepo),
        render(objRepo, 'settings'))
    /**
    * Edit post
    */
    app.use('/post/:id/edit/',
        authMW(objRepo),
        getPostMW(objRepo),
        modifyPostMW(objRepo),
        render(objRepo, 'post-edit'))
    /**
    * New post
    */
    app.use('/post/new/',
        authMW(objRepo),
        getLoggedinUserMW(objRepo),
        newPostMW(objRepo),
        render(objRepo, 'post-new'))
    /**
    * Delete post
    */
    app.use('/post/:id/delete/',
        authMW(objRepo),
        getPostMW(objRepo),
        deletePostMW(objRepo))
}