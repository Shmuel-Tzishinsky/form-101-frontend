import React, { useState } from "react";
import HebrowInput from "../components/HebrowInput";
import IdComp from "../components/IdComp";

function Children({ setAllData, allData }) {
  const [lengthChildren, setLengthChildren] = useState(0);

  const handleChange = ({ target: { name, value, checked } }, k) => {
    const childrenArray = allData.children;
    childrenArray[k] = { ...childrenArray[k], [name]: checked || value };

    setAllData((values) => ({
      ...values,
      children: [...childrenArray],
    }));
  };

  const addChild = () => {
    setLengthChildren((lengthChildren) =>
      lengthChildren <= 12 ? lengthChildren + 1 : lengthChildren
    );
  };

  const removeChild = () => {
    delete allData.children[lengthChildren - 1];
    setAllData({ ...allData });

    setLengthChildren((e) => e - 1);
  };

  return (
    // <!-- ג. פרטים על ילדי שבשנת המס טרם מלאו להם 19 שנה -->
    <div className="myContainer children">
      <h4>ג. פרטים על ילדי שבשנת המס טרם מלאו להם 19 שנה</h4>

      {allData.employeeDetails?.idBy === "passport" ? (
        <p className="alert">סעיף זה אינו רלוונטי משום שהינך מזוהה עם דרכון</p>
      ) : (
        <>
          {[...Array(lengthChildren)].map((e, k) => (
            <Child
              key={k}
              num={k}
              handleChange={handleChange}
              allData={allData}
            />
          ))}

          <div
            className="addChild"
            style={{ opacity: lengthChildren > 12 ? "0.4" : "1" }}
            onClick={addChild}
          >
            + הוספת ילד
          </div>

          {lengthChildren >= 1 && (
            <div className="addChild" onClick={removeChild}>
              - הסרת ילד
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Children;

export function Child({ num, handleChange, allData }) {
  const [miKidsChecked, setMiKidsChecked] = useState({ className: "null" });

  let date = new Date();
  const dataText = {
    passportText: ["מספר דרכון", "צילום דרכון", "נא להזין מספר דרכון חוקי."],
    idText: ["מספר זהות", "צילום תעודת זהות", "נא להזין תעודת זהות חוקית."],
    errNum: "יש להקליד מספרים בלבד!",
  };

  return (
    <div className="flex m-t1 child open-options-down">
      <div className="inputHolder headerBlack">
        <div className="label">ילד {num + 1}</div>
      </div>
      <div className="flex">
        <div className="inputHolder">
          <label>
            <div className="label">שם</div>
            <div className="flex">
              <HebrowInput
                name={"name"}
                handleChange={handleChange}
                num={num}
                required={true}
              />
            </div>
          </label>
        </div>

        <IdComp
          handleChange={(e) => handleChange(e, num)}
          idOrPassport={dataText.idText}
          dataText={dataText}
        />

        {/* <p>ת.ז כבר קיימת בטופס</p> */}

        <div className="inputHolder date-inputHolder">
          <label>
            <div className="label">
              <span> *</span> תאריך לידה{" "}
            </div>
            <div className="container-input-date">
              <input
                min={"1960"}
                max={date.getFullYear()}
                type={"number"}
                placeholder="שנה"
                onChange={(e) => {
                  handleChange(e, num);
                }}
                name={"date-year"}
                required={true}
              />
              <input
                min={"1"}
                max={"12"}
                type={"number"}
                placeholder="חודש"
                onChange={(e) => {
                  handleChange(e, num);
                }}
                name={"date-month"}
                required={true}
              />
              <input
                min={"1"}
                max={"31"}
                type={"number"}
                placeholder="יום"
                onChange={(e) => {
                  handleChange(e, num);
                }}
                name={"date-day"}
                required={true}
              />
            </div>
          </label>
        </div>
      </div>
      <div className="flex wrapperHoldingChild">
        <div className="custom-checkbox">
          <label>
            <input
              name="myKidPossession"
              type="checkbox"
              onInput={(e) => handleChange(e, num)}
              {...miKidsChecked}
            />
            הילד נמצא בחזקתי
          </label>
        </div>
        <div className="custom-checkbox m-r1">
          <label>
            <input
              name="kidsPension"
              type="checkbox"
              onChange={(e) => {
                let check = e.target.checked
                  ? { checked: e.target.checked }
                  : { className: "null" };
                handleChange(e, num);
                if (!allData.children?.myKidPossession) {
                  handleChange(
                    {
                      target: {
                        name: "myKidPossession",
                        checked: e.target.checked,
                      },
                    },
                    num
                  );
                  setMiKidsChecked(check);
                }
              }}
            />
            אני מקבל/ת בגינו/ה קצבת ילדים מביטוח לאומי
          </label>
        </div>
      </div>
    </div>
  );
}
