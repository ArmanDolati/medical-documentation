const express = require('express');
const router = express.Router();
const {getResult,redisClient}=require('../libs/core');
const dashboardController = require('../controllers/dashboard.controller');
const {errorMap} = require('../libs/app-translate-fa');
const {checkLoginUser} = require('../middlewares/app.controller.middleware')


router.post('/getMainDashboard',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'token':token
        }
        response = await  dashboardController.getMainDashboard(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

module.exports=router;