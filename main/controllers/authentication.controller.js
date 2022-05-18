const {sanitizer,signData,getResult,hasValue, jwt}= require('../libs/core');
const authService=require('../services/authentication.service');
const {verifyToken} = require('../controllers/token.controller');
const {errorMap} = require('../libs/app-translate-fa');
require('dotenv').config();

async function registerUser(req){
    let result={};
    try{      
        if(hasValue(req.userName) && hasValue(req.password)){
            if(!hasValue(req.personalCode)){
                req.personalCode=0;
            }
            req.userName= req.userName;
            req.password=signData(sanitizer.sanitize(req.password));
            req.personalCode =req.personalCode;
            req.rollCode =req.rollCode;

            let tokenResult =await verifyToken(req.token);
            if(!tokenResult.isError){
                let userExists = await authService.checkUserExists(req);
                if(userExists.rowsAffected[0]===0){
                    let response = await authService.registerUser(req);
                    if(hasValue(response)){
                        if(response.ErrorMessageToken){
                            result=getResult(true,response.number,response.message,'');               
                        }else{
                            if(response.rowsAffected[0]>0){
                                result=getResult(false,errorMap.get('noError').errCode,'',errorMap.get('noError').err);    
                            }else{
                                result=getResult(true,errorMap.get('errNotInserted').errCode,errorMap.get('errNotInserted').err,'');   
                            }
                        }
                    }else{
                        result=getResult(true,errorMap.get('errRegisterUser').errCode,errorMap.get('errRegisterUser').err,'');  
                    }  
                }else{
                    result=getResult(true,errorMap.get('errUserExists').errCode,errorMap.get('errUserExists').err,'');  
                }
            }else{
                result=tokenResult;
            }
        }else{
            result=getResult(true,errorMap.get('errHasNotValue').errCode,errorMap.get('errHasNotValue').err,'');  
        }          
    }catch(err){
        result=getResult(true,errorMap.get('errRegisterUser').errCode,err.toString(),'');  
    }
    return result;
}

async function getLoginUserData(req){
    let result={};
    try{
        if(hasValue(req.userName) && hasValue(req.password)){
            req.userName= sanitizer.sanitize(req.userName);
            req.password=sanitizer.sanitize(req.password);

            let tokenResult =await verifyToken(req.token);
            if(!tokenResult.isError){
                let userData = await authService.getLoginUserData(req); 
                if(userData.rowsAffected[0]>0){
                    let hasPassword = userData.recordset[0].Password.toString();
                    let password=jwt.verify(hasPassword,process.env.PRIVATE_KEY).data;
    
                    if(req.password===password){
                        let id=userData.recordset[0].ID;
                        let userName=userData.recordset[0].UserName;
                        let personalCode=userData.recordset[0].PersonalCode;
                        let rollCode=userData.recordset[0].RollCode;
                        let rollName=userData.recordset[0].RollName;

                        let finalUserData={
                            'id':id,
                            'UserName':userName,
                            'PersonalCode':personalCode,
                            'rollCode':rollCode,
                            'rollName':rollName,
                            'cudSign':signData({
                                'id':id,
                                'UserName':userName,
                                'PersonalCode':personalCode,
                                'rollCode':rollCode,
                                'rollName':rollName,
                                'token':req.token
                            })
                        }
                        let updateRequest={
                            'id':finalUserData.id,
                            'token':req.token
                        }
        
                        let userDataUpdated = await authService.updateCurrentUserToken(updateRequest) 
                        if(userDataUpdated){
                            result=getResult(false,errorMap.get('noError').errCode,'',finalUserData);
                        }else{
                            result=getResult(true,errorMap.get('updateCurrentUserToken').errCode,errorMap.get('updateCurrentUserToken').err,'');   
                        }
                        
                    }else{
                        result=getResult(true,errorMap.get('errHasNotValue').errCode,errorMap.get('errHasNotValue').err,'');
                    }                
                }else{
                    result=getResult(true,errorMap.get('errHasNotValue').errCode,errorMap.get('errHasNotValue').err,'');
                }
            }else{
                result=tokenResult;
            }
        }
    }catch(err){
        result=getResult(true,errorMap.get('errRegisterUser').errCode,err.toString(),'');  
    }
    return result;
}

async function getLoginUserDataByToken(token){
    let result={};
    try{
        if(hasValue(token)){
            let tokenResult =await verifyToken(token);
            if(!tokenResult.isError){
              
                let userData = await authService.getLoginUserDataByToken(token); 
                
                if(userData){
                    let id=userData.ID;
                    
                    if(id){
                        result=getResult(false,errorMap.get('noError').errCode,'',id);
                    }else{
                        result=getResult(true,errorMap.get('errHasNotValue').errCode,errorMap.get('errHasNotValue').err,'');
                    }                
                }else{
                    result=getResult(true,errorMap.get('errHasNotValue').errCode,errorMap.get('errHasNotValue').err,'');
                }
            }else{
                result=tokenResult;
            }
        }
    }catch(err){
        result=getResult(true,errorMap.get('errRegisterUser').errCode,err.toString(),'');  
    }
    return result;
}

async function getCurrentUser(req){
    let result={};
    try{        
        if(hasValue(req.cudSign)){
            let currentUserresult =await jwt.verify(req.cudSign,process.env.PRIVATE_KEY).data;
            if(currentUserresult){                  
                let respose =currentUserresult;
                result = getResult(false,errorMap.get('noError').errCode,null,respose);

            }else{
                result =  getResult(true,errorMap.get('getCurrentUser').errCode,errorMap.get('getCurrentUser').err,null);    
            }
        }
    }catch(err){
        result=getResult(true,errorMap.get('getCurrentUser').errCode,err.toString(),'');  
    }
    
    return result;
}

module.exports={
    registerUser,
    getLoginUserData,
    getLoginUserDataByToken,
    getCurrentUser
}
