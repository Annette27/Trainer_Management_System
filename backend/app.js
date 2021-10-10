const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path"); 
//const multer = require("multer");
const jwt = require('jsonwebtoken');
const LoginData = require('./src/models/LoginData')
//const LoginRoutes = require('./routes/login');

mongoose.connect("mongodb+srv://userone:userone@libraryfiles.o5pxy.mongodb.net/TRAINERMANGEMENT?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});

const NewApplData =require('./src/models/NewAppl')


var app = new express();
// app.use("/images", express.static(path.join("backend/images"))); 
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());

//app.use('/login',LoginRoutes);

username="admin@gmail.com"
password="Admin@123"

// var Storage=multer.diskStorage({
//     destination:"./public/images/",
//     filename:(req,file,cb)=>{
//         cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
//     }
// });
// var upload = multer({ 
//     storage:Storage
//  }).single('image')

function verifyToken(req,res,next){
    if(!req.headers.authorization){
      return res.status(401).send("unauthorised request")
    }
  let token = req.headers.authorization.split('')[1]
  if(token=='null'){
    return res.status(401).send("unauthorised request")
  }
  let payload=jwt.verify(token,'secretkey')
  console.log(payload)
  if(!payload){
    return res.status(401).send("unauthorised request")
  }
  req.userId=payload.subject
  next()
  }



app.post('/login',function(req,res){

    let userData=req.body

    if(username === userData.uname && password === userData.password){
        let payload = {subject:username+password}
        let token = jwt.sign(payload,'secretKey')
        res.status(200).send({token});
        // console.log("success")
        
  }
  else{
    LoginData.findOne({email:userData.uname})
    .then((data)=>{
        
        if(data==null){
        let error ="Invalid User";
        res.send({error})
        }
        else if(data.password===userData.password){
            let payload = {subject:username+password}
            let token1 = jwt.sign(payload,'secretKey')
            res.status(200).send({token1});
            // console.log("success")
        }
    
    else{
        let error ="Invalid User";
        res.send({error})
        
    }
    
        })
    }
})
    
//     if(username != userData.uname){
//       res.status(401).send("invalid username")
//     }else if(password != userData.password){
//       res.status(401).send("invalid password")
//    }else{

//     let payload = {subject:username+password};
//     let token = jwt.sign(payload,'secretkey');
//   res.status(200).send({token})
//     }






 app.get('/id',function(req,res){
     NewApplData.findOne().sort({id:-1})
     .then((data)=>{
        if(data.id){
          let idnew = data.id;
            var num=   idnew.slice(-2)
            let  id1=parseInt(num);
            id2= id1 + 1
            if(id2<10){
            id2= `0`+`${id2}`
            }
            let id=`TR`+`${id2}`
       
            res.send({id})
          }
           else{
            id="TR01"
            console.log("error")
            res.send({id}) 
           }

     })
     
   
  
 })
// sign up of new applicants
app.post('/newappl',function(req,res){
   
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
     NewAppl=
        {
            name: req.body.trainer.name,
            email: req.body.trainer.email,
            phone: req.body.trainer.phone,
            address: req.body.trainer.address,
            highestQualification: req.body.trainer.highestQualification,
            skillSet: req.body.trainer.skillSet,
            companyName: req.body.trainer.companyName,
            designation: req.body.trainer.designation,
            course: req.body.trainer.course,
            id: req.body.trainer.id,
            password: req.body.trainer.password,
            image: req.body.trainer.image,
            imagepath: req.body.trainer.imagepath
        }
        let trainerData = req.body  
        var trainer = {
                 
            email:req.body.trainer.email,
                      
           }   
        //    checking with admins mail id
        if(username === trainer.email){
            let error ="User Already exists";
           
            res.send({error})
            
        }
        // checking in database of new applicants
        else{
            NewApplData.findOne({email: trainer.email})  
        .then((data)=>{
            
            if(data==null){
                var newAppl = new NewApplData( NewAppl);
                newAppl.save();
                    let error ="new User";
                    res.status(200).send({error});
            }
            else{
            
                let error ="User Already exists";
               
                res.send({error}) 
            }
            
        })
      
    }

  
});

app.listen(3000,()=>{
    console.log(`Listening to port 3000`)
})