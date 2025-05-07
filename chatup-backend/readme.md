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

# Things i did
--> i added random name generator to make username