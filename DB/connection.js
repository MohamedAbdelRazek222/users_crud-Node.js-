const mongoose=require('mongoose');



const connectDB=()=>{


return mongoose.connect(process.env.CONNECT).then((res)=>{console.log("connect....");}).catch((err)=>{console.log("error connected");})


}

module.exports = {connectDB}
