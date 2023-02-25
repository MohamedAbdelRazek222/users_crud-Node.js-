const ErrorHandler = require("../../../utils/errorHandler")
const catchAsyncErrors = require('../../../middleWare/catchAsyncError')
const taskModel = require("../../../DB/model/Task")



const addTask=catchAsyncErrors(async(req, res,next)=>{

const {title,text}=req.body
    const task=taskModel({title,text,createBy:req.user._id})
    const taskSaved=await task.save()

    res.status(200).json({message:"Done",taskSaved})


})
const updateTask=catchAsyncErrors(async(req, res,next)=>{

const {title,text}=req.body
const {id}=req.params
 const taskUpdated=await taskModel.findOneAndUpdate({_id:id,createdBy:req.user._id},{title,text})


    res.status(200).json({message:"updated",taskUpdated})


})
const deleteTask=catchAsyncErrors(async(req, res,next)=>{

const {id}=req.params
 const taskUpdated=await taskModel.findOneAndDelete({_id:id,createdBy:req.user._id})


    res.status(200).json({message:"deleted"})


})
const viewTasks=catchAsyncErrors(async(req, res,next)=>{

 const tasks=await taskModel.find({})
    res.status(200).json({message:"done",tasks})


})



module.exports = {addTask,updateTask,deleteTask,viewTasks}