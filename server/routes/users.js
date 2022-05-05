const { validate, User } = require('../models/users');
const Router =require('express')
const router = Router();
const bcrypt =require('bcrypt')


router.post("/",async(req,res)=>{
try {
   
    const {error}= validate(req.body);
    
    
    if(error){
        return res.status(400).send({message:error.details[0].message})
    }
    const user= await User.findOne({email:req.body.email})
  
    if(user){
        return res.status(409).send({message:"Already you have an account with this email"})
    }
    const salt=await bcrypt.genSalt(Number(process.env.SALT))
    
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    console.log(hashPassword)
    await new User({...req.body,password:hashPassword}).save();
    res.status(200).send({message:"User created successfully"})
} catch (error) {
    console.log(error)
    res.status(500).send({message:"Internal Server Error"});
}
})
module.exports =router