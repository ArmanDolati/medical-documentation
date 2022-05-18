const patientDataService=require('../services/patient-data.service');
const {getResult}=require('../libs/core');
const {verifyToken}=require('./token.controller');
const {errorMap} = require('../libs/app-translate-fa');

async function getPatientListByPartCode(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientDataService.getPatientListByPartCode(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('errGetPatientList').errCode,errorMap.get('errGetPatientList').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('errGetPatientList').errCode,err.toString(),null);
    }      
    return result;
}

async function getAllPatientList(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientDataService.getAllPatientList();
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('errGetPatientList').errCode,errorMap.get('errGetPatientList').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('errGetPatientList').errCode,err.toString(),null);
    }      
    return result;
}

async function searchPatientData(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientDataService.searchPatientData(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('errSearchPatientData').errCode,errorMap.get('errSearchPatientData').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('errSearchPatientData').errCode,err.toString(),null);
    }      
    return result;
}

module.exports={
    getPatientListByPartCode,
    getAllPatientList,
    searchPatientData,
}