const express = require('express');
const router = express.Router();
const {sanitizer,getResult}=require('../libs/core');
const patientdataController = require('../controllers/patient-data.controller');
const {errorMap} = require('../libs/app-translate-fa');
const {checkLoginUser} = require('../middlewares/app.controller.middleware')

router.post('/getPatientListByPartCode',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'partCode': sanitizer.sanitize(req.body.partCode),
            'token':token
        }
        response = await  patientdataController.getPatientListByPartCode(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.post('/getAllPatientList',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'token':token
        }
        response = await  patientdataController.getAllPatientList(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.post('/searchPatientData',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'admitCode':sanitizer.sanitize(req.body.admitCode),
            'pCode':sanitizer.sanitize(req.body.pCode),
            'fName':sanitizer.sanitize(req.body.fName),
            'lName':sanitizer.sanitize(req.body.lName),
            'token':token
        }
        response = await  patientdataController.searchPatientData(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

module.exports=router;