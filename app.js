require('dotenv').config();
const {app,getResult} = require('./main/libs/core');
const {errorMap}=require('./main/libs/app-translate-fa');
const authenticationRouter = require('./main/routers/authentication.router');
const baseDataRouter=require('./main/routers/base-data.router');
const patientDataRouter=require('./main/routers/patient-data.router');
const patientPaperRouter=require('./main/routers/patient-paper.router');
const patientReportRouter=require('./main/routers/patient-report.router');
const patientServiceRouter=require('./main/routers/patient-service.router');
const dashboardRouter=require('./main/routers/dashboard.router');
const patientOrderRouter = require('./main/routers/patient-order.router');
const { required } = require('nodemon/lib/config');


//UnhandelExeption error
app.use((err, req, res, next) => {
    if (err !== null) {
        let result = getResult(true,errorMap.get('errInvalidData').errCode,err.toString(),'')//errorMap.get('errInvalidData').err, '');
        return res.json(result);
    }else{        
        if (req.method == "OPTIONS") {
            res.status(200);
            res.send();
        }else{
            return next();
        }
    }
});


app.get('/',(req,res)=>{
    ///res.cookie('cookieName', 'cookieValue', { sameSite: 'none', secure: true});
    res.send('hellow');
})

app.use('/api/authentication',authenticationRouter);
app.use('/api/patientData',patientDataRouter);
app.use('/api/patientPaper',patientPaperRouter);
app.use('/api/patientReport',patientReportRouter);
app.use('/api/patientService',patientServiceRouter);
app.use('/api/baseData',baseDataRouter);
app.use('/api/dashboard',dashboardRouter);
app.use('/api/patientOrder',patientOrderRouter);

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Port ${process.env.PORT} is open`);
});