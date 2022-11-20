| Title | Path | Description | 
| - | - | - |
| Main page | / | Main page for Witter. All posts can be seen on the screen, with their titles, body and last save timestamp. The user's profile pic and its username is visible as well. You can either log in or navigate to a user's profile.  |
| User profile | /profile/:userid | A person's profile.  The user's profile pic and its username is visible, as well as their posts (titles, body and last save timestamp) |
|  |  |  |
| Registration | /register | Register with a username, email address, and password. Each username must be unique. The user must enter their password twice, and must accept the privacy policy. They can also go back to the main page or go to Login.  |
| Login | /login | Login with a username and password. You can navigate to the main page, to Registration or Forgot password. |
| Forgot password | /forgotpw | Add an email address where we can send an email regarding the forgot password. We will send a link to the New password page. You can navigate to the main page or to Login. |
| New password | /newpw/:username/:secret | The page needs a username and the user's secret. The username is visible on the page. Enter a new password twice, then save it. You can navigate to the main page or to Login. |
|  |  |  |
| Main page (logged in) | / | It's basically same as before, but two things change: the header and the user's own post are editable. The header now contains the following links: New post, Profile and logout. |
| User profile (logged in) | /profile/:userid | It's basically same as before, but the header changes: it now contains the following links: New post, Profile and logout. |
| Profile | /profile | Contains the posts of the user, which can be edited or deleted. We can also see the username and the profile picture. We can go to Profile settings from here. |
| Profile settings | /settings | Here we can change the following details: e-mail, password, profile picture. If the inputs do not change, we do not save (& change) them. We can confirm or cancel (go back to Profile page). |
| Edit a post | /post/:id/edit/ | We can edit an existing post (title and body). We can confirm or cancel (go back to main page). We also update the last_saved value. |
| New post | /post/new/ | We can add a new post (with title and body). We can confirm or cancel (go back to main page). We set the last_saved value to the current timestamp. |