const express = require('express');
const router = express.Router();
const {getResult, sanitizer,jalaliTodyDateTime, hasValue, checkHasKeyJsonObject}=require('../libs/core');
const patientOrderController = require('../controllers/patient-order.controller');
const {errorMap} = require('../libs/app-translate-fa');
const {checkLoginUser} = require('../middlewares/app.controller.middleware')


router.post('/savePatientDoctorInstruction',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
       
        let requestData ={
            'admitCode': sanitizer.sanitize(req.body.admitCode),
            'instruction': sanitizer.sanitize(req.body.instruction),
            'comment': sanitizer.sanitize(req.body.comment),
            'actionDate': jalaliTodyDateTime(),
            'createDate':jalaliTodyDateTime(),
            'actionPersonalCode':sanitizer.sanitize(req.body.personalCode),
            'createdPersonalCode':sanitizer.sanitize(req.body.personalCode),
            'token':token
        }
        response = await  patientOrderController.savePatientDoctorInstruction(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.post('/getPatientDoctorInstruction',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'admitCode': sanitizer.sanitize(req.body.admitCode),
            'token':token
        }
        response = await  patientOrderController.getPatientDoctorInstruction(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.put('/updatePatientDoctorInstruction',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1]; 

        let requestData ={
            'id': sanitizer.sanitize(req.body.id),
            'instruction': sanitizer.sanitize(req.body.instruction),
            'comment': sanitizer.sanitize(req.body.comment),
            'actionDate': jalaliTodyDateTime(),
            'actionPersonalCode':sanitizer.sanitize(req.body.personalCode),
            'token':token
        }
        response = await  patientOrderController.updatePatientDoctorInstruction(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.post('/savePatientDoctorOrderService',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
      
        let requestData ={
            'admitCode': sanitizer.sanitize(req.body.admitCode),
            'serviceIntCode': sanitizer.sanitize(req.body.serviceIntCode),
            'serviceCode': sanitizer.sanitize(req.body.serviceCode),
            'serviceName': sanitizer.sanitize(req.body.serviceName),
            'numOrDose': sanitizer.sanitize(req.body.numOrDose),
            'frequency': sanitizer.sanitize(req.body.frequency),
            'comment': sanitizer.sanitize(req.body.comment),
            'programCode':sanitizer.sanitize(req.body.programCode),
            'actionDate': jalaliTodyDateTime(),
            'createDate':jalaliTodyDateTime(),
            'actionPersonalCode':sanitizer.sanitize(req.body.personalCode),
            'createdPersonalCode':sanitizer.sanitize(req.body.personalCode),
            'token':token
        }
        response = await  patientOrderController.savePatientDoctorOrderService(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.post('/getPatientDoctorOrderService',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
       
        let requestData ={
            'admitCode': sanitizer.sanitize(req.body.admitCode),
            'programCode':sanitizer.sanitize(req.body.programCode),
            'token':token
        }
        response = await  patientOrderController.getPatientDoctorOrderService(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.put('/updatePatientDoctorOrderService',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];

        let requestData ={
            'id': sanitizer.sanitize(req.body.id),
            'serviceIntCode': sanitizer.sanitize(req.body.serviceIntCode),
            'serviceCode': sanitizer.sanitize(req.body.serviceCode),
            'serviceName': sanitizer.sanitize(req.body.serviceName),
            'numOrDose': sanitizer.sanitize(req.body.numOrDose),
            'frequency': sanitizer.sanitize(req.body.frequency),
            'comment': sanitizer.sanitize(req.body.comment),
            'programCode': sanitizer.sanitize(req.body.programCode),
            'actionDate': jalaliTodyDateTime(),
            'actionPersonalCode':sanitizer.sanitize(req.body.personalCode),
            'token':token
        }
        response = await  patientOrderController.updatePatientDoctorOrderService(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.post('/deletePatientDoctorOrderService',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        
        let requestData ={
            'id': sanitizer.sanitize(req.body.id),
            'actionDate': jalaliTodyDateTime(),
            'actionPersonalCode':sanitizer.sanitize(req.body.personalCode),
            'programCode': sanitizer.sanitize(req.body.programCode),
            'token':token
        }
        response = await  patientOrderController.deletePatientDoctorOrderService(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});
module.exports=router;