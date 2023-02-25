const endPoint = require('../../endPoint/end.Point')
const { authen } = require('../../middleWare/authen')
const { validation } = require('../../middleWare/Validation')
const { signUpValidation, signInValidation, forgetPasswordValidation, sendCodeValidation } = require('./auth.Validation')
const { signup, login, logout, confirmEmail, sendCode, forgetPassword } = require('./controller/registeration')

const router = require('express').Router()


router.post('/signup',validation(signUpValidation),signup)
router.post('/login',validation(signInValidation),login)
router.patch('/logout',authen(endPoint.user.logOut),logout)
router.get('/confirmEmail/:token',confirmEmail)
router.post('/sendCode',validation(sendCodeValidation),sendCode)
router.post('/forgetPassword',validation(forgetPasswordValidation),forgetPassword)







module.exports=router





