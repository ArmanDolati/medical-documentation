const express = require('express');
const router = express.Router();
const {sanitizer,getResult}=require('../libs/core');
const patientServiceController = require('../controllers/patient-service.controller');
const {errorMap} = require('../libs/app-translate-fa');
const {checkLoginUser} = require('../middlewares/app.controller.middleware')

router.post('/getSurgeryServicesByPaperIntCode',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'paperIntCode':sanitizer.sanitize( req.body.paperIntCode),
            'token':token
        }
        response = await  patientServiceController.getSurgeryServicesByPaperIntCode(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.post('/getAllServicesByPaperIntCode',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'paperIntCode': sanitizer.sanitize(req.body.paperIntCode),
            'token':token
        }
        response = await  patientServiceController.getAllServicesByPaperIntCode(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.post('/getLabGroupsByAdmitCode',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'admitCode':sanitizer.sanitize( req.body.admitCode),
            'token':token
        }
        response = await  patientServiceController.getLabGroupsByAdmitCode(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.post('/getLabTestsByAdmitCode',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'admitCode': sanitizer.sanitize(req.body.admitCode),
            'parentCode':sanitizer.sanitize(req.body.parentCode),
            'token':token
        }
        response = await  patientServiceController.getLabTestsByAdmitCode(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.post('/getLabResultsByAdmitCode',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'admitCode': sanitizer.sanitize(req.body.admitCode),
            'parentCode': sanitizer.sanitize(req.body.parentCode),
            'testCode': sanitizer.sanitize(req.body.testCode),
            'testGroupCode': sanitizer.sanitize(req.body.testGroupCode),
            'token':token
        }
        response = await  patientServiceController.getLabResultsByAdmitCode(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.post('/getLabTestsWithResultByAdmitCode',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response=[];
    let labResult=[];
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];

        let reqTests={
            'admitCode': sanitizer.sanitize(req.body.admitCode),
            'parentCode':sanitizer.sanitize(req.body.parentCode),
            'token':token
        }
        let reqResults ={
            'admitCode': sanitizer.sanitize(req.body.admitCode)
        }

        let resTests =await patientServiceController.getLabTestsByAdmitCode(reqTests);
        if(!resTests.isError){
            let resResults = await patientServiceController.getAllLabResultsByAdmitCode(reqResults);
        
            for(let test of resTests.result){
                let  itemResult=resResults.result
                                .filter(f=>f.TCode==test.TestCode &&
                                        f.TGroupCode==test.TestGroupCode &&
                                        f.GCode==test.ParentCode &&
                                        f.AdmCode==test.AdmCode)  ;
                let testData={
                    'TestCode':test.TestCode,
                    'TestName':test.TestName,
                    'TestGroupCode':test.TestGroupCode,
                    'TestParentCode':test.ParentCode,
                    'TestResult':itemResult
                }
                labResult.push(testData);
            }
        }
        response={
            "isError": resTests.isError,
            "errorCode":resTests.errorCode,
            "errorMsg":resTests.errorMsg,
            "result":labResult
        };

        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

module.exports=router;