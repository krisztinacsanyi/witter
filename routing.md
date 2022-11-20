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
| Main page (logged in) | / |  |
| User profile (logged in) | /profile/:userid |  |
| My profile | /profile |  |
| Profile settings | /settings |  |
| Edit a post | /post/:id/edit/ |  |
| New post | /post/new/ |  |