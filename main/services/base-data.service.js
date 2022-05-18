const mssql = require('mssql');
const { SmallInt } = require('mssql');
const {msSql,hisMsSqlConfig,msSqlConfig}=require('../libs/core');

const getPartList = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .input('Type',msSql.Int,req.partType)
    .query(`SELECT  Name AS PartName , Code AS PartCode
            FROM	[Part-List]
            WHERE	[Part-List].Type=@Type`);
    return result.recordsets[0];
}

const getdefaultSurgeryReport = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .query(`SELECT	Code AS DefTitleCode , 
                    Name AS DefTitleName
            FROM	PaperNoteReadyTree`);
    return result.recordsets[0];
}

const getDefaultSurgeryReportValues = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .input('itemCode',SmallInt,req.itemCode)
    .query(`SELECT	Note1,Note2,Note3,isNote1Right,isNote2Right,
                    isNote3Right
            FROM	PaperNoteReady
            WHERE	Code=@itemCode`);
    return result.recordsets[0];
}

const getDisTypeList = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .query(`SELECT	Code,Name
            FROM	dbo.[DisType-List]`);
    return result.recordsets[0];
}

const getAllDrExpert = async()=>{
    const result =await SQL_HIS_DB_POOL.request()
    .query(`SELECT	ROW_NUMBER()OVER(ORDER BY DrExpertList.Code) AS Row,
                    DrExpertList.Code,DrExpertList.Name
            FROM	DrExpertList,[Dr-List]
            WHERE	DrExpert=DrExpertList.Code
            GROUP BY DrExpertList.Code,DrExpertList.Name`);
    return result.recordsets[0];
}

const getDocSummaryDiseaseProcess = async(req)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('drExpert',mssql.SmallInt,req.drExpert)
    .query(`SELECT	Code, Title
            FROM	dbo.DocSummaryDiseaseProcess 
            WHERE	DrExpert=@drExpert`);
    return result.recordsets[0];
}

const getDocSummaryDiseaseAdvice = async(req)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('drExpert',mssql.SmallInt,req.drExpert)
    .query(`SELECT	Code, Title
            FROM	dbo.DocSummaryDiseaseAdvice 
            WHERE	DrExpert=@drExpert`);
    return result.recordsets[0];
}

const saveDocSummaryDiseaseAdvice = async(req)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('drExpert',mssql.SmallInt,req.drExpert)
    .input('title',mssql.NVarChar,req.title)
    .query(`INSERT INTO DocSummaryDiseaseAdvice(DrExpert,Title) 
            VALUES(@drExpert,@title)
            
            SELECT  Code, Title
            FROM    DocSummaryDiseaseAdvice
            WHERE   DrExpert=@drExpert`);
    return result.recordsets[0];
}

const saveDocSummaryDiseaseProcess = async(req)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('drExpert',mssql.SmallInt,req.drExpert)
    .input('title',mssql.NVarChar,req.title)
    .query(`INSERT INTO DocSummaryDiseaseProcess(DrExpert,Title) 
            VALUES(@drExpert,@title)
            
            SELECT  Code, Title
            FROM    DocSummaryDiseaseProcess
            WHERE   DrExpert=@drExpert`);
    return result.recordsets[0];
}

const deleteDocSummaryDiseaseProcess = async(req)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('itemCode',mssql.SmallInt,req.itemCode)
    .input('drExpert',mssql.SmallInt,req.drExpert)
    .query(`DELETE  DocSummaryDiseaseProcess
            WHERE   Code=@itemCode
            
            SELECT  Code, Title
            FROM    DocSummaryDiseaseProcess
            WHERE   DrExpert=@drExpert`);
    return result.recordsets[0];
}

const deleteDocSummaryDiseaseAdvice = async(req)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('itemCode',mssql.SmallInt,req.itemCode)
    .input('drExpert',mssql.SmallInt,req.drExpert)
    .query(`DELETE  DocSummaryDiseaseAdvice
            WHERE   Code=@itemCode
            
            SELECT  Code, Title
            FROM    DocSummaryDiseaseAdvice
            WHERE   DrExpert=@drExpert`);
    return result.recordsets[0]; 
}

const getDoctorInstruction = async(req)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
    .query(`SELECT  Code, Name
            FROM    DoctorInstructionsList`);
    return result.recordsets[0];    
}

const saveDoctorInstruction = async(req)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('itemName',msSql.NVarChar,req.itemName)
    .query(`INSERT INTO dbo.DoctorInstructionsList(Name)
            VALUES(@itemName)
            
            SELECT  Code, Name
            FROM    DoctorInstructionsList`);
    return result.recordsets[0];
}

const getServicesListByProgramCode = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .input('programCode',msSql.SmallInt,req.programCode)
    .input('isLab',msSql.Bit,req.isLab)
    .input('isDrug',msSql.Bit,req.isDrug)
    .query(`SELECT SL.Code ServiceCode,MAX(SL.Name) ServiceName,SL.[Int Code] IntCode
            FROM	WardGroup W,[Part-List] P,[Service-List] SL
            WHERE	W.[Ward Code]=P.Code
            AND		W.[Group Code]=SL.[Group Code]
            AND		RIGHT(SL.Code,3)<>'-27'
            AND		SL.[Exp Date] IS NULL
            AND		SL.isDrug=@isDrug
            AND		SL.isLab=isLab
            AND		P.PrgCodeAssign=@programCode
            GROUP BY SL.[Int Code],SL.Code`);

    return result.recordsets[0];
}

const getProgramsList = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .query(`SELECT Code programCode,Name programName
            FROM [Prg-List]`);

    return result.recordsets[0];
}

const getFrequencyOfUseList = async(req)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
    .query(`SELECT *
            FROM FrequencyOfUseList`);

    return result.recordsets[0];
}

module.exports = {
    getPartList,
    getdefaultSurgeryReport,
    getDefaultSurgeryReportValues,
    getDisTypeList,
    getAllDrExpert,
    getDocSummaryDiseaseProcess,
    getDocSummaryDiseaseAdvice,
    saveDocSummaryDiseaseAdvice,
    saveDocSummaryDiseaseProcess,
    deleteDocSummaryDiseaseProcess,
    deleteDocSummaryDiseaseAdvice,
    getDoctorInstruction,
    saveDoctorInstruction,
    getServicesListByProgramCode,
    getProgramsList,
    getFrequencyOfUseList,
}