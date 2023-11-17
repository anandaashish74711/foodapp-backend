const JWT_KEY='GHFVQERGFLEJCBFVEWJHCEDCNQEVUV'
const jwt=require('jsonwebtoken')
function protectRoute(req,res,next){
    if(req.cookies.login){
let isVerified=token.verify(req.cookies.login,JWT_KEY);
if (isVerified){
        next()
}else{
    res.json({
        message:"User is not Verified"
    })
}
    }else{
        res.json({
            message:'Operation not allowed'
        })
    }
   
    }
    module.exports=protectRoute;