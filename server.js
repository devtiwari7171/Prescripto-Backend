import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000
connectCloudinary()

let isConnected = false

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
        isConnected = true
        console.log("Database Connected")
    } catch(error){
        console.error('Error connecting to Database:', error)
    }
}

app.use((req, res, next) => {
  if(!isConnected){
    connectDB()
  }
  next();
})

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

module.exports = app