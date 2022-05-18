const { SmallInt } = require('mssql');
const {msSql,hisMsSqlConfig,hisMsSqlConfig2}=require('../libs/core');

const getMainDashboard = async(req)=>{
    const result =await SQL_HIS_DB_POOL.request()
    .query(`SELECT 
            IsNull((
                SELECT  COUNT(AdmCode) 
                FROM	BedActiveAdmList 
            ),0) AdmitCount , 
            IsNull((
                SELECT	COUNT([Bed Code]) 
                FROM	[Bed-List]
                WHERE	[Bed Code]>0
                AND		[Bed Code] NOT IN (	SELECT  BedCode
                                            FROM	BedActiveAdmList )
            ),0)FreeBedCount,
            IsNull((							
                SELECT  COUNT(AdmCode) 
                FROM	BedActiveAdmList
                WHERE	AdmCode IN (SELECT [Adm Code]
                                    FROM	AdmData
                                    WHERE	isEmerg=1) 
            ),0)EmergAdmitCount,
            IsNull((
                SELECT  COUNT(ID)
                FROM	OprWaitListView
                WHERE	PaperIntCode=0
            ),0)SurgeryWaitCount`);
    return result.recordsets[0];
}


module.exports = {
    getMainDashboard,
}