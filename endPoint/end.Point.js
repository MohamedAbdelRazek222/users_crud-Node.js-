const { roles } = require("../middleWare/authen");


const endPoint={

user:{

    logOut:[roles.Admin,roles.User]

},
task:{
    task:[roles.Admin,roles.User]



}

}



module.exports = endPoint