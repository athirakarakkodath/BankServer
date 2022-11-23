//server Creation
//step1: import express using require method with in that give express set as constant
const express = require('express')


//import dataservice
const dataService = require('./service/dataService');


//import jwt token 
const jwt = require('jsonwebtoken');


//step2: create an app using the express
const app = express();

//to parse json from req body
app.use(express.json());

//step 3: create a port number
app.listen(3000, ()=>{
    console.log('listening on port 3000');
})

//application specific middleware
const middleware =(req,res,next)=>{
    console.log('application specific middleware');
    next();
}
app.use(middleware)

//Router specific middleware
const jwtMiddleware = (req,res,next)=>{
    try{
        const token=req.headers['x-access-token'];
        console.log("Router specific middleware");
        const data = jwt.verify(token,'superkey2022')
        console.log(data);
        next();
    }
    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:"please login first"
        })
    }
}

 






//step4: Resolving HTTP request
app.get('/',(req,res)=>{
    res.send("get method");
})



app.post('/',(req,res)=>{
    res.send("post method");
})

app.put('/',(req,res)=>{
    res.send("put method");
})

app.delete('/',(req,res)=>{
    res.send("delete method");
})

app.patch('/',(req,res)=>{
    res.send("patch method");
})


//API CALLS 
//login
//register
//deposit
//withdraw
//transaction



app.post('/register',(req,res)=>{
    console.log(req.body);
  dataService.register(req.body.acno,req.body.password,req.body.username)
 .then(result=>{
    res.status(result.statusCode).json(result)

 })
 
  
//  if(result){
//     res.send("successfully registered")

//  }
//  else{
//     res.send("user already registered")
//  }
 
 
});


//resolving login requsts


app.post('/login',(req,res)=>{
    console.log(req.body);
    const result=  dataService.login(req.body.acno,req.body.password);
    res.status(result.statusCode).json(result);
    
     });


app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
 const result =   dataService.deposit(req.body.acno,req.body.password,req.body.amount);
 res.status(result.statusCode).json(result)
});

app.post('/withdraw',(req,res)=>{
    console.log(req.body);
 const result =   dataService.withdraw(req.body.acno,req.body.password,req.body.amount);
 res.status(result.statusCode).json(result)
});
////resolving transaction requsts
app.post('/transaction',(req,res)=>{
    console.log(req.body);
 const result =   dataService.getTransaction(req.body.acno,req.body.password,req.body.amount);
 res.status(result.statusCode).json(result)
});