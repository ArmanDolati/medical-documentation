const { Int, NVarChar } = require('mssql');
const {msSql,hisMsSqlConfig,hisMsSqlConfig2, hasValue}=require('../libs/core');


const getPatientListByPartCode = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .input('partCode',msSql.Int,req.partCode)
    .query( `  SELECT	Adm.Name+' '+Family AS Name,AdmCode,PCode,PL.Code AS PartCode ,
                        [Bed Name] AS BedName,[Dr-List].Name AS DrName ,[Dr-List].DrExpert,
                        [Dr-List].Code AS DrCode , Old ,PL.Name AS PartName,
                        Adm.sex AS Gender , Adm.NationalCode
                FROM	BedActiveAdmList AS BA,[Bed-List] AS BL,[Room-List] AS RL ,
                        [Part-List] AS PL ,Adm,[Dr-List]
                WHERE	BA.BedCode=BL.[Bed Code]
                AND		BL.[Room Code]=RL.[Room Code]
                AND		RL.[Part Code]=PL.Code
                AND		Adm.[Adm Code]=BA.AdmCode
                AND		[Dr-List].Code=Adm.[Dr Code]
                AND		PL.Code=@partCode`);
    return result.recordsets[0];
}

const getAllPatientList = async()=>{
    const result =await SQL_HIS_DB_POOL.request()
    .query( `  SELECT	Adm.Name+' '+Family AS Name,AdmCode,PCode,PL.Code AS PartCode ,
                        [Bed Name] AS BedName,[Dr-List].Name AS DrName ,[Dr-List].DrExpert,
                        [Dr-List].Code AS DrCode , Old ,PL.Name AS PartName,
                        Adm.NationalCode,Adm.sex AS Gender
                FROM	BedActiveAdmList AS BA,[Bed-List] AS BL,[Room-List] AS RL ,
                        [Part-List] AS PL ,Adm,[Dr-List]
                WHERE	BA.BedCode=BL.[Bed Code]
                AND		BL.[Room Code]=RL.[Room Code]
                AND		RL.[Part Code]=PL.Code
                AND		Adm.[Adm Code]=BA.AdmCode
                AND		[Dr-List].Code=Adm.[Dr Code]`);
    return result.recordsets[0];
}

const searchPatientData = async(req)=>{   

    let syntax = `  SELECT     TOP 10 Adm.Name+' '+Family AS Name,[Adm Code] AS AdmCode,PCode,PL.Code AS PartCode ,
                                '' AS BedName,[Dr-List].Name AS DrName ,[Dr-List].DrExpert,
                                [Dr-List].Code AS DrCode , Old ,PL.Name AS PartName,
                                Adm.sex AS Gender, NationalCode
                    FROM        [Part-List] AS PL ,Adm,[Dr-List]
                    WHERE       [Dr-List].Code=Adm.[Dr Code]
                    AND			PL.Code=Adm.[Part Code]
                    AND         PType<>0 `;
                    if(hasValue(req.admitCode))
                        syntax+= `AND [Adm Code]=@admitCode  `;
                    if(hasValue(req.pCode))
                        syntax+= `AND pCode='@pCode' `;
                    if(hasValue(req.fName))
                        syntax+= `AND SName LIKE REPLACE(N'%'+ @fName +'%',' ','') `;
                    if(hasValue(req.lName))
                        syntax+= `AND SFamily LIKE REPLACE(N'%'+ @lName +'%',' ','')`;

                    let checkSyntax=syntax.substring(syntax.length-4,3);
                    if(checkSyntax=='AND')
                        syntax=syntax.substring(0,syntax.length-4);
                    syntax +=`ORDER BY [Adm Code],Ptype`;
                    
        const result =await SQL_HIS_DB_POOL.request()
    .input('admitCode',msSql.Int,req.admitCode)
    .input('pCode',msSql.Int,req.pCode)
    .input('fName',msSql.NVarChar,req.fName)
    .input('lName',msSql.NVarChar,req.lName)
    .query(syntax);

    return result.recordsets[0];
}

module.exports = {
    getPatientListByPartCode,
    getAllPatientList,
    searchPatientData,
}