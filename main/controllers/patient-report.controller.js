const patientReportService=require('../services/patient-report.service');
const {getResult}=require('../libs/core');
const {verifyToken}=require('./token.controller');
const {errorMap} = require('../libs/app-translate-fa');

async function getSurgeryReoprtByPaperIntCode(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientReportService.getSurgeryReoprtByPaperIntCode(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('errGetSurgeryReport').errCode,errorMap.get('errGetSurgeryReport').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('errGetSurgeryReport').errCode,err.toString(),null);
    }      
    return result;
}

// async function getLabReportForChartByAdmitCode(req){
//     let result= {};
//     let token = req.token;
//     try{        
//         if(token){
//             let tokenResult = await verifyToken(token);
//             if(!tokenResult.isError){
//                 let respons=await patientReportService.getLabReportForChartByAdmitCode(req);
//                 if(respons){
//                     result = getResult(false,errorMap.get('noError').errCode,null,respons);
//                 }else{
//                     result = getResult(true,errorMap.get('errGetLabReportForChart').errCode,errorMap.get('errGetLabReportForChart').err,null);
//                 }
//             }else{
//                 result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
//             }
//         }else{
//             result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
//         }             
//     }catch(err){
//         result =  getResult(true,errorMap.get('errGetLabReportForChart').errCode,err.toString(),null);
//     }      
//     return result;
// }

async function getDocSummaryData(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientReportService.getDocSummaryData(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('errGetDocSummary').errCode,errorMap.get('errGetDocSummary').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('errGetDocSummary').errCode,err.toString(),null);
    }      
    return result;
}

async function saveSurgeryReport(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientReportService.saveSurgeryReport(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('saveSurgeryReport').errCode,errorMap.get('saveSurgeryReport').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('saveSurgeryReport').errCode,err.toString(),null);
    }      
    return result;
}

async function saveDocSummaryData(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientReportService.saveDocSummaryData(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('saveDocSummaryData').errCode,errorMap.get('saveDocSummaryData').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('saveDocSummaryData').errCode,err.toString(),null);
    }      
    return result;
}

async function getPatientPatoReportByPaperIntCode(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await patientReportService.getPatientPatoReportByPaperIntCode(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('getPatientPatoReportByPaperIntCode').errCode,errorMap.get('getPatientPatoReportByPaperIntCode').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('getPatientPatoReportByPaperIntCode').errCode,err.toString(),null);
    }      
    return result;
}
module.exports={
    getSurgeryReoprtByPaperIntCode,
    getPatientPatoReportByPaperIntCode,
    // getLabReportForChartByAdmitCode,
    getDocSummaryData,
    saveSurgeryReport,
    saveDocSummaryData,
}