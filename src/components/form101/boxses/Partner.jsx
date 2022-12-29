import React, { useState } from "react";
import IdComp from "../components/IdComp.js";
import DateInput from "../components/Date.js";
import HebrowInput from "../components/HebrowInput.js";

function Partner({ setAllData, allData }) {
  let thisYear = new Date();

  const handleChange = ({ target: { name, value } }) => {
    setAllData((values) => ({
      ...values,
      partner: { ...values.partner, [name]: value },
    }));
  };

  const dataText = {
    passportText: ["מספר דרכון", "צילום דרכון", "נא להזין מספר דרכון חוקי."],
    idText: ["מספר זהות", "צילום תעודת זהות", "נא להזין תעודת זהות חוקית."],
    errNum: "יש להקליד מספרים בלבד!",
  };

  // משנה את הטקסט - או תעודת זהות או דרכון
  const [idOrPassport, setIdOrPassport] = useState(dataText.idText);

  const [incomes, setIncomes] = useState(!1);
  return (
    // <!-- פרטים על בן/בת הזוג -->
    <div className="myContainer partner">
      <h4>ו. פרטים על בן/בת הזוג</h4>
      {allData.employeeDetails.maritalStatus === "married" ? (
        <>
          <div className="flex flex-between grid-1 open-options-down">
            <div className="inputHolder">
              <label>
                <div className="label">
                  <span> * </span>שם פרטי
                </div>
                <HebrowInput
                  name="firstName"
                  handleChange={handleChange}
                  required={true}
                />
              </label>
              <div className="help-below">
                <p>ע"פ הרשום בת.ז.</p>
              </div>
            </div>

            <div className="inputHolder">
              <label>
                <div className="label">
                  <span> * </span>שם משפחה
                </div>
                <HebrowInput
                  name="lastName"
                  handleChange={handleChange}
                  required={true}
                />
              </label>
              <div className="help-below">
                <p>ע"פ הרשום בת.ז.</p>
              </div>
            </div>
            <DateInput
              title={"תאריך לידה"}
              setAllData={setAllData}
              nameObj="partner"
              name={"birth"}
              year={{ max: thisYear.getFullYear(), min: "1960" }}
              requiredB={true}
            />
            <DateInput
              title={"תאריך עליה"}
              setAllData={setAllData}
              nameObj="partner"
              name={"increase"}
              year={{
                max: thisYear.getFullYear(),
                min: thisYear.getFullYear() - 4,
              }}
              requiredB={false}
            />
          </div>

          <div className="flex grid-1 open-options-down">
            <div className="inputHolder">
              <h4>זיהוי לפי</h4>

              <div className="inputRadio">
                <div className="container-input-radio">
                  <div className="label-radio">
                    <input
                      type="radio"
                      value={"id"}
                      name="idByPartner"
                      id="idByPartner-id"
                      defaultChecked
                      onChange={(e) => {
                        handleChange(e);
                        setIdOrPassport(dataText.idText);
                      }}
                    />
                    <label htmlFor="idByPartner-id">תעודת זהות</label>
                  </div>
                  <div className="label-radio">
                    <input
                      type="radio"
                      value={"passport"}
                      name="idByPartner"
                      id="idByPartner-passport"
                      onChange={(e) => {
                        handleChange(e);
                        setIdOrPassport(dataText.passportText);
                      }}
                    />
                    <label htmlFor="idByPartner-passport">
                      דרכון {window.innerWidth > 557 && "(עבור אזרח זר)"}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <IdComp
              dataText={dataText}
              handleChange={handleChange}
              idOrPassport={idOrPassport}
            />

            <div
              className="inputHolder"
              style={{ gridArea: !incomes && "bottom" }}
            >
              <div className="label">
                <span> * </span>הכנסה
              </div>
              <div className="inputRadio">
                <div className="container-input-radio">
                  <div className="label-radio">
                    <input
                      type="radio"
                      value={"false"}
                      id="partnerIncome-23t3gg4wse"
                      name="partnerIncome"
                      onClick={(e) => {
                        handleChange(e);
                        setIncomes(!1);
                      }}
                      required
                    />
                    <label htmlFor="partnerIncome-23t3gg4wse">
                      אין לבן/בת הזוג כל הכנסה
                    </label>
                  </div>
                  <div className="label-radio">
                    <input
                      type="radio"
                      id="partnerIncome-jeschf87mcfje"
                      value={"true"}
                      name="partnerIncome"
                      onClick={(e) => {
                        handleChange(e);
                        setIncomes(!0);
                      }}
                      required
                    />
                    <label htmlFor="partnerIncome-jeschf87mcfje">
                      יש לבן/בת הזוג כל הכנסה
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {incomes ? (
              <div className="inputHolder">
                <div className="open-options">
                  <div className="label ">
                    <span> * </span>פרטים על הכנסה ממקור אחר
                  </div>
                  <div className="inputRadio">
                    <div className="container-input-radio partner-oter-income">
                      <div className="label-radio">
                        <input
                          type="radio"
                          onChange={handleChange}
                          value="WorkOrOhther"
                          name="partnerIncomeType"
                          required
                        />
                        <label>עבודה/קצבה/עסק</label>
                      </div>
                      <div className="label-radio">
                        <input
                          type="radio"
                          onChange={handleChange}
                          value="otherIncome"
                          name="partnerIncomeType"
                          required
                        />
                        <label>הכנסה אחרת</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="inputHolder"></div>
            )}
          </div>
        </>
      ) : (
        <p className="alert">חלק זה רלוונטי רק אם הינך נשוי/אה</p>
      )}
    </div>
  );
}

export default Partner;
