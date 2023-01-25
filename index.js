require("dotenv").config()
const express=require("express")
const cors=require("cors")
const connect=require("./config/db")
const PORT=process.env.PORT
const ShortUrl=require("./src/shorturl.router")

const app=express();
app.use(express.json())
app.use(cors())


app.use("/",ShortUrl)

app.listen(PORT,async()=>{
    try{
        await connect()
    }
    catch(e){
        console.log(e.message)
    }
    console.log(`listening at http://localhost:${PORT}`)
})