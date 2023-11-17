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


module.exports.patchUser = async function(req, res) {
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
    }
    const userToUpdate = await userModel.findOne({ email: update.email });
    if (userToUpdate) {
        userToUpdate.name = update.name;
        await userToUpdate.save();
    }
    res.json({
        message: "data updated successfully"
    });
};

module.exports.deleteUser = async function(req, res) {
    let dataToBeDeleted = req.body;
    let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message:"data has been deleted",
        data:user
    });
};

// module.exports.getUserbyId = function(req, res) {
//     const userId = parseInt(req.params.username);
//     console.log(req.params);
//     res.send("user id recieved");
// };

module.exports.setCookies = function(req,res){
    res.setHeader('Set-Cookies','isLoggedIn=true');
    res.cookie('isLoggedIn',true,{maxAge:1000*60*24,secure:true},{httpOnly:true});
    res.send('COOKIES has been set');
};

module.exports.getCookies = function(req, res) {
    res.send(req.headers.cookie);
};
