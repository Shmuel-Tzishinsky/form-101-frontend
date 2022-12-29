import React from "react";
import ToolTip from "../components/ToolTip";
import DateInput from "../components/Date";

// checkbox מאפשרת בחירה אחת מתוך קבוצה של
function onlyOne(checkbox, handleChange) {
  document
    .querySelectorAll(`.${checkbox.target.className.split(" ")[0]}`)
    .forEach(
      (item) =>
        item !== checkbox.target && ((item.checked = !1), handleChange(item))
    );
}

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

function IncomeFromThisEmployer({ setAllData, allData }) {
  const thisYear = new Date();

  const handleChange = (e, k) => {
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
      incomeFromThisEmployer: {
        ...values.incomeFromThisEmployer,
        [name]: value,
      },
    }));
  };

  return (
    // <!-- ד. פרטים על הכנסותי ממעביד זה -->
    <div className="myContainer incomesSalary">
      <h4>ד. פרטים על הכנסותי ממעביד זה</h4>

      <div className="flex m-t1 flex-column">
        <div className="label">
          <p>
            <span> * </span>פירוט הכנסות
          </p>
        </div>
        <div className="flex info">
          <div className="label-checkbox">
            <label>
              <input
                required
                type="checkbox"
                className="check-hxsfcoiux acb"
                onChange={(e) => {
                  deRequireCb("acb");
                  onlyOne(e, handleChange);
                  handleChange(e);
                }}
                name="monthlySalary"
              />
              משכורת חודש
            </label>
            <ToolTip
              id="incomeFromThisEmployer-1-1"
              contact={
                <p>
                  <span>
                    <strong>משכורת חודש</strong> - משכורת בעד עבודה של לא פחות
                    מ- 18 יום בחודש.
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
                className="check-hxsfcoiux acb"
                onChange={(e) => {
                  deRequireCb("acb");
                  onlyOne(e, handleChange);
                  handleChange(e);
                }}
                name="extraSalary"
              />
              משכורת נוספת
            </label>
            <ToolTip
              id="incomeFromThisEmployer-1-2"
              contact={
                <p>
                  <span>
                    <strong>משכורת בעד משרה נוספת</strong> - משכורת בעד עבודה של
                    יותר מ - 5 שעות ביום, נוסף למשכורת ו/או בנוסף לקצבה החייבת
                    במס ממקום אחר. העובד רשאי לבחור את מקום העבודה בו תחשב
                    משכורתו כ"משכורת בעד משרה נוספת".
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
                className="check-hxsfcoiux acb"
                onChange={(e) => {
                  deRequireCb("acb");
                  onlyOne(e, handleChange);
                  handleChange(e);
                }}
                name="PartialSalary"
              />
              משכורת חלקית
            </label>
            <ToolTip
              id="incomeFromThisEmployer-1-3"
              contact={
                <p>
                  <span>
                    <strong>משכורת חלקית</strong> - משכורת בעד עבודה של 5 שעות
                    או פחות ליום או משכורת בעד עבודה במשך יותר מ-5 שעות ליום אך
                    פחות מ-8 שעות בשבוע. ממשכורת חלקית ינוכה מס בשיעור מירבי אלא
                    אם כן זו הכנסה יחידה שאז ינוכה מס לפי לוח הניכויים.
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
                className="check-hxsfcoiux acb"
                onChange={(e) => {
                  deRequireCb("acb");
                  onlyOne(e, handleChange);
                  handleChange(e);
                }}
                name="salary"
              />
              שכר עבודה (יומי)
            </label>
            <ToolTip
              id="incomeFromThisEmployer-1-4"
              contact={
                <p>
                  <span>
                    <strong>שכר עבודה</strong> - משכורת בעד עבודה של פחות מ - 18
                    יום בחודש אך לא פחות מ - 8 שעות בשבוע. משכר עבודה ינוכה מס
                    לפי לוח יומי אלא אם כן זו הכנסה יחידה שאז ינוכה מס לפי לוח
                    הניכויים.
                  </span>
                </p>
              }
            />
          </div>
          <div className="label-checkbox">
            <label>
              <input
                type="checkbox"
                onClick={() => deRequireCb("acb")}
                className="acb"
                name="allowance"
                onChange={handleChange}
                required
              />
              קצבה
            </label>
            <ToolTip
              id="incomeFromThisEmployer-1-5"
              contact={
                <p>
                  <span>
                    <strong>קצבה </strong>- אין לדווח על קצבה פטורה מביטוח לאומי
                    וקצבת שאירים שכולה פטורה.
                  </span>
                </p>
              }
            />
          </div>
          <div className="label-checkbox">
            <label>
              <input
                type="checkbox"
                onClick={() => deRequireCb("acb")}
                className="acb"
                name={"scholarship"}
                onChange={handleChange}
                required
              />
              מלגה
            </label>
            <ToolTip
              id="incomeFromThisEmployer-1-6"
              contact={
                <p>
                  <span>
                    <strong>מלגה </strong>- לרבות מענק, פרס או פטור מתשלום שניתן
                    לסטודנט או לחוקר.
                  </span>
                </p>
              }
            />
          </div>
        </div>
      </div>

      <DateInput
        maxWidth={{ style: { marginTop: "1em" } }}
        title={<>תאריך תחילת עבודה בשנת המס</>}
        setAllData={setAllData}
        required={true}
        nameObj="incomeFromThisEmployer"
        name={"start-work"}
        year={{ max: thisYear.getFullYear(), min: "2000" }}
        requiredB={true}
      />
    </div>
  );
}

export default IncomeFromThisEmployer;
