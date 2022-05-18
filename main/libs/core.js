const {resultEntities}= require('./result-entities');
const express= require('express');
const app = express();
const {schematype}=require('standard-schema-type')
const persianDate = require('persian-date'); 
require('dotenv').config();
const errorMap=require('./app-translate-fa')
const bodyParser = require('body-parser');
const cors = require('cors'); 
const jwt = require('jsonwebtoken');//generate sign
const msSql = require('mssql');
const sanitizer = require('sanitizer'); //prevent xss 
const helmet = require('helmet');//x-frame-option / csp ,...
const referrerPolicy  = require('referrer-policy'); // referrer policy header

function jalaliTodyDateTime(){
    let todayDateTime=new persianDate(new Date()).toLocale('en').format();
    todayDateTime=todayDateTime.substring(0,16).split('-').join('/');

    return todayDateTime;
}

console.log(schematype)

const msSqlConfig={
    server:process.env.SQL_SERVER_NAME,
    port:parseInt(process.env.SQL_PORT),
    user:process.env.SQL_USER_NAME,
    password:process.env.SQL_PASSWORD,
    database:process.env.SQL_DB_NAME,
    options: {
        encrypt:false //just must be true in Microsoft Azure
      }
}

const hisMsSqlConfig={
    server:process.env.HIS_SQL_SERVER_NAME,
    port:parseInt(process.env.SQL_PORT),
    user:process.env.SQL_USER_NAME,
    password:process.env.SQL_PASSWORD,
    database:process.env.HIS_SQL_DB_NAME,
    options: {
        encrypt:false //just must be true in Microsoft Azure
      }
}

const hisMsSqlConfig2={
    server:process.env.HIS_SQL_SERVER_NAME,
    port:parseInt(process.env.SQL_PORT),
    user:process.env.SQL_USER_NAME,
    password:process.env.SQL_PASSWORD,
    database:process.env.HIS_SQL_DB_NAME2,
    options: {
        encrypt:false //just must be true in Microsoft Azure
      }
}

async function msSqlLocalDBConnectionPool(){
    const poolPromise =await new msSql.ConnectionPool(msSqlConfig)
    .connect()
    .then(pool => {
        console.log('Connected to local MSSQL')
        return pool
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

    return poolPromise;
}

async function msSqlHisDBConnectionPool(){
    const poolPromise =await new msSql.ConnectionPool(hisMsSqlConfig)
    .connect()
    .then(pool => {
        console.log('Connected to His MSSQL')
        return pool
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

    return poolPromise;
}
//----------------------------------call connection pool function-----------------------
async function callConnectionPool(){
    SQL_LOCAL_DB_POOL=await msSqlLocalDBConnectionPool();
    SQL_HIS_DB_POOL=await msSqlHisDBConnectionPool();
}

callConnectionPool();
// const sessionConfig={
//     // store:new MemcachedStore({
//     //     hosts: ['localhost:4200'],
//     // }),//new RedisStore({client:redisClient}),
//     secret: 'A$h&#12Y%',
//     name: 'app_session',
//     resave: true,
//     saveUninitialized: true,
//     cookie : {
//         sameSite: 'strict',
//     // maxAge: 60000, 
//         // secure : true,
//     }
// } 


function signData(data){
    let result=jwt.sign({
        'data':data
    },process.env.PRIVATE_KEY);

    return result;
}

function getResult(isError,errorCode,errorMsg,result){
    resultEntities.errorCode=errorCode;
    resultEntities.errorMsg=errorMsg;
    resultEntities.isError=isError;
    resultEntities.result=result;

    return Object.assign({},resultEntities);
}

function hasValue(anyData){
    try{
        if(anyData !=undefined && anyData !='' && anyData !=' '){
            return true;
        }else{
            return false;
        }
    }catch(err){
       return getResult(false,errorMap.get('errHasNotValue').errCode,err.toString(),'');
    }
}

function checkHasKeyJsonObject(obj,key){
    return Object.prototype.hasOwnProperty.call(obj,key);
}

//=======================security policy midllware===============================
app.use(helmet());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(referrerPolicy());
app.set('trust proxy', 1);
app.use(referrerPolicy({policy:'same-origin'}));
app.use(cors({origin:process.env.WHITH_LIST_CROS}));
//=======================================================================

module.exports={
    app,
    jwt,
    sanitizer,
    msSql,
    msSqlConfig,
    hisMsSqlConfig,
    hisMsSqlConfig2,
    signData,
    getResult,
    hasValue,
    jalaliTodyDateTime,
    checkHasKeyJsonObject,
}
