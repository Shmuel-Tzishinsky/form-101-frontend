import React, { useState } from "react";
import Files from "../components/Files";

function TaxCoordination({ setAllData, allData }) {
  const [selectes, setSelectes] = useState({
    // תיאום מס
    taxCoordination: !1,
    // אין הכנסה
    noIncome: !1,
    // יש הכנסה ממשכורת
    heveIncome: {
      heve: !1,
      incomes: 1,
    },
    // פקיד השומה אישר תיאום מס
    assessingOfficer: !1,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    let value;

    if (!e.target) {
      value = e.checked;
    } else {
      if (e.target.attributes.type?.textContent === "checkbox") {
        value = e.target.checked;
      } else {
        value = e.target.value;
      }
    }

    setAllData((values) => ({
      ...values,
      taxCoordination: { ...values.taxCoordination, [name]: value },
    }));
  };

  return (
    // <!-- תיאום מס -->
    <div className="myContainer">
      <h4>ט. תיאום מס</h4>

      <div className="panel-default">
        <label>
          <input
            type="checkbox"
            name="taxCoordination"
            onClick={(e) => {
              setSelectes({ ...selectes, taxCoordination: e.target.checked });
              handleChange(e);
            }}
          />
          צירוף / עריכת תיאום מס
        </label>
      </div>
      {selectes.taxCoordination && (
        <div className="flex flex-column">
          <div className="inputHolder taxCoordinationIncome">
            <div className="flex m-t1 flex-column">
              <div className="label">
                <span> * </span>סיבת הבקשה
              </div>
              <label>
                <div className="label-radio">
                  <input
                    type="radio"
                    name="taxCoordinationIncome"
                    onChange={(e) => {
                      setSelectes({
                        ...selectes,
                        noIncome: !0,
                        heveIncome: { heve: !1, incomes: 1 },
                        assessingOfficer: !1,
                      });
                      handleChange(e);
                    }}
                    value="no"
                    required
                  />
                  לא הייתה לי הכנסה מתחילת שנת המס הנוכחית עד לתחילת עבודתי אצל
                  מעביד זה.
                </div>
              </label>
              <label>
                <div className="label-radio">
                  <input
                    type="radio"
                    name="taxCoordinationIncome"
                    onChange={(e) => {
                      setSelectes({
                        ...selectes,
                        noIncome: !1,
                        heveIncome: { heve: e.target.checked, incomes: 1 },
                        assessingOfficer: !1,
                      });
                      handleChange(e);
                    }}
                    value="yes"
                    required
                  />
                  יש לי הכנסות נוספות ממשכורת כמפורט להלן.
                </div>
              </label>
              <label>
                <div className="label-radio">
                  <input
                    type="radio"
                    name="taxCoordinationIncome"
                    onChange={(e) => {
                      setSelectes({
                        ...selectes,
                        noIncome: !1,
                        heveIncome: { heve: !1, incomes: 1 },
                        assessingOfficer: !0,
                      });
                      handleChange(e);
                    }}
                    value="official"
                    required
                  />
                  פקיד השומה אישר תיאום לפי אישור מצורף.
                </div>
              </label>
            </div>
          </div>

          {/* <!-- לא הייתה הכנסה --> */}
          {selectes.noIncome && (
            <div className="inputHolder taxCoordinationIncome">
              <div>
                <div className="label">
                  <span>* </span> הוכחות לחוסר הכנסה
                </div>
                <div className="flex">
                  <Files
                    {...{ allData, setAllData }}
                    nameObj="הוכחות_לחוסר_הכנסה"
                    required={true}
                  />
                </div>
              </div>
              <div className="help-below m-t1">
                <p>
                  כגון: אישור משטרת הגבולות בגין שהייה בחו"ל, אישור מחלה וכיו"ב.
                  בהעדר הוכחה יש לפנות לפקיד השומה.
                  <br />
                  לתשומת לבך: דמי לידה ודמי אבטלה הינם הכנסה חייבת.
                </p>
              </div>
            </div>
          )}

          {/* <!-- מעביד/משלם משכורת 1 --> */}
          {selectes.heveIncome?.heve && (
            <div className="inputHolder taxCoordinationIncome">
              <div>
                <div className="label">
                  <span>* </span>צרף אישור פקיד שומה
                </div>
                <div className="flex">
                  <Files
                    {...{ allData, setAllData }}
                    nameObj="יש_לי_הכנסות_נוספות_ממשכורת_כמפורט_להלן"
                    required={true}
                  />
                </div>
                <div className="help-below">
                  <p>
                    ניתן להעזר
                    <a
                      href="https://www.gov.il/he/service/tax-coordination-online"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      באתר רשות המסים
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* <!-- פקיד השומה אישר תיאום לפי אישור מצורף. --> */}
          {selectes.assessingOfficer && (
            <div className="inputHolder taxCoordinationIncome">
              <div>
                <div className="label">
                  <span>* </span> אישור תיאום מס ע"י פקיד שומה{" "}
                </div>
                <div className="flex">
                  <Files
                    {...{ allData, setAllData }}
                    nameObj="אישור_תיאום_מס_פקיד_שומה"
                    required={true}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TaxCoordination;
