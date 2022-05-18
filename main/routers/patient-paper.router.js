const express = require('express');
const router = express.Router();
const {sanitizer,getResult}=require('../libs/core');
const patientPaperController = require('../controllers/patient-paper.controller');
const {errorMap} = require('../libs/app-translate-fa');
const {checkLoginUser} = require('../middlewares/app.controller.middleware')

router.post('/getPatientPapersByAdmitCode',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'admitCode': sanitizer.sanitize(req.body.admitCode),
            'prgCode':sanitizer.sanitize(req.body.prgCode),
            'token':token
        }
        response = await  patientPaperController.getPatientPapersByAdmitCode(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

module.exports=router;