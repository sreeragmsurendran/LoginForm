require("dotenv").config();
const cors = require('cors');
const express = require('express')
const connection =require("./db")
const authRoute =require("./routes/auth");
const userRoute =require("./routes/users")


const app= express();
//database connection 
connection();
//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.get('/',(req,res)=>{
    res.send("Server Request");
})

const port =  5000;
app.listen(port,()=>console.log(`listening on port ${port}`))

