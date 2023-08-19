const express = require("express")
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route")
const bookRouter = require("./routes/book.route")

const app = express()
app.use(express.json());


app.use("/users", userRouter)
app.use("/books", bookRouter)
const connect = async()=>{
    try {
        await mongoose.connect(
            "mongodb+srv://ka5452488:mongodb123@cluster0.10yjjlt.mongodb.net/users?retryWrites=true&w=majority"
        );
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
}

const PORT = 4000;
app.listen(PORT, async()=>{
    await connect();
    console.log(`server is running on the port ${PORT}`)
})