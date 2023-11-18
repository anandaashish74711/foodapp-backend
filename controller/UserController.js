const userModel = require("../Models/UserModel");

module.exports.getUser = async function(req, res) {
    let id=req.params.id
    let user = await userModel.findById(id);
    if(user){
    res.json({user});
    }
    else{
        res.json({message:'user not found'})
    }
};


module.exports.updateUser = async function(req, res) {
    try{
    // console.log('req.body->', req.body);
    let id=req.params.id;
    let user=userModel.findById(id)
    let dataTOBeupdated = req.body;
    if(user){
        const keys=[];
        for(let key in dataTOBeupdated){
            keys.push(key);
        } 
        for(let i=0;i<keys.length;i++){
            user[keys[i]=dataTOBeupdated[keys[i]]]
        }
        const updatedData=await user.save();
    }
  
    res.json({
        message: "data updated successfully",
        data:user
    });
}
catch{
    res.json({
        message:"error"
    })

}
};

module.exports.deleteUser = async function(req, res) {
    try{
 let id=req.params.id;
 let user=await userModel.findbyIdAndDelete(id);
 if(!user){
    res.json({message:'user not found'})
 }
    res.json({
        message:"data has been deleted",
        data:user
    });
}
catch(err){
    res.json({
        message:err.message
    })
}
};


module.exports.getAllUser = async function(req, res) {
    try{
 let users=await userModel.find();
 if(users){
    res.json({
        message:'users retrieved',
        data:users
    })
    res.send("user id recieved")
 }
    }
 catch(err){
res.json({
    message:'not found'

})
 }
};

module.exports.setCookies = function(req,res){
    res.setHeader('Set-Cookies','isLoggedIn=true');
    res.cookie('isLoggedIn',true,{maxAge:1000*60*24,secure:true},{httpOnly:true});
    res.send('COOKIES has been set');
};

// module.exports.getCookies = function(req, res) {
//     res.send(req.headers.cookie);
// };
