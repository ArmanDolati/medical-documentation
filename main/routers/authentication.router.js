const { response } = require('express');
const express = require('express');
const router = express.Router();
const authController= require('../controllers/authentication.controller');
const {generateToken} = require('../controllers/token.controller');
const {errorMap} = require('../libs/app-translate-fa');
const {getResult,sanitizer,jwt}=require('../libs/core');
const {checkLoginUser} = require('../middlewares/app.controller.middleware')

router.post('/getToken',(req,res)=>{
    let token =generateToken();    
    let response = {
        'token':token
    }    
    res.json(response);
});

router.post('/registerUser',async(req,res)=>{
    
    let response='';
    let bearerHeader = req.headers['authorization'];
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'userName': sanitizer.sanitize(req.body.userName),
            'password':sanitizer.sanitize(req.body.password),
            'personalCode':sanitizer.sanitize(req.body.personalCode),
            'rollCode':sanitizer.sanitize(req.body.rollCode),
            'token':token
        }
        
        response = await  authController.registerUser(requestData);   

        res.json(response);
    }else{
        response=response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.post('/login',async(req,res)=>{
   
    let response='';
    let bearerHeader = req.headers['authorization'];
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token= bearer[1]; 

        let requestData ={
            'userName': sanitizer.sanitize(req.body.userName),
            'password':sanitizer.sanitize(req.body.password),
            'token':token
        }
        response = await authController.getLoginUserData(requestData);
        res.json(response);
    }else{
        response=response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.get('/logout',async(req,res)=>{
    // SQL_LOCAL_DB_POOL.close();
    // SQL_HIS_DB_POOL.close();

    // console.log(SQL_HIS_DB_POOL)
    res.send("Success");
});

router.post('/getCurrentUser',checkLoginUser(),async(req,res)=>{
    let response='';
    let cudSign = req.body.cudSign;

    if(cudSign){
        let requestData ={
            'cudSign':cudSign,
        }
        response = await authController.getCurrentUser(requestData);
        res.json(response);
    }else{
        response=response=getResult(true,errorMap.get('getCurrentUser').errCode,errorMap.get('getCurrentUser').err,'');
        res.json(response);
    }
});

module.exports= router;