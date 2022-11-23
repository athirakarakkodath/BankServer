//import jwt
const jwt = require('jsonwebtoken')

//import db.js
const db = require('./db.js')

userDetails = {//object of objects
  1000: { acno: 1000, username: 'Jees', password: 1000, balance: 1000, transaction: [] },
  1001: { acno: 1000, username: 'Amal', password: 1001, balance: 1000, transaction: [] },
  1002: { acno: 1000, username: 'Sarath', password: 1002, balance: 1000, transaction: [] }
}

const register =  (acno, username, password) =>{
  return db.User.findOne({acno})//port27017,backend port3000
  .then(user=>{
    if(user){
      return{
      statusCode: 401,
      status: false,
      message: 'user already registerd'
      }
    }
    else {
      const newUser= new db.user({
        acno,
        username,
        password,
        balance: 0,
        transaction: []
      }
  )
  newUser.save()
  return{
    statusCode: 200,
    status: true,
    message: 'successffully registerd'
  }
    }
  })
  
}
  


const login=(acno,pswd)=>{
    
  if(acno in userDetails){
    if(pswd=userDetails[acno]['password']){
      currentUser=userDetails[acno]['username']
      currentAcno=acno;
      //token generation
      const token = jwt.sign({currentAcno:acno},'superkey2022')
     
       return {
        statusCode:200,
        status:true,
        message:'login Success',
        currentAcno,
        currentUser,
        token
       }
    }
    else{
      return {
        statusCode:401,
        status:false,
        message:'Password Error'
      }
    }
  }
  else{
    return {
      statusCode:401,
      status:false,
      message:'Invalid user' 
     }
    }
  }

const deposit=(acno,pswd,amt)=>
{
  var amount=parseInt(amt);
  if(acno in userDetails){
    if(pswd=userDetails[acno]['password']){
      userDetails[acno]['balance']+=amount;
      userDetails[acno]['transaction'].push({
        type:'Credit',
        amount
      })
      console.log(userDetails);
      return {
        statusCode:200,
        status:true,
        message:`${amount} is credited and balance is ${userDetails[acno]['balance']}`

      }
    }
    else{
      
      return {
        statusCode:401,
        status:false,
        message:'invalid password'
      }
    }
  }

  else{
 
    return {
      statusCode:401,
      status:false,
      message:'invalid user details'
    }
  }

}
const withdraw=(acno,pswd,amt) => {
    var amount=parseInt(amt);
    if(acno in userDetails){
      if(pswd=userDetails[acno]['password']){
        if(userDetails[acno]['balance']>amount){
        userDetails[acno]['balance']-=amount;
        userDetails[acno]['transaction'].push({
          type:'Debit',
          amount
        })
        console.log(userDetails);
        return {
          statusCode:200,
          status:true,
          message:`${amount} is debited and balance is ${userDetails[acno]['balance']}`
  
        }
      }
    }
      else{
        return {
          statusCode:401,
          status:false,
          message:'invalid password'
        }
      }
    }
    else{
      return {
        statusCode:401,
        status:false,
        message:'invalid user details'
      }
    }

  }
  const getTransaction = (acno)=>{
    return  {
      statusCode:200,
      status:true,
      transaction:userDetails[acno]['transaction']

    }
  }



//export
module.exports = {
  register, 
  login,
  deposit,
  withdraw,
  getTransaction
}