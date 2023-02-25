const endPoint = require('../../endPoint/end.Point')
const { authen } = require('../../middleWare/authen')
const { validation } = require('../../middleWare/Validation')
const { addTask, updateTask, deleteTask, viewTasks } = require('./controllers/task_crud')
const { addTaskValidation, updateTaskValidation, deleteTaskValidation } = require('./task.validation')


const router = require('express').Router()



router.post('/addTask',authen(endPoint.task.task),validation(addTaskValidation),addTask)
router.patch('/updateTask/:token',authen(endPoint.task.task),validation(updateTaskValidation),updateTask)
router.delete('/deleteTask/:token',authen(endPoint.task.task),validation(deleteTaskValidation),deleteTask)
router.get('/viewTasks',viewTasks)




module.exports =router
