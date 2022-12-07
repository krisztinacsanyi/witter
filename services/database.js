const loki = require('lokijs')
let db = false
/** 
 * 
 * Post
 * - id (string uuid)
 * - user_id (string uuid)
 * - title (varchar 60 chars)
 * - body (varchar 280 chars)
 * - last_saved (datetime YYYY-MM-DD hh:mm:ss)
 * 
 * User
 * - id (string uuid)
 * - username (string)
 * - email (string)
 * - password (string somehow encryted)
 * - profilepic (string path to image)
 * 
 * Like
 * - id (string uuid)
 * - post_id
 * - user_id
*/

/**
 * Initialize database
 * @param cb 
 */
function initDatabase(cb) {
    console.log('Initialize database')
    db = new loki('database.db')
    db.loadDatabase({}, err => {
        if (err) {
            return cb(err)
        }
        let userModel = db.getCollection('user')
        let postModel = db.getCollection('post')
        if (userModel === null) {
            userModel = db.addCollection('user', {
                indices: ['id', 'username'],
                unique: ['username']
            })
        }
        if (postModel === null) {
            postModel = db.addCollection('post', ['id'])
        }
        db.saveDatabase(err => {
            if (err) {
                return cb(err)
            }
            console.table(postModel.find())
            console.table(userModel.find())
            return cb(undefined, {
                userModel, postModel, saveToDatabase: (cb) => {
                    console.log('Saving database.')
                    db.saveDatabase(cb)
                }
            })
        })
    })
}

module.exports.initDatabase = initDatabase