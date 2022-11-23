//DataBase Integration-steps

//1.Server mongodb connection
   //1.1) import mongoose from package.json

   const mongoose = require('mongoose');


//2.State connection string via mongoose
// mongoose.connect('mongodb://localhost:27017/BankServer', () => {
//     console.log("Mongo connected");
// });
mongoose.connect('mongodb://localhost:27017/BankServer',{
    useNewUrlParser:true
    //to avoid warnings
});


//3.Define bank db model

const User = mongoose.model('User',{


    //schema
    acno:Number,
    username:String,
    password:Number,
    balance:0,
    transaction:[]
})


module.exports={
    User
}

