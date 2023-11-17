const mongoose=require('mongoose');
const emailValidator=require('email-validator')
const bcrypt=require('bcrypt')
const db_link='mongodb+srv://anandaashish512:Z8BEU9EQjUIx5Liv@cluster0.anltsdp.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => {
    console.error(err);
  });


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate:function(){
        return emailValidator.validate(this.email);
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 8,
    validate:function(){
      return  this.confirmPassword==this.password
  }
},
role:{
  type:String,
  enum:['admin','user','restaurantowner','deliveryboy'],
  default:'user'
},
profileImage:{
  type:String,
  default:'img/users/default.jpeg'
}


});
userSchema.pre('save',function(){
    console.log('before saving in db')
})
// userSchema.pre('save', async function() {
//     let salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
   
// });

userSchema.post('save',function(doc){
    console.log('after saving in db');
})
userSchema.pre('save',function(){
    this.confirmPassword=undefined;
});
const userModel = mongoose.model('userModel', userSchema);





// (async function createUser() {
//   try {
//     let user1 = {
//       name: 'Aashish',
//       email: 'piyushkumar789@gmail.com',
//       password: '12345678',
//       confirmPassword: '12345678'
//     };

//     let user2 = {
//       name: 'Ayush',
//       email: 'anandaayush512@gmail.com',
//       password: '12345689',
//       confirmPassword: '12345689'
//     };

//     let data1 = await userModel.create(user1);
//     let data2 = await userModel.create(user2);

//     console.log(data1);
//     console.log(data2);
//   } catch (error) {
//     console.error(error);
//   }
// })();
module.exports=userModel;