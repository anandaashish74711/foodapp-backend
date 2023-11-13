
function protectRoute(req,res,next){
    if(req.cookies.isLoggedIn){
        next()
    }else{
        res.json({
            message:'Operation not allowed'
        })
    }
   
    }
    module.exports=protectRoute;