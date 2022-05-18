const{jwt,getResult,msSqlLocalDBConnectionPool,msSqlHisDBConnectionPool}=require('../libs/core');
const {errorMap} = require('../libs/app-translate-fa');
require('dotenv').config();

function generateToken(){
    let token =jwt.sign({
        'isTrust':true
    },process.env.PRIVATE_KEY,{expiresIn:'1h'});
    return token;
}

async function verifyToken(token){
    // await new Promise(resolve => setTimeout(resolve, 5000));
    let result={};
    let tokenResult={};
    try{
        tokenResult=jwt.verify(token,process.env.PRIVATE_KEY);
        if(tokenResult.isTrust){
            result=getResult(false,errorMap.get('noError').errCode,'',tokenResult);   
        }else{
            
            result=getResult(true,errorMap.get('errVerifyToken').errCode,            
            errorMap.get('errVerifyToken').err,'');   
        }
    }catch(err){

        result=getResult(true,errorMap.get('errVerifyToken').errCode,err.toString(),'');   
    }    
    return result;
}

module.exports ={
    generateToken,
    verifyToken,
}