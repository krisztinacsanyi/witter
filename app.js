const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }));

const { initDatabase } = require('./services/database')

app.use(session({
    secret: 'sdfsdfsdfsdfAEWQETDSFGYDSASdg',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000
    }
}))
app.use('/uploads', express.static('uploads'))

app.use((err, req, res, next) => {
    console.error(err.stack)
    return res.status(500).send('Something broke on our end')
})

/**
 * Initialize database, then add the models to the router
 * @param cb 
 */
initDatabase((err, { userModel, postModel, saveToDatabase }) => {
    if (err) {
        return console.err(err)
    }
    require('./router/')(app, { userModel, postModel, saveToDatabase })
    app.listen(6002, function () {
        console.log('Running on port 6002')
    })
})