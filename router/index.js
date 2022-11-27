const uuid = require('uuid')
const multer = require('multer')
const path = require('path')
const bcrypt = require('bcrypt')

const getLoggedinUserMW = require('../middleware/profile/getLoggedinUser')
const getUserDetailsMW = require('../middleware/profile/getUserDetails')
const getUserPostsMW = require('../middleware/profile/getUserPosts')

const authMW = require('../middleware/user-mgmt/auth')
const loginMW = require('../middleware/user-mgmt/login')
const registerMW = require('../middleware/user-mgmt/register')
const logoutMW = require('../middleware/user-mgmt/logout')
const forgotPWMW = require('../middleware/user-mgmt/forgotPW')
const newPWMW = require('../middleware/user-mgmt/newPW')
const modifyUserEmailMW = require('../middleware/user-mgmt/modifyUserEmail')
const modifyUserPicMW = require('../middleware/user-mgmt/modifyUserPic')

const deletePostMW = require('../middleware/posts/deletePost')
const getAllPostsMW = require('../middleware/posts/getAllPosts')
const getPostMW = require('../middleware/posts/getPost')
const modifyPostMW = require('../middleware/posts/modifyPost')
const newPostMW = require('../middleware/posts/newPost')

const render = require('../middleware/render')

module.exports = function (app, { userModel, postModel, saveToDatabase }) {
    const objRepo = {
        userModel,
        postModel,
        uuid,
        bcrypt,
        saveToDatabase
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
        loginMW(objRepo),
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
        getUserDetailsMW(objRepo),
        render(objRepo, 'main'))
    /**
    * User profile
    */
    app.get('profile/:userid',
        getLoggedinUserMW(objRepo),
        getUserPostsMW(objRepo),
        getUserDetailsMW(objRepo),
        render(objRepo, 'profile'))
    /**
    * My profile
    */
    app.get('profile',
        authMW(objRepo),
        getLoggedinUserMW(objRepo),
        getUserPostsMW(objRepo),
        getUserDetailsMW(objRepo),
        render(objRepo, 'my-profile'))
    /**
    * Profile settings
    */
    app.use('/settings',
        authMW(objRepo),
        getUserDetailsMW(objRepo),
        modifyUserEmailMW(objRepo),
        newPWMW(objRepo),
        modifyUserPicMW(objRepo),
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
    app.use('/post/:id/edit/',
        authMW(objRepo),
        newPostMW(objRepo),
        render(objRepo, 'post-edit'))
    /**
    * Delete post
    */
    app.post('/post/:id/edit/',
        authMW(objRepo),
        getPostMW(objRepo),
        deletePostMW(objRepo),
        render(objRepo, 'post-edit'))
}