

const dataMethod=['body','query','params','file','headers']
const catchAsyncErrors = require('../middleWare/catchAsyncError')
const ErrorHandler = require('../utils/errorHandler')


const validation=(schema)=>{


return catchAsyncErrors(async(req,res,next)=>{

    const validationErr=[]
    dataMethod.forEach((key)=>{

if(schema[key]){


const validationRes=schema[key].validate(req[key],{abortEarly:false})

if(validationRes.error){
    console.log({l:validationRes.error})
validationErr.push(validationRes.error.details)
}

}
    })


if(validationErr.length>0){

return next(new ErrorHandler('validation err',401))


}else{


next()

}

})


}

module.exports ={validation}