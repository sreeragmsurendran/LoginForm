const jwt = require("jsonwebtoken")

module.exports=(req,res,next)=>{
    try {
        const token=req.headers["x-access-token"];

        if(!token){
            return res.send("Access Denied");
        }
        const decoded= jwt.verify(token,process.env.JWTPRIVATEKEY)
        req.user=decoded
      
        next()
    } catch (error) {
        res.send("error occured")
    }
}