const express = require("express")
const port = 7000
const cookieParser = require("cookie-parser")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:3000", // allows requests from react
        methods: "GET,POST,PUT",//Allow these http methods
        allowedHeaders:["Content-type", "Authorization"],//allow this header
        credentials:true
    })
)
// use auth routes
app.use("/api/auth", authRoutes)




app.listen(port, () => {
    console.log(`Node.js server is running on http://localhost${port}`);
    
})