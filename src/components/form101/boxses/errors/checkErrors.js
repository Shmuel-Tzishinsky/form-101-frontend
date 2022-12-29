import { checkIdIsraeli } from "../../components/IdComp";
import { checkNumPhone } from "../EmployeeDetails";
import { getAge } from "../TaxExemptionOrCredit";

let errors = [];
let maritalStatusNotMarried = ["bachelor", "divorcee", "widower", "separated"];

// Check if string has only hebrow
function hebrowText(str, loc) {
  let check;
  for (let i = 0; i < str?.length; i++) {
    check = /[\u0590-\u05FF]/.test(`${str[i]}`);

    if (str[i] === " ") continue;

    if (!check) {
      errors.push({
        error: true,
        position: loc,
        data: "ניתן להכניס רק אותיות ובעברית בלבד",
      });
      break;
    }
  }
}

// בדיקת תקינות התעודת זהות
const checkId = (idBy, id) => {
  if (idBy === "id" && id?.length >= 9) {
    const f = !checkIdIsraeli(id);
    return (
      f &&
      errors.push({
        error: f,
        position: "ב. פרטי העובד/ת - תעודת זהות",
        data: `מספר הת.ז. לא חוקית`,
      })
    );
  } else if (idBy === "passport" && id?.length >= 8) {
    const regex = new RegExp("^(?!^0+$)[a-zA-Z0-9]{3,20}$");
    const f = !regex.test(id);
    return (
      f &&
      errors.push({
        error: f,
        position: "ב. פרטי העובד/ת - מספר הדרכון",
        data: `מספר הדרכון לא חוקי`,
      })
    );
  } else {
    return errors.push({
      error: !0,
      position: `ב. פרטי העובד/ת  - ${idBy === "id" ? "תעודת זהות" : "דרכון"}`,
      data: `${idBy === "id" ? "הת.ז." : "הדרכון"} קצרה מידי`,
    });
  }
};

// בדיקת תקינות מספר הפלאפון
const checkPhone = (phone, pos) => {
  // אם המספר כולל טקסט שהוא לא מספרים
  if (!/^\d+$/.test(phone)) {
    return errors.push({
      error: !0, // true
      position: `ב. פרטי העובד/ת  - ${pos === 0 ? "טלפון" : "טלפון נוסף"}`,
      data: `יש להזין מספר בלבד!`,
    });
  } else if (phone.length >= 9 && phone.length <= 10) {
    // אחרי שהאורך נכון בודק את תקינות המספר
    let check = checkNumPhone(phone);
    return (
      check &&
      errors.push({
        error: !0, // true
        position: `ב. פרטי העובד/ת  - ${pos === 0 ? "טלפון" : "טלפון נוסף"}`,
        data: `יש להזין מספר חוקי!`,
      })
    );
  } else {
    // שגיאת תקינות
    return errors.push({
      error: !0, // true
      position: `ב. פרטי העובד/ת  - ${pos === 0 ? "טלפון" : "טלפון נוסף"}`,
      data: `המספר חייב להיות באורך תקין!`,
    });
  }
};

//  אני עולה חדש/ה
const newImmigrant = (allData) => {
  if (
    allData.taxExemptionOrCredit.newImmigrant &&
    (allData.employeeDetails.increaseYear === null ||
      allData.employeeDetails.increaseMonth === null ||
      allData.employeeDetails.increaseDay === null)
  ) {
    return errors.push({
      error: true,
      position: `ח.אני מבקש/ת פטור או זיכוי ממס מהסיבות הבאות \n
             4: אני עולה חדש/ה`,
      data: `לא ניתן לבחור מכיוון שלא ציינת תאריך עלייה בסעיף ב.`,
    });
  }
};

// בגין בן/בת זוגי המתגורר/ת עימי ואין לו/לה הכנסות בשנת המס
const partnerNonIncome = (allData) => {
  if (
    allData.taxExemptionOrCredit["partner-non-income"] &&
    allData.employeeDetails.maritalStatus !== "married"
  ) {
    return errors.push({
      error: true,
      position: `ח.אני מבקש/ת פטור או זיכוי ממס מהסיבות הבאות \n
            5:  בגין בן/בת זוגי המתגורר/ת עימי ואין לו/לה הכנסות בשנת המס`,
      data: `ניתן לסמן רק אם ציינת בסעיף ב' שהינך נשוי/אה.`,
    });
  }
};

// אני הורה במשפחה חד הורית החי בנפרד
const oneParent = (allData) => {
  if (
    allData.taxExemptionOrCredit["one-parent"] &&
    allData.children.filter((it) => it?.kidsPension && it?.myKidPossession)
      .length === 0
  ) {
    return errors.push({
      error: true,
      position: `ח.אני מבקש/ת פטור או זיכוי ממס מהסיבות הבאות \n
            6: אני הורה במשפחה חד הורית החי בנפרד`,
      data: `לא ניתן לבחור מכיוון שלא ציינת בסעיף ג' ילדים בגינם הינךמקבל/ת קצבת ילדים מביטוח לאומי.`,
    });
  }
};

