const {msSql,hisMsSqlConfig,hisMsSqlConfig2}=require('../libs/core');


const getSurgeryServicesByPaperIntCode = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .input('paperIntCode',msSql.Int,req.paperIntCode)
    .query(`SELECT	ISNULL(MAX(dbo.GetOprBhDr([GS-ID],1)),'') AS OprDr , 
                    ISNULL(MAX(dbo.GetOprBhDr([GS-ID],2)),'') AS BhDr ,
                    MAX([Service-List].Code) AS ServiceCode,
                    MAX([Service-List].Name)AS ServiceName,
                    MAX(Paper.[Paper Int Code]) AS  PaperIntCode
            FROM	[Give-Service],Paper,GiveServiceOprPrice ,[Service-List]
            WHERE	[Give-Service].[Paper Int Code]=Paper.[Paper Int Code]
            AND		[Give-Service].[GS-ID]=GiveServiceOprPrice.RelatedGSID
            AND		[Give-Service].[Service Int Code]=[Service-List].[Int Code]
            AND		OprItemCode in (1,2)
            and		Paper.[Paper Int Code]=@paperIntCode
            GROUP BY [GS-ID]`); 

    return result.recordsets[0];
}

const getAllServicesByPaperIntCode = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .input('paperIntCode',msSql.Int,req.paperIntCode)
    .query(`SELECT	[Paper Code] AS PaperCode , Paper.[Paper Int Code] AS PaperIntCode , Date,
                    Name AS ServiceName, Code AS ServiceCode
            FROM	Paper,[Give-Service],[Service-List]
            WHERE	Paper.[Paper Int Code]=[Give-Service].[Paper Int Code]
            AND		[Give-Service].[Service Int Code]=[Service-List].[Int Code]
            AND		Paper.[Paper Int Code]=@paperIntCode
            AND		RIGHT(Code,3)<>'-27'
            AND		Code NOT IN ('807000')`); 

    return result.recordsets[0];
}

const getLabGroupsByAdmitCode = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .input('admitCode',msSql.Int,req.admitCode)
    .query(`SELECT  GCode,GName,[Adm Code] AdmCode
            FROM	GiveServiceLabAnsGroup,Paper
            WHERE	PaperIntCode=[Paper Int Code]
            AND		GiveServiceLabAnsGroup.Status<>0
            AND		[Adm Code]=@admitCode
            GROUP BY [Adm Code] ,GCode,GName`); 

    return result.recordsets[0];    
}

const getLabTestsByAdmitCode = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .input('admitCode',msSql.Int,req.admitCode)
    .input('parentCode',msSql.NVarChar,req.parentCode)
    .query(`SELECT  MAX(L.TName) TestName,L.TCode TestCode,L.TGroupCode TestGroupCode,
                    GL.GCode ParentCode,[Adm Code] AdmCode
            FROM	GiveServiceLabAnsGroup GL,GiveServiceLabAns L,Paper P
            WHERE	PaperIntCode=P.[Paper Int Code]
            AND		GL.LGID=L.LGID
            AND		GL.Status<>0
            AND		[Adm Code]=@admitCode            
            AND		GL.GCode=@parentCode
            GROUP BY [Adm Code],GL.GCode,L.TCode,L.TGroupCode`);            

    return result.recordsets[0];
}

const getLabResultsByAdmitCode = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .input('admitCode',msSql.Int,req.admitCode)
    .input('parentCode',msSql.NVarChar,req.parentCode)
    .input('testCode',msSql.NVarChar,req.testCode)
    .input('testGroupCode',msSql.SmallInt,req.testGroupCode)
    .query(`SELECT  [Adm Code] AdmCode, GL.GCode,L.TCode,L.TGroupCode,P.Date OrderAcceptDate,
                        GL.GAnsDate AnsDate,L.Result,L.LabNormalName,SU.Name Unit
            FROM	GiveServiceLabAnsGroup GL,GiveServiceLabAns L,Paper P,
                    LabNormalKitList K , [Service-List Unit] SU
            WHERE	PaperIntCode=[Paper Int Code]
            AND		GL.LGID=L.LGID
            AND		L.KitID=K.KitID
            AND		K.LabUnit=SU.Code
            AND		GL.Status<>0
            AND		LEN(LTRIM(L.Result))>0
            AND		[Adm Code]=@admitCode
            AND		GL.GCode=@parentCode
            AND		L.TCode=@testCode
            AND		L.TGroupCode=@testGroupCode`);            
    return result.recordsets[0];
}

const getAllLabResultsByAdmitCode = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .input('admitCode',msSql.Int,req.admitCode)
    .query(`SELECT  [Adm Code] AdmCode, GL.GCode,L.TCode,L.TGroupCode,P.Date OrderAcceptDate,
                    GL.GAnsDate AnsDate,L.Result,L.LabNormalName,SU.Name Unit
            FROM	GiveServiceLabAnsGroup GL,GiveServiceLabAns L,Paper P,
                    LabNormalKitList K , [Service-List Unit] SU
            WHERE	PaperIntCode=[Paper Int Code]
            AND		GL.LGID=L.LGID
            AND		L.KitID=K.KitID
            AND		K.LabUnit=SU.Code
            AND		GL.Status<>0
            AND		LEN(LTRIM(L.Result))>0
            AND		[Adm Code]=@admitCode`); 

    return result.recordsets[0];
}


module.exports = {
    getSurgeryServicesByPaperIntCode,
    getAllServicesByPaperIntCode,
    getLabGroupsByAdmitCode,
    getLabTestsByAdmitCode,
    getLabResultsByAdmitCode,
    getAllLabResultsByAdmitCode,
}