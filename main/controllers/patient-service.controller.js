const patientServiceService=require('../services/patient-service.service');
const {getResult}=require('../libs/core');
const {verifyToken}=require('./token.controller');
const {errorMap} = require('../libs/app-translate-fa');
// const ResponsResult= require('../libs/result.class')

async function getSurgeryServicesByPaperIntCode(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientServiceService.getSurgeryServicesByPaperIntCode(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('errGetSurgeryServices').errCode,errorMap.get('errGetSurgeryServices').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('errGetSurgeryServices').errCode,err.toString(),null);
    }      
    return result;
}

async function getAllServicesByPaperIntCode(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientServiceService.getAllServicesByPaperIntCode(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('errGetPatientServices').errCode,errorMap.get('errGetPatientServices').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('errGetPatientServices').errCode,err.toString(),null);
    }      
    return result;
}

async function getLabGroupsByAdmitCode(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientServiceService.getLabGroupsByAdmitCode(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('errGetLabGroups').errCode,errorMap.get('errGetLabGroups').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('errGetLabGroups').errCode,err.toString(),null);
    }      
    return result;
}

async function getLabTestsByAdmitCode(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientServiceService.getLabTestsByAdmitCode(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result =getResult(true,errorMap.get('errGetLabTests').errCode,errorMap.get('errGetLabTests').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('errGetLabTests').errCode,err.toString(),null);
    }      
    return result;
}

async function getLabResultsByAdmitCode(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientServiceService.getLabResultsByAdmitCode(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('errGetLabResults').errCode,errorMap.get('errGetLabResults').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('errGetLabResults').errCode,err.toString(),null);
    }      
    return result;
}

async function getAllLabResultsByAdmitCode(req){
    let result= {};
    try{        
        let respons=await patientServiceService.getAllLabResultsByAdmitCode(req);
        if(respons){
            result = getResult(false,errorMap.get('noError').errCode,null,respons);
        }else{
            result = getResult(true,errorMap.get('errGetLabResults').errCode,errorMap.get('errGetLabResults').err,null);
        }          
    }catch(err){
        result =  getResult(true,errorMap.get('errGetLabResults').errCode,err.toString(),null);
    }      
    return result;
}

module.exports={
    getSurgeryServicesByPaperIntCode,
    getAllServicesByPaperIntCode,
    getLabGroupsByAdmitCode,
    getLabTestsByAdmitCode,
    getLabResultsByAdmitCode,
    getAllLabResultsByAdmitCode,
}