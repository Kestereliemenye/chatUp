WILL DELETE THIS READ ME FILE UPON APP COMPLETION
# For cleaner codespace
/server
  /controllers
    authController.js       // contains loginUser, signupUser
  /routes
    authRoutes.js           // defines /login and /signup endpoints
  /models
    userModel.js            // defines User schema (if using Mongoose)
server.js                   // entry point only sets up the app

# the main colors
#D266DD
#6A0070

# 
The controller dir contains all the server end points 
the models contains the database config 
the public is empty for now
The routes contains the endpoints and the routes assigned to is that the frontend will call
The utils contains the token config

# Things i did 07/5/2025
--> i added random name generator to make username

# Things i did 08/5/2025
--> I made bio and user name editable and it svaes to db 
completed

# Things i should do next
--> Make isediting work only after fetch is succesful
-->Upload profile picture
-->go and learn the basic of bloging ie
 how to see multiple users
 how to chat with multiple users
 how to send request
 how to post and uplaod to database
