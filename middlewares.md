## Middlewares

### getLoggedinUser
Get the currently logged in user from the session. This is also used to determine which header to show, or to enable editing the user's own posts from the main page

## getAllPosts
Get all posts (title, body, last saved)

## getUserDetails
This returns the username and the profile pic of a user with a specific id

## getUserPosts
Get the posts of a user by id

## render
Renders a page

## register
Check if the username or the email is taken. Checks if all the fields are filled. Register if everything is alright; save the password with some kind of encrytion

## login
Checks if all the fields are filled. Check if the username password combo matches (decrypt password here). If everything is alright, save the user to the session

## forgotPW
Checks if the username is valid, then send the new password link to the email address

## newPW
Change the user's password if the username and secret combo matches

## logout
Logout (delete session)

## auth
Used for pages that are only meant to be visible, if a user is logged in. Redirect to login, if no permission to visit

## modifyUserEmail
Modifies the user's email

## modifyUserPic
Saves (the image) and modifies the user's profile picture

## getPost
Get a specific post by id and return it's data (title, text, last save date)

## deletePost
Get a specific post by id and delete it

## modifyPost
Checks if all the fields are filled, then saves the modified data

## newPost
Checks if all the fields are filled, then saves the new data

| Path | Type | Middlewares |
| - | - | - |
| / | GET | getLoggedinUser, getAllPosts, getUserDetails, render |
| /profile/:userid | GET | getLoggedinUser, getUserPosts, getUserDetails, render |
|  |  |  |
| /register | GET | render |
| /register | POST | register, login |
| /login | GET | render |
| /login | POST | login |
| /forgotpw | GET | render | 
| /forgotpw | POST | forgotPW | 
| /newpw/:username/:secret | GET | render |
| /newpw/:username/:secret | POST | newPW |
| /logout | GET | logout |
|  |  |  |
| /profile | GET | auth, getLoggedinUser, getUserPosts, getUserDetails, render |
| /settings | GET | auth, render |
| /settings | POST | auth, getUserDetails, modifyUserEmail, newPW, modifyUserPic |
| /post/:id/edit/ | GET | auth, render |
| /post/:id/edit/ | POST | auth, getPost, modifyPost |
| /post/:id/delete | POST | auth, getPost, deletePost |
| /post/new/ | GET | auth, render |
| /post/new/ | POST | auth, newPost |