// בגין ילדי שבחזקתי המפורטים בסעיף ג
const kidsWhitMe = (allData) => {
  if (allData.taxExemptionOrCredit["kids-whit-me"]) {
    if (
      // אינך נשוי/אה ודיווחת על ילדים הנמצאים בחזקתך, בגינם הינך  מקבל/ת קצבת ילדים מהביטוח הלאומי.
      (allData.employeeDetails?.maritalStatus !== "married" &&
        allData.children.filter((it) => it?.kidsPension && it?.myKidPossession)
          .length >= 1) ||
      // הינך אישה נשואה
      (allData.employeeDetails?.maritalStatus === "married" &&
        allData.employeeDetails?.gender === "woman") ||
      // סימנת את שדה 9 - אני הורה יחיד לילדי שבחזקתי
      allData.taxExemptionOrCredit[
        "I-am-a-single-parent-to-my-children-in-my-custody"
      ]
    ) {
    } else {
      return errors.push({
        error: true,
        position: `ח.אני מבקש/ת פטור או זיכוי ממס מהסיבות הבאות \n
                7:  בגין ילדי שבחזקתי המפורטים בסעיף ג`,
        data: `ניתן לסמן רק אם מתקיימם אחד מהתנאים הבאים: \n\n
                      1. אינך נשוי/אה ודיווחת על ילדים הנמצאים בחזקתך, בגינםהינך מקבל/ת קצבת ילדים מהביטוח הלאומי. \n
                      2. הינך אישה נשואה.\n
                      3. סימנת את שדה 9 - אני הורה יחיד לילדי שבחזקתי.`,
      });
    }
  } else if (
    allData.taxExemptionOrCredit[
      "I-am-a-single-parent-to-my-children-in-my-custody"
    ] &&
    !allData.taxExemptionOrCredit["little-kids"]
  ) {
    return errors.push({
      error: true,
      position: `ח.אני מבקש/ת פטור או זיכוי ממס מהסיבות הבאות \n
            7: בגין ילדי שבחזקתי המפורטים בסעיף ג`,
      data: `חובה לסמן סעיף זה או סעיף 8 משום שסימנת את סעיף 9.`,
    });
  }
};

//  בגין ילדי הפעוטים
const littleKids = (allData) => {
  if (allData.taxExemptionOrCredit["little-kids"]) {
    if (
      // הינך גבר נשוי.
      (allData.employeeDetails?.maritalStatus === "married" &&
        allData.employeeDetails?.gender === "men") ||
      // אינך נשוי/אה וסעיף 7 לעיל לא סומן.
      ((maritalStatusNotMarried.includes(
        allData.employeeDetails?.maritalStatus
      ) ||
        !allData.employeeDetails?.maritalStatus) &&
        !allData.taxExemptionOrCredit["kids-whit-me"]) ||
      // הינך אישה, לא נשואה ואחד או יותר מילדיך אינם בחזקתך.
      ((maritalStatusNotMarried.includes(
        allData.employeeDetails?.maritalStatus
      ) ||
        !allData.employeeDetails?.maritalStatus) &&
        allData.employeeDetails?.gender === "woman" &&
        allData.children.length >= 1 &&
        allData.children.filter((it) => it?.myKidPossession).length === 0) ||
      // סימנת את שדה 9 - אני הורה יחיד לילדי שבחזקתי
      allData.taxExemptionOrCredit[
        "I-am-a-single-parent-to-my-children-in-my-custody"
      ]
    ) {
    } else {
      return errors.push({
        error: true,
        position: `ח.אני מבקש/ת פטור או זיכוי ממס מהסיבות הבאות \n
               8: בגין ילדי הפעוטים`,
        data: `ניתן לסמן רק אם מתקיימם אחד מהתנאים הבאים:\n\n
               1. הינך גבר נשוי.\n
               2. אינך נשוי/אה וסעיף 7 לעיל לא סומן.\n
               3. הינך אישה, לא נשואה ואחד או יותר מילדיך אינם בחזקתך.\n
               4. סימנת את סעיף 9 - אני הורה יחיד לילדי שבחזקתי.`,
      });
    }
  } else if (
    allData.taxExemptionOrCredit[
      "I-am-a-single-parent-to-my-children-in-my-custody"
    ] &&
    !allData.taxExemptionOrCredit["kids-whit-me"]
  ) {
    return errors.push({
      error: true,
      position: `ח.אני מבקש/ת פטור או זיכוי ממס מהסיבות הבאות \n
            8: בגין ילדי הפעוטים`,
      data: `חובה לסמן סעיף זה או סעיף 7 משום שסימנת את סעיף 9.`,
    });
  }
};

