const patientOrderService=require('../services/patient-order.service');
const {getResult}=require('../libs/core');
const {verifyToken}=require('./token.controller');
const {errorMap} = require('../libs/app-translate-fa');

async function savePatientDoctorInstruction(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientOrderService.savePatientDoctorInstruction(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('savePatientDoctorInstruction').errCode,errorMap.get('savePatientDoctorInstruction').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('savePatientDoctorInstruction').errCode,err.toString(),null);
    }      
    return result;
}

async function getPatientDoctorInstruction(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientOrderService.getPatientDoctorInstruction(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('getPatientDoctorInstruction').errCode,errorMap.get('getPatientDoctorInstruction').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('getPatientDoctorInstruction').errCode,err.toString(),null);
    }      
    return result;
}

async function updatePatientDoctorInstruction(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientOrderService.updatePatientDoctorInstruction(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('updatePatientDoctorInstruction').errCode,errorMap.get('updatePatientDoctorInstruction').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('updatePatientDoctorInstruction').errCode,err.toString(),null);
    }      
    return result;
}

async function savePatientDoctorOrderService(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientOrderService.savePatientDoctorOrderService(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('savePatientDoctorOrderService').errCode,errorMap.get('savePatientDoctorOrderService').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('savePatientDoctorOrderService').errCode,err.toString(),null);
    }      
    return result;
}

async function getPatientDoctorOrderService(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientOrderService.getPatientDoctorOrderService(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('getPatientDoctorOrderService').errCode,errorMap.get('getPatientDoctorOrderService').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('getPatientDoctorOrderService').errCode,err.toString(),null);
    }      
    return result;
}

async function updatePatientDoctorOrderService(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientOrderService.updatePatientDoctorOrderService(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('updatePatientDoctorOrderService').errCode,errorMap.get('updatePatientDoctorOrderService').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('updatePatientDoctorOrderService').errCode,err.toString(),null);
    }      
    return result;
}

async function deletePatientDoctorOrderService(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientOrderService.deletePatientDoctorOrderService(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('deletePatientDoctorOrderService').errCode,errorMap.get('deletePatientDoctorOrderService').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('deletePatientDoctorOrderService').errCode,err.toString(),null);
    }      
    return result;
}


module.exports={
    savePatientDoctorInstruction,
    getPatientDoctorInstruction,
    updatePatientDoctorInstruction,
    savePatientDoctorOrderService,
    getPatientDoctorOrderService,
    updatePatientDoctorOrderService,
    deletePatientDoctorOrderService
}