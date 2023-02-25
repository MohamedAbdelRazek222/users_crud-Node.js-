const { default: mongoose } = require("mongoose");
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema({


userName:{
type:String,
required:true
},
email:{

    type:String,
    required:true,
    unique:true
 },
 password:{

    type:String,
    required:true,
   },
   age:{

    type:Number,
    required:true,
  },
  gender:{

 type:String,
 enum:['male','female'],
 default:'male',
    
    },
confirmEmail:{
type:Boolean,
default:false
    },
 role:{
type:String,
default:'user'
   },
   online:{

    type:Boolean,
    default:false
        },
    code:String 

},{timestamps:true})



userSchema.pre('save',async function(next){


this.password=await bcrypt.hash(this.password,parseInt(process.env.saltRounds))

next()


})

const userModel=mongoose.model('user',userSchema)

module.exports=userModel