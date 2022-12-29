function newJson(data) {
  const allForms = [];

  for (let d = 0; d < data.length; d++) {
    let {
      header,
      employerData,
      employeeDetails,
      children,
      incomeFromThisEmployer,
      otherIncomes,
      partner,
      taxExemptionOrCredit,
      taxCoordination,
      files,
      date
    } = data[d];

    partner = partner ? partner : {};
    taxExemptionOrCredit = taxExemptionOrCredit ? taxExemptionOrCredit : {};
    taxCoordination = taxCoordination ? taxCoordination : {};

    const form = {
      'תאריך מילוי הטופס': new Date(date).toLocaleString().replace(/[.]/g, '/'),
      חברה: employerData?.name,
      'שנת המס': header.taxYear || '-',
      'שם העובד': employeeDetails.firstName || '-',
      'משפחת העובד': employeeDetails.lastName || '-',
      'ת"ז העובד':
        employeeDetails.idBy === 'id'
          ? employeeDetails['id-employee'] || '-'
          : '-',
      'ת"ל העובד': employeeDetails.birthDay
        ? `${plusZiro(employeeDetails.birthDay)}/${plusZiro(
            employeeDetails.birthMonth
          )}/${employeeDetails.birthYear}`
        : '-',
      'ת"ע העובד': employeeDetails.increaseDay
        ? `${plusZiro(employeeDetails.increaseDay)}/${plusZiro(
            employeeDetails.increaseMonth
          )}/${employeeDetails.increaseYear}`
        : '-',
      'דרכון העובד':
        employeeDetails.idBy === 'passport'
          ? employeeDetails['id-employee'] || '-'
          : '-',
      עיר: employeeDetails.citi || '-',
      רחוב: employeeDetails.street || '-',
      'מספר בית': employeeDetails.homeNum || '-',
      מיקוד: employeeDetails.postalCode || '-',
      מין: employeeDetails.gender === 'men' ? 'זכר' : 'נקבה',
      סטטוס: employeeDetails.maritalStatus
        ? maritalStatus(employeeDetails.maritalStatus)
        : '-',
      'תושב ישראל':
        employeeDetails.israeliResident === 'yes'
          ? 'כן'
          : employeeDetails.israeliResident === 'no'
          ? 'לא'
          : '-',
      'חבר קיבוץ/מושב שיתופי':
        employeeDetails.memberKibbutzOrMoshav === 'yes'
          ? 'כן'
          : employeeDetails.memberKibbutzOrMoshav === 'no'
          ? 'לא'
          : '-',
      'קופת חולים':
        employeeDetails.HMOMember === 'yes' ? employeeDetails.HMOEM : 'לא',
      אימייל: employeeDetails.email || '-',
      טלפון: employeeDetails.phone || '-',
      'טלפון נוסף': employeeDetails.anotherPhone || '-',
      ילדים: children.length > 0 ? 'בגיליון הנוסף' : '-',
      'הכנסותיי ממעביד זה': switchIncome(incomeFromThisEmployer),
      'תאריך תחילה העבודה': incomeFromThisEmployer['start-workDay']
        ? `${plusZiro(incomeFromThisEmployer['start-workDay'])}/${plusZiro(
            incomeFromThisEmployer['start-workMonth']
          )}/${incomeFromThisEmployer['start-workYear']}`
        : '-',
      'הכנסות אחרות':
        otherIncomes.incomesSalaryOhter === 'true'
          ? switchIncome(otherIncomes) +
            ' - ' +
            otherIncomesDetails(otherIncomes)
          : 'אין',
      ' ת"ז בן/בת הזוג':
        partner.idByPartner === 'id' || !partner.idByPartner
          ? partner['id-employee'] || '-'
          : '-',
      'משפחה בן/בת הזוג': partner.lastName || '-',
      'שם בן/בת הזוג': partner.firstName || '-',
      'ת"ל בן/בת הזוג': partner.birthDay
        ? `${plusZiro(partner.birthDay)}/${plusZiro(partner.birthMonth)}/${
            partner.birthYear
          }`
        : '-',
      'ת"ע בן/בת הזוג': partner.increaseDay
        ? `${plusZiro(partner.increaseDay)}/${plusZiro(
            partner.increaseMonth
          )}/${partner.increaseYear}`
        : '-',
      'דרכון בן/בת הזוג':
        partner.idByPartner === 'passport'
          ? partner['id-employee'] || '-'
          : '-',
      'הכנסה של בן/בת הזוג':
        partner.partnerIncome === 'true'
          ? partner.partnerIncomeType === 'WorkOrOhther'
            ? 'עבודה/קצבה/עסק'
            : partner.partnerIncomeType === 'otherIncome'
            ? 'הכנסה אחרת'
            : 'אין'
          : 'אין',
      'תושב/ת ישראל': employeeDetails.israeliResident === 'yes' ? 'כן' : 'לא',
      'נכה %100 / עיוור/ת': taxExemptionOrCredit.handicapped ? 'כן' : 'לא',
      'תושב/ת בישוב מזכה': taxExemptionOrCredit.permanentResident
        ? `גר ב${taxExemptionOrCredit.citi || '-'} מתאריך ${
            taxExemptionOrCredit.permanentResident
              ? taxExemptionOrCredit['permanentResident-from-dateDay']
                ? `${plusZiro(
                    taxExemptionOrCredit['permanentResident-from-dateDay']
                  )}/${plusZiro(
                    taxExemptionOrCredit['permanentResident-from-dateMonth']
                  )}/${taxExemptionOrCredit['permanentResident-from-dateYear']}`
                : ''
              : ''
          }`
        : 'לא',
      'עולה חדש/ה': taxExemptionOrCredit.newImmigrant
        ? `מ-${
            taxExemptionOrCredit.newImmigrant
              ? employeeDetails.increaseDay
                ? `${plusZiro(employeeDetails.increaseDay)}/${plusZiro(
                    employeeDetails.increaseMonth
                  )}/${employeeDetails.increaseYear}`
                : ''
              : ''
          }`
        : 'לא',
      'עולה חדש/ה אין הכנסה...': `${
        taxExemptionOrCredit.newImmigrant
          ? taxExemptionOrCredit['newImmigrant-no-incomeDay']
            ? `מ-${plusZiro(
                taxExemptionOrCredit['newImmigrant-no-incomeDay']
              )}/${plusZiro(
                taxExemptionOrCredit['newImmigrant-no-incomeMonth']
              )}/${taxExemptionOrCredit['newImmigrant-no-incomeYear']}`
            : ''
          : '-'
      }`,
      'בן זוג ללא הכנסה...': taxExemptionOrCredit['partner-non-income']
        ? 'כן'
        : 'לא',
      'חד הורי (חי בנפרד)': taxExemptionOrCredit['one-parent'] ? 'כן' : 'לא',
      'הילדים שבחזקתי בשנת המס': taxExemptionOrCredit['kids-whit-me']
        ? taxExemptionOrCredit['kidsWhitMe-bornt-this-year'] || '-'
        : '-',
      'הילדים שבחזקתי מגיל-6-17': taxExemptionOrCredit['kids-whit-me']
        ? taxExemptionOrCredit['kidsWhitMe-u6-u17-this-year'] || '-'
        : '-',
      'הילדים שבחזקתי מגיל-1-5': taxExemptionOrCredit['kids-whit-me']
        ? taxExemptionOrCredit['kidsWhitMe-u5-this-year'] || '-'
        : '-',
      'הילדים שבחזקתי שימלאו 18 בשנת המס': taxExemptionOrCredit['kids-whit-me']
        ? taxExemptionOrCredit['kidsWhitMe-u18-this-year'] || '-'
        : '-',
      'הילדים הפעוטים שנולדו בשנת המס':
        taxExemptionOrCredit['little-kids'] &&
        taxExemptionOrCredit['littleKids-new-kids']
          ? taxExemptionOrCredit['littleKids-new-kids'] || ''
          : '',
      'הילדים הפעוטים מגיל-1-5':
        taxExemptionOrCredit['little-kids'] &&
        taxExemptionOrCredit['littleKids-five-years-ago']
          ? taxExemptionOrCredit['littleKids-five-years-ago'] || '-'
          : '-',
      'הורה יחיד לילדים שבחזקתי': taxExemptionOrCredit[
        'I-am-a-single-parent-to-my-children-in-my-custody'
      ]
        ? 'כן'
        : 'לא',
      'ילדים שאינם בחזקתי': taxExemptionOrCredit[
        'children-who-are-not-in-my-possession'
      ]
        ? 'כן'
        : 'לא',
      'ילדים עם מוגבלויות': taxExemptionOrCredit['children-with-disabilities']
        ? taxExemptionOrCredit[
            'children-with-disabilities-num-kids-disabilities-u19'
          ] || '-'
        : '-',
      'תשלום מזונות': taxExemptionOrCredit['alimony-ex'] ? 'כן' : 'לא',
      'בגיל שבין 16 - ל-18': taxExemptionOrCredit['my-partner-is-u16']
        ? ' כן'
        : 'לא',
      'חייל משוחרר - תחילת שירות': taxExemptionOrCredit['im-soldier']
        ? taxExemptionOrCredit['im-soldier-start-serviceDay']
          ? `${plusZiro(
              taxExemptionOrCredit['im-soldier-start-serviceDay']
            )}/${plusZiro(
              taxExemptionOrCredit['im-soldier-start-serviceMonth']
            )}/${taxExemptionOrCredit['im-soldier-start-serviceYear']}`
          : '-'
        : '-',
      'חייל משוחרר - סיום שירות': taxExemptionOrCredit['im-soldier']
        ? taxExemptionOrCredit['im-soldier-finish-serviceDay']
          ? `${plusZiro(
              taxExemptionOrCredit['im-soldier-finish-serviceDay']
            )}/${plusZiro(
              taxExemptionOrCredit['im-soldier-finish-serviceMonth']
            )}/${taxExemptionOrCredit['im-soldier-finish-serviceYear']}`
          : '-'
        : '-',
      'סיום לימודים אקדמאים': taxExemptionOrCredit['collegeDegree']
        ? 'כן'
        : 'לא',
      ' תיאום מס - לא הייתה הכנסה...':
        taxCoordination.taxCoordination &&
        taxCoordination.taxCoordinationIncome === 'no'
          ? 'כן'
          : 'לא',
      ' תיאום מס - יש לי הכנסה...':
        taxCoordination.taxCoordination &&
        taxCoordination.taxCoordinationIncome === 'yes'
          ? 'כן'
          : 'לא',
      ' תיאום מס - פקיד השומה אישר...':
        taxCoordination.taxCoordination &&
        taxCoordination.taxCoordinationIncome === 'official'
          ? 'כן'
          : 'לא'
    };

    let newObjForm = MergeRecursive(form, addFiles(files));

    allForms.push(newObjForm);
  }

  return allForms;
}

