const {msSql,hisMsSqlConfig,hisMsSqlConfig2}=require('../libs/core');


const getSurgeryReoprtByPaperIntCode = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .input('paperIntCode',msSql.Int,req.paperIntCode)
    .query(`SELECT  PaperIntCode, Note1, Note2, Note3, 
                    PersCode, isNote1Right, isNote2Right, 
                    isNote3Right
            FROM    PaperNote
            WHERE   PaperIntCode=@paperIntCode`); 

    return result.recordsets[0];
}

// const getLabReportForChartByAdmitCode = async(req)=>{
//     let connection = await checkConnection();
//     if(connection._connected){
//         const result = await connection.request()
//         .input('admitCode',msSql.Int,req.admitCode)
//         .input('testCode',msSql.NVarChar,req.testCode)
//         .input('testGroupCode',msSql.Int,req.testGroupCode)
//         .input('parentTestID',msSql.NVarChar,req.parentTestID)
//         .query(`SELECT	MAX(RIGHT(Date,11)) AS Date,MAX(Result) AS Result,Code,[Group Code] AS GroupCode,
//                         ISNULL(MAX(LabNormalName),'') AS LabNormalName
//                 FROM	GiveServiceLabAnsGroup,GiveServiceLabAns,Paper,[Service-List]
//                 WHERE	PaperIntCode=[Paper Int Code]
//                 AND		GiveServiceLabAnsGroup.LGID=GiveServiceLabAns.LGID
//                 AND		[Service-List].[Int Code]=GiveServiceLabAns.IntCode
//                 AND		GiveServiceLabAnsGroup.Status<>0
//                 AND		LEN(LTRIM(Result))>0
//                 AND		[Adm Code]=@admitCode
//                 AND		Code=@testCode
//                 AND		[Group Code]=@testGroupCode
//                 AND     GCode+CAST(ASCII(GName)AS nvarchar(50)) = @parentTestID
//                 GROUP BY [Paper Int Code],Code,[Group Code]`); 

//         return result.recordsets[0];
//     }
// }


const getDocSummaryData = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .input('admitCode',msSql.Int,req.admitCode)
    .query(`SELECT	AdmCode, CC, FinalDiag, REPLACE(procedures,CHAR(13)+CHAR(10),'&') AS procedures, 
                        ClinicResult, DiseaseProgress, 
                        DisStatus,AdmDocSummary.DisAdvise,[DisType-List].Name DisType,
                        [DisType-List].Code DisTypeCode
            FROM        ((dbo.AdmDocSummary JOIN AdmData  
            ON		[Adm Code]=AdmDocSummary.AdmCode)LEFT JOIN [DisType-List]
            ON		DisType=Code)
            WHERE   AdmCode=@admitCode`); 

    return result.recordsets[0];
}

const saveSurgeryReport = async(req)=>{

    let syntax = `  IF EXISTS(	SELECT  1
                                FROM	PaperNote
                                WHERE	PaperIntCode =@paperIntCode)
                    BEGIN
                            UPDATE	PaperNote
                            SET     [Note3]=replace(@note3,'\n',CHAR(13)+CHAR(10)),
                                    [Note1]=replace(@note1,'\n',CHAR(13)+CHAR(10)),
                                    [Note2]=replace(@note2,'\n',CHAR(13)+CHAR(10)),
                                    PersCode=@persCode,
                                    isNote1Right=@isNote1Right,
                                    isNote2Right=@isNote2Right,
                                    isNote3Right=@isNote3Right
                            WHERE	PaperIntCode =@paperIntCode	
                    END                            
                    ELSE
                            INSERT INTO PaperNote([PaperIntCode], [Note1], [Note2], [Note3], 
                                        [PersCode], [isNote1Right], [isNote2Right], [isNote3Right])
                            VALUES(@paperIntCode,@note1,@note2,@note3,@persCode,@isNote1Right,@isNote2Right,@isNote3Right)
                    
                    SELECT *
                    FROM	PaperNote
                    WHERE	PaperIntCode =@paperIntCode	` ;
                    
    const result =await SQL_HIS_DB_POOL.request()
    .input('paperIntCode',msSql.Int,req.paperIntCode)
    .input('note1',msSql.NVarChar,req.note1)
    .input('note2',msSql.NVarChar,req.note2)
    .input('note3',msSql.NVarChar,req.note3)
    .input('persCode',msSql.SmallInt,req.persCode)
    .input('isNote1Right',msSql.TinyInt,req.isNote1Right)
    .input('isNote2Right',msSql.TinyInt,req.isNote2Right)
    .input('isNote3Right',msSql.TinyInt,req.isNote3Right)
    .query(syntax); 

    return result.recordsets[0];
}

