const express = require('express');
const userRouter = express.Router();


const path = require('path');
const userModel = require(path.join(__dirname, './Models/UserModel'));


userRouter
    .route('/')
    .get(getUsers)
    .post(postUser)
    .patch(patchUser)
    .delete(deleteUser);

// userRouter
//     .route('/:id')
//     .get(getUserbyId);

   
    userRouter
     .route('/getCookies')
     .get(getCookies); 

     userRouter
     .route('/setCookies')
     .get(setCookies); 

  


     async function getUsers(req, res) {
        let user = await userModel.findOne({ name: 'Ayush' });
      
      res.json({message:'list of all users',
      data:user})
          // res.send(users);
      };
      
      function postUser(req, res) {
          console.log(req.body);
          if (Array.isArray(req.body)) {
              users = users.concat(req.body);
          } else {
              users.push(req.body);
          }
          res.json({
              message: "data received successfully",
              user: req.body
          });
      };
      
      async function patchUser(req, res) {
          console.log('req.body->', req.body);
          const update = req.body;
          const userToUpdate = await userModel.findOne({ email: update.email });
          if (userToUpdate) {
              userToUpdate.name = update.name;
              await userToUpdate.save();
          }
          res.json({
              message: "data updated successfully"
          });
      };
      
      
      
      
      
      async function deleteUser(req, res) {
         let dataToBeDeleted=req.body;
         let user=await userModel.findOneAndDelete(dataToBeDeleted);
         res.json({
          message:"data has been deleted",
          data:user
         })
      };

      function getUserbyId(req, res) {
        const userId = parseInt(req.params.username);
        console.log(req.params);
        res.send("user id recieved");
    };

    function setCookies(req,res){
        res.setHeader('Set-Cookies','isLoggedIn=true');
        res.cookie('isLoggedIn',true,{maxAge:1000*60*24,secure:true,httpOnly:true});
        
        res.send('COOKIES has been set');
        }
        function getCookies(req, res) {
            res.send(req.headers.cookie);
        }

        module.exports=userRouter;