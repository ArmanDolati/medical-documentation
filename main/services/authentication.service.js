const {msSql,msSqlConfig}=require('../libs/core');

const checkUserExists = async(req)=>{

    const result =await SQL_LOCAL_DB_POOL.request()
        .input('userName',msSql.NVarChar,req.userName)
        .query('SELECT ID FROM UserList WHERE UserName=@userName');
        
        return result;
}

const registerUser = async(req)=>{  
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('userName',msSql.NVarChar,req.userName)
    .input('password',msSql.VarBinary,new Buffer.from(req.password))
    .input('personalCode',msSql.Int,req.personalCode)
    .input('rollCode',msSql.TinyInt,req.rollCode)
    .query(`INSERT INTO UserList(UserName,Password,PersonalCode,RollCode) 
            VALUES (@userName,@password,@personalCode,@rollCode)`);
    return result;            
}

const getLoginUserData=async(req)=>{       
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('userName',msSql.NVarChar,req.userName)
    .query(`SELECT  Id, UserName, Password, PersonalCode, CurrentToken, 
                    RollCode,UserRollList.Name RollName
            FROM    UserList ,UserRollList
            WHERE   UserList.RollCode =UserRollList.Code
            AND     UserName=@userName`);
    return result;    
}

const updateCurrentUserToken=async(req)=>{
    
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('id',msSql.Int,req.id)
    .input('token',msSql.NVarChar,req.token)
    .query(`UPDATE  UserList 
            SET CurrentToken=@token
            WHERE ID=@id
            
            SELECT ID
            FROM UserList WHERE ID=@id`);

    return result.recordsets[0];    
}

const getLoginUserDataByToken=async(token)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
        .input('token',msSql.NVarChar,token)
        .query(`SELECT ID
                FROM UserList WHERE CurrentToken=@token`);
        return result.recordset[0];    
}


module.exports ={    
    registerUser,
    checkUserExists,
    getLoginUserData,
    getLoginUserDataByToken,
    updateCurrentUserToken
}