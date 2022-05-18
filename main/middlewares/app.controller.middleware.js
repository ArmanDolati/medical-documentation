const {errorMap} = require('../libs/app-translate-fa');
const {getResult, hasValue}=require('../libs/core');
const authController=require('../controllers/authentication.controller')


const checkLoginUser= ()=>async(req,res,next)=>{
    next()
    // let error={};
    // try{
    //     let bearerHeader = req.headers['authorization'];
        
    //     if(bearerHeader){
            
    //         let bearer = bearerHeader.split(' ');
    //         let token = bearer[1];
            
    //         let currentUser = await authController.getLoginUserDataByToken(token);             
    //         if(!currentUser.isError || currentUser.errCode!=errorMap.get('errNotLogin').err){
    //             if(hasValue(currentUser.result)){
    //                 next();
    //             }else{
    //                 res.status(403)
    //                 error = getResult(true,errorMap.get('errNotLogin').errCode,errorMap.get('errNotLogin').err,'');
    //                 res.json(error);
    //             }
    //         }else{               
    //             res.json(currentUser);
    //         }
    //     }else{
    //         error =  getResult(true,errorMap.get('errVerifyToken').errCode,errorMap.get('errVerifyToken').err,null);
    //         res.json(error);
    //     }        
    // }catch(err){
    //     throw err.toString();
    // }
}

module.exports ={
    checkLoginUser,
}