// .בגין ילדי שאינם בחזקתי המפורטים בסעיף ג ואני משתתף/ת בכלכלתם.
const childrenWhoSreNotInMyPossession = (allData) => {
  if (
    allData.taxExemptionOrCredit["children-who-are-not-in-my-possession"] &&
    allData.children.filter((it) => it?.myKidPossession !== true).length === 0
  ) {
    return errors.push({
      error: true,
      position: `ח.אני מבקש/ת פטור או זיכוי ממס מהסיבות הבאות \n
               10:  בגין ילדי שאינם בחזקתי המפורטים בסעיף ג ואני משתתף/ת בכלכלתם.`,
      data: `לא ניתן לסמן משום שלא ציינת בסעיף ג' ילדים שאינם בחזקתך.`,
    });
  }
};

// בגין מזונות לבן/בת זוגי לשעבר.
const alimonyEx = (allData) => {
  if (
    allData.taxExemptionOrCredit["alimony-ex"] &&
    allData.employeeDetails?.maritalStatus !== "married"
  ) {
    return errors.push({
      error: true,
      position: `ח.אני מבקש/ת פטור או זיכוי ממס מהסיבות הבאות \n
               12: בגין מזונות לבן/בת זוגי לשעבר.`,
      data: `לא ניתן לסמן משום שלא ציינת בסעיף ב' שהינך נשוי/אה.`,
    });
  }
};

// מלאו לי או לבן/בת זוגי 16 שנים וטרם מלאו לי או לבן/בת זוגי 18 שנים בשנת המס.
const myPartnerIsU16 = (allData) => {
  const getYearBirth = getAge(allData.employeeDetails?.birthYear);

  if (allData.taxExemptionOrCredit["my-partner-is-u16"]) {
    if (
      !allData.employeeDetails?.birthYear &&
      isNaN(getYearBirth) &&
      !allData.employeeDetails?.birthMonth &&
      !allData.employeeDetails?.birthDay
    ) {
      return errors.push({
        error: true,
        position: `ח.אני מבקש/ת פטור או זיכוי ממס מהסיבות הבאות \n
                13: מלאו לי או לבן/בת זוגי 16 שנים וטרם מלאו לי או לבן/בת זוגי 18 שנים בשנת המס.`,
        data: `לא ניתן לסמן משום שלא ציינת תאריך לידה בסעיף ב'.`,
      });
    } else if (getYearBirth < 16 || getYearBirth > 18) {
      return errors.push({
        error: true,
        position: `ח.אני מבקש/ת פטור או זיכוי ממס מהסיבות הבאות \n
                13: מלאו לי או לבן/בת זוגי 16 שנים וטרם מלאו לי או לבן/בת זוגי 18 שנים בשנת המס.`,
        data: `לא ניתן לסמן משום שימלאו לך ${getYearBirth} שנים בשנת המס.`,
      });
    }
  }
};

// הצהרה וחתימת המבקש
const hijnm = (allData, setAllData, sigPad, setSigPad) => {
  if (!sigPad.isEmpty()) {
    setAllData((values) => ({
      ...values,
      statementAndSignature: {
        wrapperCanvas: sigPad.getTrimmedCanvas().toDataURL("image/png"),
        error: false,
      },
    }));
  } else {
    setAllData((values) => ({
      ...values,
      statementAndSignature: { error: true },
    }));
    return errors.push({
      error: true,
      position: `י. חתימת המבקש`,
      data: `חובה לחתום על הטופס`,
    });
  }
};

export const checkErrors = (allData, setAllData, sigPad, setSigPad) => {
  errors = [];

  // הצהרה וחתימת המבקש
  hijnm(allData, setAllData, sigPad, setSigPad);

  // בדיקת תקינות התעודת זהות
  checkId(allData.employeeDetails.idBy, allData.employeeDetails["id-employee"]);

  // בדיקת תקינות של שם
  hebrowText(allData.employeeDetails.firstName, "ב. פרטי העובד/ת - שם פרטי");

  // בדיקת תקינות של משפחת
  hebrowText(allData.employeeDetails.lastName, "ב. פרטי העובד/ת - שם משפחה");

  // בדיקת תקינות מספר הפלאפון
  checkPhone(allData.employeeDetails.phone, 0);

  // בדיקת תקינות מספר הפלאפון השני
  allData.employeeDetails.anotherPhone &&
    checkPhone(allData.employeeDetails.anotherPhone, 1);

  // אני עולה חדש/ה
  newImmigrant(allData);

  // בגין בן/בת זוגי המתגורר/ת עימי ואין לו/לה הכנסות בשנת המס
  partnerNonIncome(allData);

  // אני הורה במשפחה חד הורית החי בנפרד
  oneParent(allData);

  // בגין ילדי שבחזקתי המפורטים בסעיף ג
  kidsWhitMe(allData);

  // בגין ילדי הפעוטים
  littleKids(allData);

  // .בגין ילדי שאינם בחזקתי המפורטים בסעיף ג ואני משתתף/ת בכלכלתם.
  childrenWhoSreNotInMyPossession(allData);

  // בגין מזונות לבן/בת זוגי לשעבר.
  alimonyEx(allData);

  // מלאו לי או לבן/בת זוגי 16 שנים וטרם מלאו לי או לבן/בת זוגי 18 שנים בשנת המס.
  myPartnerIsU16(allData);

  return errors;
};
