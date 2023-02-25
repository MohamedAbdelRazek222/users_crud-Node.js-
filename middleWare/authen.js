
const jwt=require('jsonwebtoken')
const userModel = require('../DB/model/User')
const ErrorHandler = require('../utils/errorHandler')

const roles={

Admin:'admin',
User:'user'
}


const authen=(accessRoles)=>{

return async (req, res,next)=>{

const headerToken=req.headers.authorization

if(!headerToken.startsWith(`${process.env.HeaderToken} `)){


return next(new ErrorHandler('Invalid header token',401))

}else{

const token=headerToken.split(' ')[1]
const decoded=jwt.verify(token,process.env.loginToken)

if(!decoded || !decoded.isLogged){
    

return next(new ErrorHandler('invalid token',401))


}else{

const findUser=await userModel.findOne({_id:decoded._id}).select('role userName email')

if(!findUser){

return next(new ErrorHandler('invalid account id',401))


}else{

if(!accessRoles.includes(findUser.role)){


    return next(new ErrorHandler('not authorized',401))


}
req.user=findUser
next()
}
}
}
}
}


module.exports = {authen,roles}