// return the status user in hebrow
function maritalStatus(status) {
  let sta;

  switch (status) {
    case 'bachelor':
      sta = 'רווק/ה';
      break;
    case 'married':
      sta = 'נשוי/אה';
      break;
    case 'divorcee':
      sta = 'גרוש/ה';
      break;
    case 'widower':
      sta = 'אלמן/ה';
      break;
    case 'separated':
      sta = 'פרוד/ה';
      break;

    default:
      console.log('Dont find status');
  }

  return sta;
}

// return normal dete
function plusZiro(num) {
  let n = parseFloat(num);
  if (n <= 9) {
    return `0${n}`;
  } else {
    return n;
  }
}

// return income
function switchIncome(income) {
  let inc;

  if (income.monthlySalary) inc = ' משכורת חודש';
  else if (income.extraSalary) inc = ' משכורת בעד משרה נוספת';
  else if (income.PartialSalary) inc = ' משכורת חלקית';
  else if (income.salary) inc = 'שכר עבודה (עובד יומי)';
  else if (income.allowance) inc = 'קצבה';
  else if (income.scholarship) inc = 'מלגה';

  return inc;
}

// add files link to json
function addFiles(files) {
  let newFiles = {};

  for (const key in files) {
    if (Object.hasOwnProperty.call(files, key)) {
      const file = files[key];
      newFiles[`קובץ ${file.filename}`] = file.path;
    }
  }

  return newFiles;
}
// retuen other-incomes details
function otherIncomesDetails(otherIncomes) {
  if (otherIncomes.acceptAgainstMyIncome === 'no')
    return 'אבקש לקבל נקודות זיכוי...';
  else if (otherIncomes.acceptAgainstMyIncome === 'yes')
    return 'מקבל/ת נקודות זיכוי...';
  else if (otherIncomes.setAsideAgainstMyOtherIncome)
    return 'אין מפרישים עבורי לקרן...';
  else if (otherIncomes.setAsideAgainstLoss)
    return 'אין מפרישים עבורי לקצבה...';
  else return '-';
}

// Recursively merge properties of two objects

function MergeRecursive(obj1, obj2) {
  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if (obj2[p].constructor === Object) {
        obj1[p] = MergeRecursive(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch (e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];
    }
  }

  return obj1;
}
export default newJson;
