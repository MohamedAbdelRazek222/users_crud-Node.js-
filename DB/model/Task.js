const { default: mongoose } = require("mongoose")


const taskSchema=new mongoose.Schema({
title:String,
text:String,
createBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true

},

},{timestamps:true})



const taskModel=mongoose.model('task',taskSchema)


module.exports=taskModel