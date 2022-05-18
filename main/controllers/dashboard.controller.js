const dashboardService=require('../services/dashboard.service');
const {getResult}=require('../libs/core');
const {verifyToken}=require('./token.controller');
const {errorMap} = require('../libs/app-translate-fa');

async function getMainDashboard(req){
    let result= {};
    let token = req.token;
    try{        
        if(token){
            let tokenResult = await verifyToken(token);
            if(!tokenResult.isError){
                let respons=await dashboardService.getMainDashboard(req);
                if(respons){
                    result = getResult(false,errorMap.get('noError').errCode,null,respons);
                }else{
                    result = getResult(true,errorMap.get('errGetMainDashboard').errCode,errorMap.get('errGetMainDashboard').err,null);
                }
            }else{
                result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
            }
        }else{
            result =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);    
        }             
    }catch(err){
        result =  getResult(true,errorMap.get('errGetMainDashboard').errCode,err.toString(),null);
    }      
    return result;
}



module.exports={
    getMainDashboard,
}