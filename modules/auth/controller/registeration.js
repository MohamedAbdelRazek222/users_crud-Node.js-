const userModel = require("../../../DB/model/User")
const jwt=require('jsonwebtoken')
const catchAsyncErrors = require('../../../middleWare/catchAsyncError')

const bcrypt=require('bcrypt')
const sendEmail = require("../../../services/email.services")
const ErrorHandler = require("../../../utils/errorHandler")




const signup=catchAsyncErrors (async(req, res, next) =>{



    const {userName,email,password,age}=req.body
   
   
   const newUser=new userModel({userName,email,password,age})
   const savedUser=await newUser.save()
   
   const token=jwt.sign({_id:savedUser._id,isLogged:true},process.env.signUp,{expiresIn:5*60})
   const link=`${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}  `
   const link2=`${req.protocol}://${req.headers.host}/api/v1/auth/refreshEmail/${savedUser._id}  `
   const message=`<a href=${link}>plz confirm your email </a> <br> <a href=${link2}>resend confirmintion email </a>`
   sendEmail(savedUser.email,message)
   res.status(201).json({message:"done",savedUser})
   

})


const confirmEmail =catchAsyncErrors(async(req,res,next)=>{

    const {token}=req.params
    const decoded=jwt.verify(token,process.env.signUp)
if(!decoded){


    return next(new ErrorHandler('Invalid  token',401))


}else{

    const user=await userModel.findById(decoded._id).select('confirmEmail')

if(!user){

    return next(new ErrorHandler('invalid token id',401))

    
}else{

if(user.confirmEmail){
    return next(new ErrorHandler('you already confirmed ',401))



}else{
await userModel.findOneAndUpdate({_id:user.id},{confirmEmail:true})
res.status(200).json({message:" Done Please login"})

}
}
}

})

const login=catchAsyncErrors(async(req,res,next)=>{

 const {email,password}=req.body

 const user=await userModel.findOne({email})

if(!user){

    return next(new ErrorHandler('invalid email account',401))
    
    
}else{
    
    if(!user.confirmEmail){


        return next(new ErrorHandler('plz confirm u email first',401))
    }else{

        const match=await bcrypt.compare(password,user.password)
if(!match){


    return next(new ErrorHandler('email OR password not Match',401))

}else{

    const token=jwt.sign({_id:user._id,isLogged:true},process.env.loginToken,{expiresIn:'3h'})

    await userModel.findByIdAndUpdate({_id:user._id},{online:true})
    res.status(200).json({message:"login success",token})


}

    }
}

})


const logout = async (req, res) => {


    
    const user=await userModel.findByIdAndUpdate(req.user._id,{online:false})
    res.json({message:'Logout Done'})

    
    }

    
    
const sendCode=catchAsyncErrors(async(req,res,next)=>{

const {email}=req.body
const user=await userModel.findOne({email})

if(!user){
    res.status(404).json({message:"in-valid email"})
    return next(new ErrorHandler('in-valid email',404))

    }else{

 const code=Math.floor(Math.random()*(9999-1000+1)+1000)
await userModel.findByIdAndUpdate({_id:user._id},{code})
sendEmail(user.email,`<P>use this code to update u passowrd ${code} </p>`)
res.status(200).json({message:"done",code})

    }



})


const forgetPassword=catchAsyncErrors(async(req,res,next)=>{

 const {code,email,newpassword}=req.body
 const user=await userModel.findOne({email})
 if(!user){
    res.status(404).json({message:"in-valid email"})
    
    }else{
        if(user.code !=code){

            res.status(404).json({message:"in-valid code"})
            
                }else{


const hashPassword=await bcrypt.hash(newpassword,parseInt(process.env.saltRounds)) 
await userModel.findByIdAndUpdate({_id:user._id},{password:hashPassword,code:' '})
res.json({message:"done"})



                }
        

    }


})


module.exports={signup,confirmEmail,login,logout,forgetPassword,sendCode}