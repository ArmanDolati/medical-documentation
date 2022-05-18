const { Int, NVarChar } = require('mssql');
const {msSql,msSqlConfig, hasValue}=require('../libs/core');

const savePatientDoctorInstruction = async(req)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('admitCode',msSql.Int,req.admitCode)
    .input('instruction',msSql.NVarChar,req.instruction)
    .input('comment',msSql.NVarChar,req.comment)
    .input('actionDate',msSql.NVarChar(16),req.actionDate)
    .input('createDate',msSql.NVarChar(16),req.createDate)
    .input('actionPersonalCode',msSql.SmallInt,req.actionPersonalCode)
    .input('createdPersonalCode',msSql.SmallInt,req.actionPersonalCode)
    .query(`INSERT INTO PatientDoctorInstruction(AdmitCode, Instruction, Comment,ActionDate,CreateDate,ActionPersonalCode,CreatedPersonalCode)
            VALUES(@admitCode, @instruction, @comment,@actionDate,@createDate,@actionPersonalCode,@createdPersonalCode)
                
            SELECT  *
            FROM	PatientDoctorInstruction
            WHERE   AdmitCode=@admitCode`);
    return result.recordsets[0];
}

const getPatientDoctorInstruction = async(req)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('admitCode',msSql.Int,req.admitCode)
    .query(`SELECT  *
            FROM	PatientDoctorInstruction
            WHERE   AdmitCode=@admitCode`);
    return result.recordsets[0];
}

const updatePatientDoctorInstruction = async(req)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('id',msSql.Int,req.id)
    .input('instruction',msSql.NVarChar,req.instruction)
    .input('comment',msSql.NVarChar,req.comment)
    .input('actionDate',msSql.NVarChar(16),req.actionDate)
    .input('actionPersonalCode',msSql.SmallInt,req.actionPersonalCode)
    .query(`UPDATE	PatientDoctorInstruction
            SET		Instruction=@instruction,
                    Comment=@comment,
                    ActionDate=@actionDate,
                    ActionPersonalCode=@actionPersonalCode
            WHERE	ID=@id 
            
            SELECT  *
            FROM	PatientDoctorInstruction
            WHERE   ID=@id `);

    return result.recordsets[0];
}

const savePatientDoctorOrderService = async(req)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('admitCode',msSql.Int,req.admitCode)
    .input('serviceIntCode',msSql.Int,req.serviceIntCode)
    .input('serviceCode',msSql.NVarChar,req.serviceCode)
    .input('serviceName',msSql.NVarChar,req.serviceName)
    .input('numOrDose',msSql.Float,req.numOrDose)
    .input('frequency',msSql.SmallInt,req.frequency)
    .input('comment',msSql.NVarChar,req.comment)
    .input('programCode',msSql.SmallInt,req.programCode)
    .input('actionDate',msSql.NVarChar(16),req.actionDate)
    .input('createDate',msSql.NVarChar(16),req.createDate)
    .input('actionPersonalCode',msSql.SmallInt,req.actionPersonalCode)
    .input('createdPersonalCode',msSql.SmallInt,req.actionPersonalCode)
    .query(`INSERT INTO PatientDoctorOrderService(AdmitCode, ServiceIntCode, Comment,ActionDate,
            Frequency,CreateDate,ActionPersonalCode,CreatedPersonalCode,ServiceCode,ServiceName,NumOrDose,ProgramCode)
            VALUES(@admitCode, @serviceIntCode, @comment,@actionDate,@frequency,
            @createDate,@actionPersonalCode,@createdPersonalCode,@serviceCode,@serviceName,@numOrDose,@programCode)
                
            SELECT  *
            FROM	PatientDoctorOrderService
            WHERE   AdmitCode=@admitCode
            AND     IsDisable=0
            AND     ProgramCode=@programCode`);

    return result.recordsets[0];
}

const getPatientDoctorOrderService = async(req)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('admitCode',msSql.Int,req.admitCode)
    .input('programCode',msSql.Int,req.programCode)
    .query(`SELECT  *
            FROM	PatientDoctorOrderService
            WHERE   AdmitCode=@admitCode
            AND     IsDisable=0
            AND     ProgramCode=@programCode`);

    return result.recordsets[0];
}

const updatePatientDoctorOrderService = async(req)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('id',msSql.Int,req.id)
    .input('serviceIntCode',msSql.Int,req.serviceIntCode)
    .input('serviceCode',msSql.NVarChar,req.serviceCode)
    .input('serviceName',msSql.NVarChar,req.serviceName)
    .input('numOrDose',msSql.Float,req.numOrDose)
    .input('frequency',msSql.SmallInt,req.frequency)
    .input('comment',msSql.NVarChar,req.comment)
    .input('actionDate',msSql.NVarChar(16),req.actionDate)
    .input('programCode',msSql.SmallInt,req.programCode)
    .input('actionPersonalCode',msSql.SmallInt,req.actionPersonalCode)
    .query(`UPDATE	PatientDoctorOrderService
            SET		ServiceIntCode=@serviceIntCode,
                    ServiceCode=@serviceCode,
                    ServiceName=@serviceName,
                    NumOrDose=@numOrDose,
                    Frequency=@frequency,
                    Comment=@comment,
                    ActionDate=@actionDate,
                    ActionPersonalCode=@actionPersonalCode
            WHERE	ID=@id 
            
            SELECT  *
            FROM	PatientDoctorOrderService
            WHERE   IsDisable=0
            AND     ProgramCode=@programCode`);

    return result.recordsets[0];
}

const deletePatientDoctorOrderService = async(req)=>{
    const result =await SQL_LOCAL_DB_POOL.request()
    .input('id',msSql.Int,req.id)
    .input('actionDate',msSql.NVarChar(16),req.actionDate)
    .input('actionPersonalCode',msSql.SmallInt,req.actionPersonalCode)
    .query(`UPDATE	PatientDoctorOrderService
            SET		IsDisable=1,
                    ActionDate=@actionDate,
                    ActionPersonalCode=@actionPersonalCode
            WHERE	ID=@id 
            
            SELECT  *
            FROM	PatientDoctorOrderService
            WHERE   IsDisable=0
            AND     ProgramCode=@programCode`);

    return result.recordsets[0];
}


module.exports ={
    savePatientDoctorInstruction,
    getPatientDoctorInstruction,
    updatePatientDoctorInstruction,
    savePatientDoctorOrderService,
    getPatientDoctorOrderService,
    updatePatientDoctorOrderService,
    deletePatientDoctorOrderService
}