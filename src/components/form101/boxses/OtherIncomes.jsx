import React, { useState } from "react";
import ToolTip from "../components/ToolTip";

function deRequireCb(elClass) {
  let el = document.querySelectorAll(`.${elClass}`);

  let atLeastOneChecked = false; //at least one cb is checked
  for (let i = 0; i < el.length; i++) {
    if (el[i].checked === true) {
      atLeastOneChecked = true;
    }
  }

  if (atLeastOneChecked === true) {
    for (let i = 0; i < el.length; i++) {
      el[i].required = false;
    }
  } else {
    for (let i = 0; i < el.length; i++) {
      el[i].required = true;
    }
  }
}

// checkbox מאפשרת בחירה אחת מתוך קבוצה של
function onlyOne(checkbox, handleChange) {
  document
    .querySelectorAll(`.${checkbox.target.className.split(" ")[0]}`)
    .forEach(
      (item) =>
        item !== checkbox.target && ((item.checked = !1), handleChange(item))
    );
}

function OtherIncomes({ setAllData, allData }) {
  const [otherIncomes, setOtherIncomes] = useState({
    dontHeve: !1,
    other: !1,
  });

  const handleChange = (e) => {
    const name = e.name || e.target.name;
    let value;
    if (!e.target) {
      value = e.checked;
    } else {
      if (e.target.attributes.type.textContent === "checkbox") {
        value = e.target.checked;
      } else {
        value = e.target.value;
      }
    }

    setAllData((values) => ({
      ...values,
      otherIncomes: { ...values.otherIncomes, [name]: value },
    }));
  };

  const handleChangeAndDeleteTaxExemptionOrCredit = (e) => {
    handleChange(e);
    setAllData((values) => ({
      ...values,
      taxExemptionOrCredit: {},
    }));
  };

  return (
    // <!-- פרטים על הכנסות אחרות -->
    <div className="myContainer incomesSalary">
      <h4>ה. פרטים על הכנסות אחרות</h4>

      <div className="label">
        <span> * </span>פירוט הכנסות
      </div>
      <div className="flex flex-column">
        <label className="m-t05">
          <div className="label-radio">
            <input
              type="radio"
              name="incomesSalaryOhter"
              onClick={(e) => {
                setOtherIncomes({ ...otherIncomes, dontHeve: !1 });
                setAllData((values) => ({
                  ...values,
                  otherIncomes: { incomesSalaryOhter: "false" },
                }));
              }}
              value="false"
              required
            />
            אין לי הכנסות אחרות ממשכורת (משכורת חודש, בעד משרה נוספת, משכורת
            חלקית, שכר עבודה), מקצבה, ממלגה
            <ToolTip
              id="otherIncomes"
              contact={
                <p>לרבות מענק, פרס או פטור מתשלום שניתן לסטודנט או לחוקר.</p>
              }
            />
          </div>
        </label>
        <label className="m-t05">
          <div className="label-radio">
            <input
              type="radio"
              name="incomesSalaryOhter"
              value={"true"}
              onClick={(e) => {
                setOtherIncomes({ ...otherIncomes, dontHeve: !0 });
                handleChange(e);
              }}
              required
            />
            יש לי הכנסות נוספות כמפורט להלן
          </div>
        </label>
      </div>

      {otherIncomes.dontHeve ? (
        <div className="open-options-down">
          <div className="flex m-t1 flex-column">
            <div className="flex info">
              <div className="label-checkbox">
                <label>
                  <input
                    required
                    type="checkbox"
                    onClick={(e) => {
                      onlyOne(e, handleChange);
                      deRequireCb("asdgfdgdsa");
                      handleChange(e);
                    }}
                    className="otherIncomesSalaryType123 asdgfdgdsa"
                    name="monthlySalary"
                  />
                  משכורת חודש
                </label>
                <ToolTip
                  id="incomeFromThisEmployer-1-1"
                  contact={
                    <p>
                      <span>
                        <strong>משכורת חודש</strong> - משכורת בעד עבודה של לא
                        פחות מ - 18 יום בחודש.
                      </span>
                    </p>
                  }
                />
              </div>

              <div className="label-checkbox">
                <label>
                  <input
                    required
                    type="checkbox"
                    onClick={(e) => {
                      onlyOne(e, handleChange);
                      deRequireCb("asdgfdgdsa");
                      handleChange(e);
                    }}
                    className="otherIncomesSalaryType123 asdgfdgdsa"
                    name="extraSalary"
                  />
                  משכורת נוספת
                </label>
                <ToolTip
                  id="incomeFromThisEmployer-1-2"
                  contact={
                    <p>
                      <span>
                        <strong>משכורת בעד משרה נוספת</strong> - משכורת בעד
                        עבודה של יותר מ - 5 שעות ביום, נוסף למשכורת ו/או בנוסף
                        לקצבה החייבת במס ממקום אחר. העובד רשאי לבחור את מקום
                        העבודה בו תחשב משכורתו כ"משכורת בעד משרה נוספת".
                      </span>
                    </p>
                  }
                />
              </div>

              <div className="label-checkbox">
                <label>
                  <input
                    required
                    type="checkbox"
                    onClick={(e) => {
                      onlyOne(e, handleChange);
                      deRequireCb("asdgfdgdsa");
                      handleChange(e);
                    }}
                    className="otherIncomesSalaryType123 asdgfdgdsa"
                    name="PartialSalary"
                  />
                  משכורת חלקית
                </label>
                <ToolTip
                  id="incomeFromThisEmployer-1-3"
                  contact={
                    <p>
                      <span>
                        <strong>משכורת חלקית</strong> - משכורת בעד עבודה של 5
                        שעות או פחות ליום או משכורת בעד עבודה במשך יותר מ-5 שעות
                        ליום אך פחות מ-8 שעות בשבוע. ממשכורת חלקית ינוכה מס
                        בשיעור מירבי אלא אם כן זו הכנסה יחידה שאז ינוכה מס לפי
                        לוח הניכויים.
                      </span>
                    </p>
                  }
                />
              </div>
              <div className="label-checkbox">
                <label>
                  <input
                    required
                    type="checkbox"
                    onClick={(e) => {
                      onlyOne(e, handleChange);
                      deRequireCb("asdgfdgdsa");
                      handleChange(e);
                    }}
                    className="otherIncomesSalaryType123 asdgfdgdsa"
                    name="salary"
                  />
                  שכר עבודה (יומי)
                </label>
                <ToolTip
                  id="incomeFromThisEmployer-1-4"
                  contact={
                    <p>
                      <span>
                        <strong>שכר עבודה</strong> - משכורת בעד עבודה של פחות מ
                        - 18 יום בחודש אך לא פחות מ - 8 שעות בשבוע. משכר עבודה
                        ינוכה מס לפי לוח יומי אלא אם כן זו הכנסה יחידה שאז ינוכה
                        מס לפי לוח הניכויים.
                      </span>
                    </p>
                  }
                />
              </div>
              <div className="label-checkbox">
                <label>
                  <input
                    required
                    type="checkbox"
                    onClick={(e) => {
                      deRequireCb("asdgfdgdsa");
                      handleChange(e);
                    }}
                    name="allowance"
                    className="asdgfdgdsa"
                  />
                  קצבה
                </label>
                <ToolTip
                  id="incomeFromThisEmployer-1-5"
                  contact={
                    <p>
                      <span>
                        <strong>קצבה </strong>- אין לדווח על קצבה פטורה מביטוח
                        לאומי וקצבת שאירים שכולה פטורה.
                      </span>
                    </p>
                  }
                />
              </div>
              <div className="label-checkbox">
                <label>
                  <input
                    required
                    type="checkbox"
                    onClick={(e) => {
                      deRequireCb("asdgfdgdsa");
                      handleChange(e);
                    }}
                    name={"scholarship"}
                    className="asdgfdgdsa"
                  />
                  מלגה
                </label>
                <ToolTip
                  id="incomeFromThisEmployer-1-6"
                  contact={
                    <p>
                      <span>
                        <strong>מלגה </strong>- לרבות מענק, פרס או פטור מתשלום
                        שניתן לסטודנט או לחוקר.
                      </span>
                    </p>
                  }
                />
              </div>
            </div>
          </div>
          {/* 
        <div className="flex flex-column">
          <label>
            <input
              required
              type="checkbox"
              name="anotherSource"
              className="asdgfdgdsa"
              onClick={(e) => {
                setOtherIncomes({ ...otherIncomes, other: e.target.checked });
                deRequireCb("asdgfdgdsa");
                handleChange(e);
              }}
            />
            מקור אחר
          </label>
          {
            otherIncomes.other ? (<div className="input requiredHolder m-t1">
            <label className="m-t1">
              <div className="label">
                <span> * </span>פירוט מקור הכנסה אחר
              </div>
              <div className="flex">
                <input required type="text" name="incomeBreakdown" onChange={handleChange}/>
              </div>
            </label>
          </div>) : ""
          }
          
        </div> */}

          <br />

          <div className="flex flex-column">
            <div className="label">
              <span> * </span>נקודות זיכוי
              <ToolTip
                id="otherIncomes-iseucn9VDSVGFSDFV8vgr"
                contact={
                  <p>
                    <b>אם העובד בוחר באפשרות השניה</b> - המעביד מנוע מלנכות מס
                    לפי לוח הניכויים ויש לנכות מס מירבי לפי התקנות מכל תשלומי
                    המעביד.
                  </p>
                }
              />
            </div>
            <div className="label-radio">
              <input
                required
                type="radio"
                name="acceptAgainstMyIncome"
                value={"no"}
                id="acceptAgainstMyIncome-no"
                onChange={handleChange}
              />
              <label className="m-t1" htmlFor="acceptAgainstMyIncome-no">
                <span>
                  אבקש לקבל נקודות זיכוי ומדרגות מס כנגד הכנסתי זו (סעיף ד).
                  איני מקבל/ת אותם בהכנסה אחרת.
                </span>
              </label>
            </div>
            <div className="label-radio">
              <input
                required
                type="radio"
                id="acceptAgainstMyIncome-yes"
                name="acceptAgainstMyIncome"
                value={"yes"}
                onChange={handleChangeAndDeleteTaxExemptionOrCredit}
              />
              <label htmlFor="acceptAgainstMyIncome-yes">
                <span>
                  {" "}
                  אני מקבל/ת נקודות זיכוי ומדרגות מס בהכנסה אחרת ועל כן איני
                  זכאי/ת להם כנגד הכנסה זו.
                </span>
              </label>
            </div>
          </div>
          <br />

          <div className="flex m-t1 flex-column ">
            <div className="label">
              {" "}
              הפרשות
              <ToolTip
                id="otherIncomes-iseucn98vgr"
                contact={
                  <p>
                    <span>
                      {" "}
                      <strong>אם העובד לא בחר באפשרות בחירה הראשונה </strong>
                    </span>
                    <span>
                      {" "}
                      - על המעביד לצרף למשכורת את סכומי ההפרשות לקרן השתלמות
                      ולנכות מס לפי התקנות או לפעול לפי אישור תיאום מס מפקיד
                      השומה.ר.
                    </span>
                    <br />
                    <br />
                    <span>
                      {" "}
                      <strong>אם העובד לא בחר באפשרות בחירה השניה</strong>
                    </span>
                    <span>
                      {" "}
                      - על המעביד לצרף למשכורת את סכומי ההפרשות לקצבה/לאובדן
                      כושר עבודה ולנכות מס לפי התקנות או לפעול לפי אישור תיאום
                      מס מפקיד השומה.
                    </span>
                  </p>
                }
              />
            </div>
            <label className="m-t05">
              <input
                type="checkbox"
                name="setAsideAgainstMyOtherIncome"
                onClick={(e) => {
                  handleChange(e);
                }}
              />
              אין מפרישים עבורי לקרן השתלמות בגין הכנסתי האחרת, או שכל הפרשות
              המעביד לקרן השתלמות בגין הכנסתי האחרת מצורפות להכנסתי האחרת.
            </label>
            <label className="m-t1">
              <input
                type="checkbox"
                name="setAsideAgainstLoss"
                onClick={(e) => {
                  handleChange(e);
                }}
              />
              אין מפרישים עבורי לקצבה/לביטוח אובדן כושר עבודה/פיצויים בגין
              הכנסתי האחרת, או שכל הפרשות המעביד לקצבה/לביטוח אובדן כושר
              עבודה/פיצויים בגין הכנסתי האחרת מצורפות להכנסתי האחרת.{" "}
            </label>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default OtherIncomes;
