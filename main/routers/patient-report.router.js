const express = require('express');
const router = express.Router();
const {sanitizer,getResult}=require('../libs/core');
const patientReportController = require('../controllers/patient-report.controller');
const {errorMap} = require('../libs/app-translate-fa');
const {checkLoginUser} = require('../middlewares/app.controller.middleware')

router.post('/getSurgeryReoprtByPaperIntCode',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'paperIntCode': sanitizer.sanitize(req.body.paperIntCode),
            'token':token
        }
        response = await  patientReportController.getSurgeryReoprtByPaperIntCode(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

// router.post('/getLabReportForChartByAdmitCode',checkLoginUser(),async(req,res)=>{
//     let bearerHeader = req.headers['authorization'];
//     let response={};
//     if(bearerHeader){
//         let bearer = bearerHeader.split(' ');
//         let token = bearer[1];
//         let requestData ={
//             'admitCode': sanitizer.sanitize(req.body.admitCode),
//             'testCode':sanitizer.sanitize(req.body.testCode),
//             'testGroupCode':sanitizer.sanitize(req.body.testGroupCode),
//             'parentTestID':sanitizer.sanitize(req.body.parentTestID),
//             'token':token
//         }
//         response = await  patientReportController.getLabReportForChartByAdmitCode(requestData);
//         res.json(response);
//     }else{
//         response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
//         res.json(response);
//     }
// });

router.post('/getDocSummaryData',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'admitCode': sanitizer.sanitize(req.body.admitCode),
            'token':token
        }
        response = await  patientReportController.getDocSummaryData(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.post('/saveSurgeryReport',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'paperIntCode': sanitizer.sanitize(req.body.paperIntCode),
            'note1': sanitizer.sanitize(req.body.note1),
            'note2': sanitizer.sanitize(req.body.note2),
            'note3': sanitizer.sanitize(req.body.note3),
            'persCode': sanitizer.sanitize(req.body.persCode),
            'isNote1Right': sanitizer.sanitize(req.body.isNote1Right),
            'isNote2Right': sanitizer.sanitize(req.body.isNote2Right),
            'isNote3Right': sanitizer.sanitize(req.body.isNote3Right),
            'token':token
        }
        response = await  patientReportController.saveSurgeryReport(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.post('/saveDocSummaryData',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'admitCode': sanitizer.sanitize(req.body.admitCode),
            'disTypeCode': sanitizer.sanitize(req.body.disTypeCode),
            'disAdvice': sanitizer.sanitize(req.body.disAdvice),
            'cc': sanitizer.sanitize(req.body.cc),
            'finalDiag': sanitizer.sanitize(req.body.finalDiag),
            'procedures': sanitizer.sanitize(req.body.procedures),
            'clinicResult': sanitizer.sanitize(req.body.clinicResult),
            'diseaseProgress': sanitizer.sanitize(req.body.diseaseProgress),
            'disStatus': sanitizer.sanitize(req.body.disStatus),
            'persCode': sanitizer.sanitize(req.body.persCode),
            'token':token
        }
        response = await  patientReportController.saveDocSummaryData(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

router.post('/getPatientPatoReportByPaperIntCode',checkLoginUser(),async(req,res)=>{
    let bearerHeader = req.headers['authorization'];
    let response={};
    if(bearerHeader){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        let requestData ={
            'paperIntCode': sanitizer.sanitize(req.body.paperIntCode),
            'token':token
        }
        response = await  patientReportController.getPatientPatoReportByPaperIntCode(requestData);
        res.json(response);
    }else{
        response=getResult(true,errorMap.get('errTokenNotFound').errCode,errorMap.get('errTokenNotFound').err,'');
        res.json(response);
    }
});

module.exports=router;