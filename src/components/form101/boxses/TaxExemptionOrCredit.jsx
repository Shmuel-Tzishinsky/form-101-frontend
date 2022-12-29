import React, { useState } from "react";
import Files from "../components/Files";
import ToolTip from "../components/ToolTip";
import DateInput from "../components/Date";
import { citiesInPermanentResident } from "../data/sttlement-qualifying";

let maritalStatusNotMarried = ["bachelor", "divorcee", "widower", "separated"];

export function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const setOptions = () => {
  const allOption = citiesInPermanentResident;

  allOption.sort(function (a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });

  return allOption;
};

function TaxExemptionOrCredit({ setAllData, allData }) {
  const [selectCiti, setSelectCiti] = useState("");
  const [openOption, setOpenOption] = useState("");
  const [allOption, setAllOption] = useState(setOptions());

  const setCiti = (e) => {
    if (e !== allData.taxExemptionOrCredit.citi) {
      setAllData((values) => ({
        ...values,
        taxExemptionOrCredit: {
          ...values.taxExemptionOrCredit,
          citi: e,
        },
      }));
    }

    setSelectCiti(e);
  };

  const serchInput = (ev) => {
    const value = ev.target.value;
    if (value.length > 0) {
      let filt = citiesInPermanentResident.filter((e) => e.includes(value));
      filt.length === 0 && filt.push("----");
      setAllOption(filt);
      setOpenOption("open-option-dropDown");
    } else {
      setOpenOption("");
    }

    setCiti(value);
  };

  let thisYear = new Date();
  const getYearBirth = getAge(allData.employeeDetails?.birthYear);

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setAllData((values) => ({
      ...values,
      taxExemptionOrCredit: { ...values.taxExemptionOrCredit, [name]: value },
    }));
  };

  return (
    // <!-- אני מבקש/ת פטור או זיכוי ממס מהסיבות הבאות -->
    <div className="myContainer">
      <h4>ח. אני מבקש/ת פטור או זיכוי ממס מהסיבות הבאות</h4>
      {allData.otherIncomes?.acceptAgainstMyIncome === "yes" &&
      allData.otherIncomes?.incomesSalaryOhter === "true" ? (
        <p className="alert">
          לא ניתן לבקש פטור או זיכוי ממס משום שסימנת בסעיף ה' שהינך מקבל/ת
          נקודות זיכוי ומדרגות מס בהכנסה אחרת.
        </p>
      ) : (
        <>
          {/* <!-- 1 --> */}
          <fieldset className="m-t1">
            <div className="panel-default">
              <label>
                <input
                  type="checkbox"
                  checked={
                    allData.employeeDetails?.israeliResident === "yes"
                      ? true
                      : false
                  }
                  readOnly
                />
                1. אני תושב/ת ישראל
              </label>
              <ToolTip
                id="hnfcu4wh0tfgt48wretehf"
                contact={
                  <p>מסומן אוטומטית אם סימנת שהינך תושב/ת ישראל בסעיף ב'.</p>
                }
              />
            </div>
          </fieldset>
          {/* <!-- 2 --> */}
          <fieldset className="m-t1">
            <div className="panel-default">
              <label>
                <input
                  type="checkbox"
                  name="handicapped"
                  onClick={handleChange}
                />
                2. אני נכה 100% / עיוור/ת לצמיתות
              </label>
              {allData.taxExemptionOrCredit.handicapped ? (
                <div className=" open-options-down">
                  <div className="label">
                    אישור משרד הביטחון/האוצר/פקיד השומה/תעודת עיוור שהוצאה לאחר
                    1/1/94
                    <ToolTip
                      id={"b5gnsdrhn65dmuhn6"}
                      contact={
                        <p>
                          נא לצרף אישור ממשרד הבטחון / פקיד השומה / תעודת עיוור
                          שהוצאה לאחר 1.1.94
                        </p>
                      }
                    />
                  </div>
                  <Files
                    {...{ allData, setAllData }}
                    nameObj="נכה"
                    required={true}
                  />

                  {allData.otherIncomes?.incomesSalaryOhter !== "false" ? (
                    <div className="error">
                      <br />
                      <p>
                        מכיוון שלא סימנת בפרק ה' כי "אין לי הכנסות אחרות לרבות
                        מלגות", עליך לפנות לפקיד השומה לצורך עריכת תיאום מס.
                        <br />
                        <br />
                        אם יש לך אישור לתיאום מס מפקיד השומה, תוכל לצרף אותו
                        בסעיף ט' של הטופס.
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </fieldset>
          {/* <!-- 3 --> */}
          <fieldset className="m-t1">
            <div className="panel-default">
              <label>
                <input
                  type="checkbox"
                  name="permanentResident"
                  onClick={handleChange}
                />
                3. אני תושב/ת קבוע/ה בישוב מזכה. אני ובני משפחתי מדרגה ראשונה,
                מתגוררים ביישוב ואין לי "מרכז חיים" נוסף.
                <ToolTip
                  id="hnfcu4wh0t8hf"
                  contact={
                    <p>
                      <b>ישוב מזכה</b> - ישוב שחל עליו סעיף 11 לפקודת מס הכנסה
                      או סעיף 11 לחוק אס"ח, לפי העניין.
                    </p>
                  }
                />
              </label>
              {allData.taxExemptionOrCredit.permanentResident ? (
                <div className="flex open-options-down">
                  <DateInput
                    maxWidth={{ style: { maxWidth: "360px" } }}
                    title={"מתאריך"}
                    setAllData={setAllData}
                    nameObj="taxExemptionOrCredit"
                    required={true}
                    name={"permanentResident-from-date"}
                    year={{ max: thisYear.getFullYear(), min: "1960" }}
                    requiredB={true}
                  />

                  <div className="inputHolder">
                    <label>
                      <div className="label">
                        <span> * </span>היישוב
                      </div>
                      <input
                        type="text"
                        autoComplete="off"
                        className="permanentResident-citi"
                        name="permanentResident-citi"
                        onChange={serchInput}
                        onBlur={() => setOpenOption("")}
                        required
                        value={selectCiti}
                      />
                      <div
                        className={`option-dropDown dropDown-permanentResident-citi ${openOption}`}
                      >
                        {allOption.map((e, k) => (
                          <div
                            className="option-dropDown-permanentResident-citi"
                            key={k}
                            onMouseDown={() => e !== "----" && setCiti(e)}
                          >
                            {e}
                          </div>
                        ))}
                      </div>
                    </label>
                  </div>

                  <div className="inputHolder">
                    <div>
                      <div className="label">
                        <span>* </span> אישור של הרשות ע"ג טופס 1312א
                      </div>
                      <Files
                        {...{ allData, setAllData }}
                        nameObj="טופס_1312א"
                        required={true}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </fieldset>
          {/* <!-- 4 --> */}
          <fieldset className="m-t1">
            <div className="panel-default">
              <label>
                <input
                  type="checkbox"
                  name="newImmigrant"
                  onClick={handleChange}
                />
                4. אני עולה חדש/ה
              </label>

              {allData.taxExemptionOrCredit.newImmigrant &&
              allData.employeeDetails.increaseYear &&
              allData.employeeDetails.increaseMonth &&
              allData.employeeDetails.increaseDay ? (
                <div className="flex open-options-down">
                  <DateInput
                    maxWidth={{ style: { maxWidth: "360px" } }}
                    title={
                      "לא הייתה לי הכנסה בישראל מתחילת שנת המס הנוכחית עד תאריך"
                    }
                    setAllData={setAllData}
                    required={true}
                    nameObj="taxExemptionOrCredit"
                    name={"newImmigrant-no-income"}
                    year={{ max: thisYear.getFullYear(), min: "1960" }}
                    helpBleow={
                      'מי שתקופת זכאותו (42 חודש) אינה רצופה בשל שירות חובה בצה"ל, לימודים על תיכוניים או יציאה לחו"ל יפנה לפקיד השומה.'
                    }
                    requiredB={true}
                  />

                  <div className="inputHolder">
                    <div>
                      <div className="label">
                        <span> * </span>תעודת עולה
                      </div>
                      <Files
                        {...{ allData, setAllData }}
                        nameObj="תעודת_עולה"
                        required={true}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                allData.taxExemptionOrCredit.newImmigrant && (
                  <p className="error">
                    לא ניתן לבחור מכיוון שלא ציינת תאריך עלייה בסעיף ב.
                  </p>
                )
              )}
            </div>
          </fieldset>
          {/* <!-- 5 --> */}
          <fieldset className="m-t1">
            <div className="panel-default">
              <label>
                <input
                  type="checkbox"
                  name="partner-non-income"
                  onClick={handleChange}
                />
                5. בגין בן/בת זוגי המתגורר/ת עימי ואין לו/לה הכנסות בשנת המס
              </label>

              {allData.taxExemptionOrCredit["partner-non-income"] &&
              allData.employeeDetails.maritalStatus !== "married" ? (
                <div className="error m-t1">
                  ניתן לסמן רק אם ציינת בסעיף ב' שהינך נשוי/אה.
                </div>
              ) : (
                allData.taxExemptionOrCredit["partner-non-income"] && (
                  <div className="open-options-down">
                    <p>
                      רק אם העובד/ת או בן/בת הזוג הגיע/ה לגיל פרישה או שהוא/היא
                      נכה או עיוור/ת עפ"י סעיף 9(5) לפקודה.
                    </p>
                    <div className="help-below">
                      <p>אישור נכה או עיוור בגין העובד/ת ו/או בן/בת הזוג</p>
                    </div>
                    <Files
                      {...{ allData, setAllData }}
                      nameObj="אישור_נכה_או_עיוור_בגין_העובד_או_בן_הזוג"
                    />
                  </div>
                )
              )}
            </div>
          </fieldset>
          {/* <!-- 6 --> */}
          <fieldset className="m-t1">
            <div className="panel-default">
              <label>
                <input
                  type="checkbox"
                  name="one-parent"
                  onChange={handleChange}
                />
                6. אני הורה במשפחה חד הורית החי בנפרד
                <ToolTip
                  id={"oi3nc8fh832424111111114w"}
                  contact={
                    <p>
                      <b>הורה במשפחה חד הורית הוא אחד מאלה</b>: רווק, גרוש,
                      אלמן, פרוד (עפ"י אישור פקיד שומה בלבד).
                    </p>
                  }
                />
              </label>

              {allData.taxExemptionOrCredit["one-parent"] &&
                allData.children.filter(
                  (it) => it?.kidsPension && it?.myKidPossession
                ).length === 0 && (
                  <div className="error">
                    לא ניתן לבחור מכיוון שלא ציינת בסעיף ג' ילדים בגינם הינך
                    מקבל/ת קצבת ילדים מביטוח לאומי.
                  </div>
                )}
              <label>
                <div className="help-below">
                  <p>
                    ימולא רק ע"י הורה כאמור החי בנפרד ומבקש נקודות זיכוי עבור
                    ילדיו, הנמצאים בחזקתו ובגינם מקבל קצבת ילדים מהמוסד לביטוח
                    לאומי (בהתאם לסעיף 7 להלן) ואינו מנהל משק בית משותף עם
                    יחיד/ה אחר/ת.
                  </p>
                </div>
              </label>
            </div>
          </fieldset>
          {/* <!-- 7 --> */}
          <fieldset className="m-t1">
            <div className="panel-default">
              <label>
                <input
                  type="checkbox"
                  name="kids-whit-me"
                  onChange={handleChange}
                />
                7. בגין ילדי שבחזקתי המפורטים בסעיף ג
                <ToolTip
                  id={"oi3nc8fh84w"}
                  contact={
                    <p>
                      <b>הורה יחיד</b> - הורה במשפחה חד הורית שהיה לו ילד שבשנת
                      המס טרם מלאו לו 19 שנים ושההורה השני של הילד נפטר או שהילד
                      רשום במרשם האוכלוסין בלא פרטי ההורה השני.
                    </p>
                  }
                />
              </label>
              {/* מסומן */}

              {allData.taxExemptionOrCredit["kids-whit-me"] ? (
                (allData.employeeDetails?.maritalStatus !== "married" &&
                  // אינך נשוי/אה ודיווחת על ילדים הנמצאים בחזקתך, בגינם הינך  מקבל/ת קצבת ילדים מהביטוח הלאומי.
                  allData.children.filter(
                    (it) => it?.kidsPension && it?.myKidPossession
                  ).length >= 1) ||
                // הינך אישה נשואה
                (allData.employeeDetails?.maritalStatus === "married" &&
                  allData.employeeDetails?.gender === "woman") ||
                // סימנת את שדה 9 - אני הורה יחיד לילדי שבחזקתי
                allData.taxExemptionOrCredit[
                  "I-am-a-single-parent-to-my-children-in-my-custody"
                ] ? (
                  <div className="flex m-t1 flex-between open-options-down">
                    <div className="inputHolder">
                      <label>
                        <div className="label">
                          <span> * </span>מספר ילדים שנולדו בשנת המס
                        </div>
                        <input
                          type="number"
                          min={"0"}
                          max={"13"}
                          name="kidsWhitMe-bornt-this-year"
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>

                    <div className="inputHolder">
                      <label>
                        <div className="label">
                          <span> * </span>מספר ילדים שימלאו להם שנה אחת עד 5
                          שנים בשנת המס
                        </div>
                        <input
                          type="number"
                          min={"0"}
                          max={"13"}
                          name="kidsWhitMe-u5-this-year"
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>

                    <div className="inputHolder">
                      <label>
                        <div className="label">
                          <span> * </span>מספר ילדים שימלאו להם 6 שנים עד 17
                          שנים בשנת המס
                        </div>
                        <input
                          type="number"
                          min={"0"}
                          max={"13"}
                          name="kidsWhitMe-u6-u17-this-year"
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>

                    <div className="inputHolder">
                      <label>
                        <div className="label">
                          <span> * </span>מספר ילדים שימלאו להם 18 שנים בשנת המס
                        </div>
                        <input
                          type="number"
                          min={"0"}
                          max={"13"}
                          name="kidsWhitMe-u18-this-year"
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="error">
                    <p>ניתן לסמן רק אם מתקיימים אחד מהתנאים הבאים:</p>
                    <p>
                      1. אינך נשוי/אה ודיווחת על ילדים הנמצאים בחזקתך, בגינם אתה
                      מקבל/ת קצבת ילדים מהביטוח הלאומי.
                    </p>
                    <p>2. את אישה נשואה.</p>
                    <p>3. סימנת את סעיף 9 - אני הורה יחיד לילדי שבחזקתי.</p>
                  </div>
                )
              ) : (
                allData.taxExemptionOrCredit[
                  "I-am-a-single-parent-to-my-children-in-my-custody"
                ] &&
                !allData.taxExemptionOrCredit["little-kids"] && (
                  <div className="error">
                    <p>חובה לסמן סעיף זה או סעיף 8 משום שסימנת את סעיף 9.</p>
                  </div>
                )
              )}

              <label>
                <div className="help-below">
                  <p>
                    ימולא רק ע"י הורה במשפחה חד הורית שמקבל את קצבת הילדים
                    בגינם, או ע"י אשה נשואה או ע"י הורה יחיד.
                  </p>
                </div>
              </label>
            </div>
          </fieldset>
          {/* <!-- 8 --> */}
          <fieldset className="m-t1">
            <div className="panel-default">
              <label>
                <input
                  type="checkbox"
                  name="little-kids"
                  onChange={handleChange}
                />
                8. בגין ילדי הפעוטים
                <ToolTip
                  id={"oi3nc8fh84w"}
                  contact={
                    <p>
                      <b>הורה יחיד</b> - הורה במשפחה חד הורית שהיה לו ילד שבשנת
                      המס טרם מלאו לו 19 שנים ושההורה השני של הילד נפטר או שהילד
                      רשום במרשם האוכלוסין בלא פרטי ההורה השני.
                    </p>
                  }
                />
              </label>

              <label>
                <div className="help-below">
                  <p>
                    ימולא ע"י הורה (למעט הורה אשר סימן בפסקה 7 לעיל), אשה לא
                    נשואה שילדיה אינם בחזקתה וכן הורה יחיד
                  </p>
                </div>

                {allData.taxExemptionOrCredit["little-kids"] ? (
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
                    allData.children.filter((it) => it?.myKidPossession)
                      .length === 0) ||
                  // סימנת את שדה 9 - אני הורה יחיד לילדי שבחזקתי
                  allData.taxExemptionOrCredit[
                    "I-am-a-single-parent-to-my-children-in-my-custody"
                  ] ? (
                    <div className="flex open-options-down">
                      <div className="inputHolder">
                        <label>
                          <div className="label">
                            <span> * </span>מספר ילדים שנולדו בשנת המס
                          </div>
                          <input
                            type={"number"}
                            name={"littleKids-new-kids"}
                            onChange={handleChange}
                            required
                          />
                        </label>
                      </div>

                      <div className="inputHolder">
                        <label>
                          <div className="label">
                            <span> * </span>מספר ילדים שימלאו להם שנה אחת עד 5
                            שנים בשנת המס
                          </div>
                          <div className="flex">
                            <input
                              type="number"
                              name="littleKids-five-years-ago"
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="error">
                      <p>ניתן לסמן רק אם מתקיימים אחד מהתנאים הבאים:</p>
                      <p>1. אתה גבר נשוי.</p>
                      <p>2. אתה לא נשוי/אה וסעיף 7 לעיל לא סומן.</p>
                      <p>
                        3. את אישה, לא נשואה ואחד או יותר מילדיך אינם בחזקתך.
                      </p>
                      <p>4. סימנת את סעיף 9 - אני הורה יחיד לילדי שבחזקתי.</p>
                    </div>
                  )
                ) : (
                  allData.taxExemptionOrCredit[
                    "I-am-a-single-parent-to-my-children-in-my-custody"
                  ] &&
                  !allData.taxExemptionOrCredit["kids-whit-me"] && (
                    <div className="error">
                      <p>חובה לסמן סעיף זה או סעיף 7 משום שסימנת את סעיף 9.</p>
                    </div>
                  )
                )}
              </label>
            </div>
          </fieldset>
          {/* <!-- 9 --> */}
          <fieldset className="m-t1">
            <div className="panel-default">
              <label>
                <input
                  type="checkbox"
                  name="I-am-a-single-parent-to-my-children-in-my-custody"
                  onChange={handleChange}
                />
                9. אני הורה יחיד לילדי שבחזקתי (המפורטים בסעיף 7 ו-8 לעיל).
                <ToolTip
                  id={"oi3nc8fh84w"}
                  contact={
                    <p>
                      <b>הורה יחיד</b> - הורה במשפחה חד הורית שהיה לו ילד שבשנת
                      המס טרם מלאו לו 19 שנים ושההורה השני של הילד נפטר או שהילד
                      רשום במרשם האוכלוסין בלא פרטי ההורה השני.
                    </p>
                  }
                />
              </label>
            </div>
          </fieldset>
          {/* <!-- 10 --> */}
          <fieldset className="m-t1">
            <div className="panel-default">
              <label>
                <input
                  type="checkbox"
                  name="children-who-are-not-in-my-possession"
                  onChange={handleChange}
                />
                10. בגין ילדי שאינם בחזקתי המפורטים בסעיף ג ואני משתתף/ת
                בכלכלתם.
              </label>
              {allData.taxExemptionOrCredit[
                "children-who-are-not-in-my-possession"
              ] &&
                allData.children.filter((it) => it?.myKidPossession !== true)
                  .length === 0 && (
                  <div className="error" style={{ display: "block" }}>
                    <p>
                      לא ניתן לסמן משום שלא ציינת בסעיף ג' ילדים <u>שאינם</u>
                      בחזקתך.
                    </p>
                  </div>
                )}
              <div className="help-below">
                <p>
                  ימולא ע"י הורה החי בנפרד, שאינו זכאי לנקודות זיכוי בגין ילדיו,
                  אשר המציא פס"ד המחייב אותו בתשלום מזונות.
                </p>
              </div>
            </div>
          </fieldset>
          {/* <!-- 11 --> */}
          <fieldset className="m-t1">
            <div className="panel-default">
              <label>
                <input
                  type="checkbox"
                  name="children-with-disabilities"
                  onClick={handleChange}
                />
                11. אני הורה לילדים עם מוגבלות שטרם מלאו להם 19 שנים, בגינם אני
                מקבל/ת גמלת ילד נכה מהמוסד לביטוח לאומי.
              </label>

              {allData.taxExemptionOrCredit["children-with-disabilities"] ? (
                <div className="open-options-down">
                  <p>
                    בן זוגי אינו מקבל נקודות זיכוי אלה. לילדי, בגינו אני מבקש את
                    נקודות הזיכוי, אין הכנסות בשנה הנוכחית.
                  </p>

                  <div className="flex">
                    <div className="inputHolder">
                      <label>
                        <div className="label">
                          מספר הילדים עם מוגבלות שטרם מלאו להם 19 שנים, בגינם
                          את/ה מקבל/ת גמלת ילד נכה מהמוסד לביטוח לאומי
                        </div>
                        <input
                          type="number"
                          name="children-with-disabilities-num-kids-disabilities-u19"
                          onChange={handleChange}
                        />
                      </label>
                      <div className="help-below"></div>
                    </div>
                    <div className="inputHolder">
                      <div>
                        <div className="label">
                          <span> * </span>
                          אישור גמלת ילד נכה מהמוסד לביטוח לאומי בשנה נוכחית{" "}
                          <ToolTip
                            id={"sddqjvnmw8nfhmgn789hcdrgc"}
                            contact={
                              <p>
                                בן זוגי אינו מקבל נקודות זיכוי אלה. לילדיי,
                                בגינם אני מבקש את נקודות הזיכוי, אין הכנסות בשנה
                                הנוכחית
                              </p>
                            }
                          />
                        </div>
                        <Files
                          {...{ allData, setAllData }}
                          nameObj="גמלת_ילד_נכה"
                          required={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </fieldset>
          {/* <!-- 12 --> */}
          <fieldset className="m-t1">
            <div className="panel-default">
              <label>
                <input
                  type="checkbox"
                  name="alimony-ex"
                  onChange={handleChange}
                />
                12. בגין מזונות לבן/בת זוגי לשעבר.
              </label>
              <div className="help-below">
                <p>ימולא ע"י מי שנישא בשנית.</p>
              </div>
              {allData.taxExemptionOrCredit["alimony-ex"] &&
              allData.employeeDetails?.maritalStatus === "married" ? (
                <div className="inputHolder open-options-down">
                  <div>
                    <div className="label">
                      <span> * </span>
                      נא לצרף את פסק הדין
                    </div>
                    <Files
                      {...{ allData, setAllData }}
                      nameObj="בגין_מזונות_לבן_זוגי_לשעבר"
                      required={true}
                    />
                  </div>
                </div>
              ) : (
                allData.taxExemptionOrCredit["alimony-ex"] && (
                  <div className="error">
                    <p>לא ניתן לסמן משום שלא ציינת בסעיף ב' שהינך נשוי/אה.</p>
                  </div>
                )
              )}
            </div>
          </fieldset>
          {/* <!-- 13 --> */}
          <fieldset className="m-t1">
            <div className="panel-default">
              <label>
                <input
                  type="checkbox"
                  name="my-partner-is-u16"
                  onChange={handleChange}
                />
                13. מלאו לי או לבן/בת זוגי 16 שנים וטרם מלאו לי או לבן/בת זוגי
                18 שנים בשנת המס.{" "}
              </label>

              {allData.taxExemptionOrCredit["my-partner-is-u16"] &&
                (!allData.employeeDetails?.birthYear &&
                isNaN(getYearBirth) &&
                !allData.employeeDetails?.birthMonth &&
                !allData.employeeDetails?.birthDay ? (
                  <div className="error">
                    <p>לא ניתן לסמן משום שלא ציינת תאריך לידה בסעיף ב'.</p>
                  </div>
                ) : (
                  (getYearBirth < 16 || getYearBirth > 18) && (
                    <div className="error">
                      <p>
                        לא ניתן לסמן משום שימלאו לך {getYearBirth} שנים בשנת
                        המס.
                      </p>
                    </div>
                  )
                ))}
            </div>
          </fieldset>
          {/* <!-- 14 --> */}
          <fieldset className="m-t1">
            <div className="panel-default">
              <label>
                <input
                  type="checkbox"
                  name="im-soldier"
                  onClick={handleChange}
                />
                14. אני חייל/ת משוחרר/ת / שרתתי בשירות לאומי.
              </label>
              {allData.taxExemptionOrCredit["im-soldier"] ? (
                <div className="flex m-t1 open-options-down">
                  <DateInput
                    maxWidth={{ style: { maxWidth: "360px" } }}
                    title={"תאריך תחילת שירות"}
                    setAllData={setAllData}
                    nameObj="taxExemptionOrCredit"
                    required={true}
                    name={"im-soldier-start-service"}
                    year={{ max: thisYear.getFullYear() - 2, min: "1960" }}
                    requiredB={true}
                  />

                  <DateInput
                    maxWidth={{ style: { maxWidth: "360px" } }}
                    title={"תאריך סיום שירות"}
                    nameObj="taxExemptionOrCredit"
                    setAllData={setAllData}
                    required={true}
                    name={"im-soldier-finish-service"}
                    year={{
                      max: thisYear.getFullYear(),
                      min: thisYear.getFullYear() - 3,
                    }}
                    requiredB={true}
                  />

                  <div className="inputHolder">
                    <div>
                      <div className="label">תעודת שחרור/ סיום שירות</div>
                      <div className="flex">
                        <Files
                          {...{ allData, setAllData }}
                          nameObj="תעודת_סיום_שרות"
                          required={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </fieldset>
          {/* <!-- 15 --> */}
          <fieldset className="m-t1">
            <div className="panel-default">
              <label>
                <input
                  type="checkbox"
                  name="collegeDegree"
                  onClick={handleChange}
                />
                15. בגין סיום לימודים לתואר אקדמי, סיום התמחות או סיום לימודי
                מקצוע.
              </label>
              {allData.taxExemptionOrCredit.collegeDegree ? (
                <div className="inputHolder open-options-down">
                  <div>
                    <div className="label">
                      <span> * </span> הצהרה בטופס 119{" "}
                    </div>
                    <div className="flex">
                      <Files
                        {...{ allData, setAllData }}
                        nameObj="הצהרה_בטופס_119"
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="help-below">
                    <p>
                      ניתן להוריד את הטופס{" "}
                      <a
                        href="https://www.gov.il/BlobFolder/service/itc119/he/Service_Pages_Income_tax_itc119n.pdf"
                        target="_blank"
                        rel="noreferrer"
                      >
                        מאתר רשות המסים
                      </a>
                      .
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </fieldset>
        </>
      )}
    </div>
  );
}

export default TaxExemptionOrCredit;
