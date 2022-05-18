const {msSql,hisMsSqlConfig,hisMsSqlConfig2}=require('../libs/core');


const getPatientPapersByAdmitCode = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .input('admitCode',msSql.Int,req.admitCode)
    .input('prgCode',msSql.SmallInt,req.prgCode)
    .query(`SELECT	[Paper Code] AS PaperCode , [Paper Int Code] AS PaperIntCode , Date,
                    Name AS PaperDrName, Date2 ,Date3                            
            FROM	Paper,[Dr-List]
            WHERE	Code=[Doctor Code]
            AND 	[Prg Code]=@prgCode
            AND		[Adm Code]=@admitCode
            AND		[Sum Price]>0 `);                
    return result.recordsets[0];
}

module.exports = {
    getPatientPapersByAdmitCode
}