const saveDocSummaryData = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .input('admitCode',msSql.Int,req.admitCode)
    //.input('disTypeCode',msSql.Int,req.disTypeCode)
    .input('disAdvice',msSql.NVarChar,req.disAdvice)
    .input('cc',msSql.NVarChar,req.cc)
    .input('finalDiag',msSql.NVarChar,req.finalDiag)
    .input('procedures',msSql.NVarChar,req.procedures)
    .input('clinicResult',msSql.NVarChar,req.clinicResult)
    .input('diseaseProgress',msSql.NVarChar,req.diseaseProgress)
    .input('disStatus',msSql.NVarChar,req.disStatus)
    .input('persCode',msSql.SmallInt,req.persCode)
    .query(`DELETE  AdmDocSummary 
            WHERE   AdmCode=@admitCode
            
            INSERT INTO AdmDocSummary(AdmCode, CC, FinalDiag, procedures, ClinicResult, DiseaseProgress, DisStatus, DisAdvise, PersCode)
            VALUES(@admitCode,@cc,@finalDiag,@procedures,@clinicResult,@diseaseProgress,@disStatus,@disAdvice,@persCode)
            
            SELECT AdmCode, CC, FinalDiag, procedures, ClinicResult, DiseaseProgress, DisStatus, DisAdvise, PersCode
            FROM    AdmDocSummary 
            WHERE   AdmCode=@admitCode`); 

    return result.recordsets[0];
}

const getPatientPatoReportByPaperIntCode = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .input('paperIntCode',msSql.Int,req.paperIntCode)
    .query(`SELECT	[Paper Code] AS PaperCode , [Paper Int Code] AS PaperIntCode , Date,
                        Name AS PaperDrName, Tissue, Clinical, 
                        Macroscopic, Microscopic, Diagnosis, FDiagnosis, 
                        Comment, Comment2, PersCode, 
                        CASE WHEN isClinicalRight=1 THEN 'rtl' ELSE 'ltr' END AS isClinicalRight, 
                        CASE WHEN isTissueRight=1 THEN 'rtl' ELSE 'ltr' END AS isTissueRight, 
                        CASE WHEN isMacroscopicRight=1 THEN 'rtl' ELSE 'ltr' END AS  isMacroscopicRight, 
                        CASE WHEN isMicroscopicRight=1 THEN 'rtl' ELSE 'ltr' END AS isMicroscopicRight, 
                        CASE WHEN isDiagnosisRight=1 THEN 'rtl' ELSE 'ltr' END AS isDiagnosisRight, 
                        CASE WHEN isCommentRight=1 THEN 'rtl' ELSE 'ltr' END AS isCommentRight, 
                        CASE WHEN isFDiagnosisRight=1 THEN 'rtl' ELSE 'ltr' END AS isFDiagnosisRight, 
                        CASE WHEN isComment2Right=1 THEN 'rtl' ELSE 'ltr' END AS isComment2Right, 
                        PrintDate
                FROM	(Paper JOIN[Dr-List]
                ON		Code=[Doctor Code]) LEFT JOIN PatAns
                ON		Paper.[Paper Int Code]=PatAns.PaperIntCode
                WHERE	Paper.[Paper Int Code]=@paperIntCode`);                
    return result.recordsets[0];
}
module.exports = {
    getSurgeryReoprtByPaperIntCode,
    getPatientPatoReportByPaperIntCode,
    // getLabReportForChartByAdmitCode,
    getDocSummaryData,
    saveSurgeryReport,
    saveDocSummaryData
}
