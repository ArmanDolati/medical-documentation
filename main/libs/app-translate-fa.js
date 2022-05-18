const errorMap= new Map();
errorMap.set('noError',{'err':'اطلاعات با موفقیت ذخیره گردید','errCode':0});
errorMap.set('errVerifyToken',{'err':'! توکن نامعتبر','errCode':1});
errorMap.set('errRegisterUser',{'err':'! امکان تعریف کاربر جدید میسر نیست','errCode':2});
errorMap.set('errNotInserted',{'err':'! اطلاعات ذخیره نشد لطفا مجددا ذخیره نمائید','errCode':3});
errorMap.set('errHasNotValue',{'err':'! اطلاعات مورد نظر یافت نشد','errCode':4});
errorMap.set('errUserExists',{'err':'! نام کاربری تکراری است','errCode':5});
errorMap.set('errInvalidData',{'err':'! خطا در ورود اطلاعات','errCode':6});
errorMap.set('errTokenNotFound',{'err':'! توکن یافت نشد','errCode':7});
errorMap.set('errHasNotData',{'err':'اطلاعات مورد نظر یافت نشد','errCode':8});
errorMap.set('errGetPersonList',{'err':'امکان بازیابی اطلاعات پرسنل میسر نیست','errCode':8});
errorMap.set('errGetPartList',{'err':'امکان بازیابی اطلاعات بخش میسر نیست','errCode':9});
errorMap.set('errGetPatientList',{'err':'امکان بازیابی اطلاعات بیماران میسر نیست','errCode':10});
errorMap.set('errGetPatientPapers',{'err':'امکان بازیابی نسخ بیمار میسر نیست','errCode':11});
errorMap.set('errGetSurgeryReport',{'err':'امکان بازیابی گزارش پزشک جراح میسر نیست','errCode':12});
errorMap.set('errGetPatientServices',{'err':'امکان بازیابی خدمات بیمار میسر نیست','errCode':13});
errorMap.set('errGetSurgeryServices',{'err':'امکان بازیابی جراحی بیمار میسر نیست','errCode':14});
errorMap.set('errGetLabGroups',{'err':'امکان بازیابی گروه‌های آزمایش میسر نیست','errCode':15});
errorMap.set('errGetLabTests',{'err':'امکان بازیابی آزمایشات بیمار میسر نیست','errCode':16});
errorMap.set('errGetLabResults',{'err':'امکان بازیابی نتایج آزمایشات بیمار میسر نیست','errCode':17});
errorMap.set('errGetLabReportForChart',{'err':'امکان بازیابی نتایج آزمایشات بیمار میسر نیست','errCode':18});
errorMap.set('errGetDefaultReport',{'err':'امکان بازیابی متون آماده میسر نیست','errCode':19});
errorMap.set('errGetDefaultReportValues',{'err':'امکان بازیابی نتایج متون آماده میسر نیست','errCode':20});
errorMap.set('errGetDocSummary',{'err':'امکان بازیابی خلاصه پرونده بیمار میسر نیست','errCode':21});
errorMap.set('errGetDisTypeList',{'err':'امکان بازیابی لیست وضعیت هنگام ترخیص میسر نیست','errCode':22});
errorMap.set('errGetDocSummaryData',{'err':'امکان بازیابی خلاصه پرونده بیمار میسر نیست','errCode':23});
errorMap.set('errSearchPatientData',{'err':'امکان جستجوی بیمار میسر نیست','errCode':24});
errorMap.set('errGetMainDashboard',{'err':'امکان بازیابی اطلاعات داشبورد میسر نیست','errCode':25});
errorMap.set('errNotAllowCros',{'err':'!!! دسترسی غیر مجاز','errCode':25});
errorMap.set('saveSurgeryReport',{'err':'امکان ذخیره گزارش پزشک میسر نیست','errCode':26});
errorMap.set('getAllDrExpert',{'err':'امکان بازیابی تخصص پزشکان میسر نیست','errCode':27});
errorMap.set('getDocSummaryDiseaseProcess',{'err':'امکان بازیابی لیست سیر بیماری میسر نیست','errCode':28});
errorMap.set('getDocSummaryDiseaseAdvice',{'err':'امکان بازیابی لیست توصیه های پس از ترخیص میسر نیست','errCode':29});
errorMap.set('saveDocSummaryDiseaseAdvice',{'err':'امکان ذخیره لیست توصیه های پس از ترخیص میسر نیست','errCode':30});
errorMap.set('saveDocSummaryDiseaseProcess',{'err':'امکان ذخیره لیست سیر بیماری میسر نیست','errCode':31});
errorMap.set('deleteDocSummaryDiseaseProcess',{'err':'امکان حذف سیر بیماری میسر نیست','errCode':32});
errorMap.set('deleteDocSummaryDiseaseAdvice',{'err':'امکان حذف توصیه های پس از ترخیص میسر نیست','errCode':33});
errorMap.set('saveDocSummaryData',{'err':'امکان ذخیره خلاصه پرونده میسر نیست','errCode':34});
errorMap.set('errNotLogin',{'err':'not authenticated','errCode':34});
errorMap.set('getDoctorInstruction',{'err':'امکان بازیابی لیست دستورات پزشک میسر نیست','errCode':35});
errorMap.set('saveDoctorInstruction',{'err':'امکان ذخیره لیست دستورات پزشک میسر نیست','errCode':37});
errorMap.set('savePatientDoctorInstruction',{'err':'امکان ذخیره دستورات پزشک بیمار میسر نیست','errCode':38});
errorMap.set('getPatientDoctorInstruction',{'err':'امکان بازیابی دستورات پزشک بیمار میسر نیست','errCode':39});
errorMap.set('getServicesListByProgramCode',{'err':'امکان بازیابی لیست خدمات میسر نیست','errCode':40});
errorMap.set('getProgramsList',{'err':'امکان بازیابی لیست برنامه‌ها میسر نیست','errCode':41});
errorMap.set('updatePatientDoctorInstruction',{'err':'امکان بروز رسانی دستورات پزشک بیمار میسر نیست','errCode':42});
errorMap.set('getFrequencyOfUseList',{'err':'امکان بازیابی لیست دفعات مصرف میسر نیست','errCode':43});
errorMap.set('savePatientDoctorOrderService',{'err':'امکان ذخیره درخواست خدمات بیمار میسر نیست','errCode':44});
errorMap.set('getPatientDoctorOrderService',{'err':'امکان بازیابی درخواست خدمات بیمار میسر نیست','errCode':45});
errorMap.set('updatePatientDoctorOrderService',{'err':'امکان بروزرسانی درخواست خدمات بیمار میسر نیست','errCode':46});
errorMap.set('deletePatientDoctorOrderService',{'err':'امکان حذف درخواست خدمات بیمار میسر نیست','errCode':47});
errorMap.set('getPatientPatoReportByPaperIntCode',{'err':'امکان گزارش پاتولوژی بیمار میسر نیست','errCode':48});
errorMap.set('getCurrentUser',{'err':'امکان بازیابی اطلاعات کاربر جاری میسر نیست','errCode':49});
errorMap.set('updateCurrentUserToken',{'err':'امکان بروزرسانی اطلاعات کاربر جاری میسر نیست','errCode':50});

module.exports = {
    errorMap
}