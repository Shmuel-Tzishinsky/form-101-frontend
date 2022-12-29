import { useState } from 'react';
import IdComp from '../components/IdComp';
import DateInput from '../components/Date';

import SearchCityEndStreet from '../components/SearchCityEndStreet';
import Files from '../components/Files';
import HebrowInput from '../components/HebrowInput';

// בודק אם המספר מתחיל ב-0 ושהספרה השניה היא או 234589
export function checkNumPhone(num) {
  let startPhone = String(num).substring(0, 2);
  if (
    startPhone === '05' ||
    startPhone === '09' ||
    startPhone === '08' ||
    startPhone === '04' ||
    startPhone === '03' ||
    startPhone === '02'
  ) {
    return !/^0?(([234589]{1}\d{7})|[5]{1}\d{8})$/.test(num);
  }

  return true;
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function EmployeeDetails({ setAllData, allData }) {
  let thisYear = new Date();
  const [valueSelect, setvalueSelect] = useState('');
  const [erorrAnimation, setErorrAnimation] = useState('');
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [showPhoneError2, setShowPhoneError2] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);

  const dataText = {
    passportText: ['מספר דרכון', 'צילום דרכון', 'נא להזין מספר דרכון חוקי.'],
    idText: ['מספר זהות', 'צילום תעודת זהות', 'נא להזין תעודת זהות חוקית.'],
    errNum: 'יש להקליד מספרים בלבד!'
  };

  // משנה את הטקסט - או תעודת זהות או דרכון
  const [idOrPassport, setIdOrPassport] = useState(dataText.idText);

  // בדיקה של מספר טלפון ישראלי
  const [phoneIsrali, setPhoneIsraeli] = useState({
    num: '',
    error: !0
  });

  // בדיקה של מספר טלפון ישראלי
  const [phoneIsrali2, setPhoneIsraeli2] = useState({
    num: '',
    error: !0
  });

  // רץ בכל שינוי של המספר טלפון השני
  const setOtherPhone = (e) => {
    handleChange(e);
    const num = e.target.value;
    // לא ריק
    if (num.length !== 0) {
      // אם הטקסט כולל טקסט שהוא לא מספרים
      if (!/^[0-9]+$/.test(num)) {
        setPhoneIsraeli2({ num, error: 'יש להזין מספר בלבד!' });
      } else if (num.length >= 9 && num.length <= 10) {
        // אחרי שהאורך נכון בודק את תקינות המספר
        setPhoneIsraeli2({
          num,
          error: !checkNumPhone(num) ? true : 'יש להזין מספר חוקי!'
        });
      } else {
        // שגיאת תקינות
        setPhoneIsraeli2({
          num,
          error: 'המספר חייב להיות באורך תקין!'
        });
      }
    } else {
      // אין שגיאה
      setPhoneIsraeli2({ num, error: !1 });
      setShowPhoneError2(false);
    }
  };

  // רץ בכל שינוי של המספר טלפון הראשון
  const setPhone = (e) => {
    handleChange(e);
    const num = e.target.value;
    // לא ריק
    if (num.length !== 0) {
      // אם הטקסט כולל טקסט שהוא לא מספרים
      if (!/^[0-9]+$/.test(num)) {
        setPhoneIsraeli({ num, error: 'יש להזין מספר בלבד!' });
      } else if (num.length >= 9 || num.length <= 10) {
        // אחרי שהאורך נכון בודק את תקינות המספר
        setPhoneIsraeli({
          num,
          error: !checkNumPhone(num) ? true : 'יש להזין מספר חוקי!'
        });
      } else {
        // שגיאת תקינות
        setPhoneIsraeli({
          num,
          error: 'המספר חייב להיות באורך תקין!'
        });
      }
    } else {
      // אין שגיאה
      setPhoneIsraeli({ num, error: !1 });
      setShowPhoneError(false);
    }
  };

  // בדיקה של האימייל
  const [checkGmail, setCheckGmail] = useState({
    email: '',
    error: !0
  });

  // בשינוי של הטקסט של האימייל
  const setEmail = (e) => {
    handleChange(e);
    const email = e.target.value;
    // לא ריק
    if (email.length !== 0) {
      // בדיקה של תקינות המייל
      if (!validateEmail(email)) {
        setCheckGmail({
          email,
          error: 'יש להכניס כתובת אימייל תקינה.'
        });
      } else {
        setCheckGmail({ email, error: !0 });
      }
    } else {
      // אין שגיאה
      setCheckGmail({ email, error: !0 });
      setShowEmailError(false);
    }
  };

  // מסתיר/ מראה את הרשימה של הקופות חולים
  const [hmo, setHMO] = useState(!1);

  const handleChange = ({ target: { name, value } }) => {
    setAllData((values) => ({
      ...values,
      employeeDetails: { ...values.employeeDetails, [name]: value }
    }));
  };

  const focusIfError = (el, err) => {
    if (typeof err === 'string') {
      el.focus();
      setShowPhoneError(true);
      setShowPhoneError2(true);
      setShowEmailError(true);
      setErorrAnimation('erorr-animation');
      setTimeout(() => {
        setErorrAnimation('');
      }, 200);
    }
  };

  return (
    // ב. פרטי העובד/ת
    <div className="myContainer employeeDetails">
      <h4>ב. פרטי העובד/ת</h4>

      <div className="employee-details-grid">
        <div className="inputRadio grid-header">
          <h4>זיהוי לפי</h4>
          <div className="container-input-radio">
            <div className="label-radio">
              <input
                type="radio"
                value={'id'}
                name="idBy"
                id="idBy-id"
                defaultChecked
                onChange={(e) => {
                  setIdOrPassport(dataText.idText);
                  handleChange(e);
                }}
              />
              <label htmlFor="idBy-id">תעודת זהות</label>
            </div>
            <div className="label-radio">
              <input
                type="radio"
                value={'passport'}
                name="idBy"
                id="idBy-passport"
                onChange={(e) => {
                  setIdOrPassport(dataText.passportText);
                  handleChange(e);
                }}
              />
              <label htmlFor="idBy-passport">
                דרכון {window.innerWidth > 557 && '(עבור אזרח זר)'}
              </label>
            </div>
          </div>
        </div>

        <IdComp
          handleChange={handleChange}
          idOrPassport={idOrPassport}
          dataText={dataText}
        />

        <div className="inputHolder">
          <div className="label">
            <span> * </span>
            {idOrPassport[1]}
          </div>
          <Files
            {...{ allData, setAllData }}
            nameObj="צילום_תעודת_זהות_/_או_דרכון"
            required={true}
          />
        </div>

        <div className="inputHolder">
          <label>
            <div className="label">
              <span> * </span>שם פרטי
            </div>
            <HebrowInput
              handleChange={handleChange}
              name={'firstName'}
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
              handleChange={handleChange}
              name={'lastName'}
              required={true}
            />
          </label>
          <div className="help-below">
            <p>ע"פ הרשום בת.ז.</p>
          </div>
        </div>

        <SearchCityEndStreet
          name={['citi', 'ישוב']}
          citi={'שם_ישוב'}
          allData={allData}
          setAllData={setAllData}
          inAllData={'employeeDetails'}
        />
        <SearchCityEndStreet
          name={['street', 'רחוב']}
          citi={'שם_ישוב'}
          allData={allData}
          street={'שם_רחוב'}
          setAllData={setAllData}
          inAllData={'employeeDetails'}
        />

        <div className="inputHolder">
          <label>
            <div className="label">
              <span> * </span>מספר בית
            </div>
            <input
              type="tel"
              name="homeNum"
              min="0"
              maxLength="3"
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="inputHolder">
          <label>
            <div className="label">
              <span> * </span>מיקוד
            </div>
            <input
              type="tel"
              name="postalCode"
              maxLength="7"
              minLength="7"
              onChange={handleChange}
              required
            />
          </label>
          <div className="help-below">
            <p>
              ניתן להעזר
              <a
                target="_blank"
                rel="noreferrer"
                href="https://mypost.israelpost.co.il/%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99%D7%9D/%D7%90%D7%99%D7%AA%D7%95%D7%A8-%D7%9E%D7%99%D7%A7%D7%95%D7%93/"
              >
                {' '}
                באתר הדואר
              </a>
            </p>
          </div>
        </div>

        <DateInput
          title={'תאריך לידה'}
          name="birth"
          nameObj={'employeeDetails'}
          setAllData={setAllData}
          requiredB={true}
          year={{ max: thisYear.getFullYear() - 16, min: '1960' }}
        />

        <DateInput
          title={'תאריך עליה'}
          name="increase"
          nameObj={'employeeDetails'}
          setAllData={setAllData}
          requiredB={false}
          year={{
            max: thisYear.getFullYear(),
            min: thisYear.getFullYear() - 4
          }}
        />

        <div className="inputHolder">
          <label>
            <div className="label">
              <span> * </span>טלפון
            </div>
            <input
              type="tel"
              name="phone"
              onInput={(e) => {
                setPhone(e);
              }}
              onBlur={(e) => focusIfError(e.target, phoneIsrali.error)}
              maxLength="10"
              required
            />
          </label>
          {showPhoneError && phoneIsrali.error && (
            <div className={`error ${erorrAnimation}`}>
              <p>{phoneIsrali.error}</p>
            </div>
          )}
        </div>

        <div className="inputHolder">
          <label>
            <div className="label">טלפון נוסף</div>
            <input
              type="tel"
              name="anotherPhone"
              onInput={(e) => {
                setOtherPhone(e);
              }}
              onBlur={(e) => focusIfError(e.target, phoneIsrali2.error)}
              maxLength="10"
            />
          </label>
          {showPhoneError2 && phoneIsrali2.error && (
            <div className={`error ${erorrAnimation}`}>
              <p>{phoneIsrali2.error}</p>
            </div>
          )}
        </div>

        <div className="inputHolder">
          <label>
            <div className="label">
              <span> * </span>אימייל
            </div>
            <input
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              autoComplete="on"
              name="email"
              onInput={setEmail}
              onBlur={(e) => focusIfError(e.target, checkGmail.error)}
              required
            />
          </label>
          {showEmailError && checkGmail.error && (
            <div
              className={`error ${erorrAnimation}`}
              style={{ display: checkGmail.error ? 'block' : 'none' }}
            >
              <p>{checkGmail.error}</p>
            </div>
          )}
          <div className="help-below">
            <p>לאימייל המצוין ישלח אישור הטופס בסיום ההרשמה.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-evenly">
        <div className="inputRadio flex-column">
          <div className="label">
            <span> * </span>מין
          </div>
          <div className="container-input-radio">
            <div className="label-radio">
              <input
                type="radio"
                value={'men'}
                name="gender"
                id="men-y45y"
                onChange={handleChange}
                required
              />
              <label htmlFor="men-y45y">זכר</label>
            </div>
            <div className="label-radio">
              <input
                type="radio"
                value={'woman'}
                name="gender"
                id="woman-142424214"
                onChange={handleChange}
                required
              />
              <label htmlFor="woman-142424214">נקבה</label>
            </div>
          </div>
        </div>

        <div className="inputRadio flex-column">
          <div className="label">
            <span> * </span> מצב משפחתי
          </div>
          <div className="container-input-radio">
            <div className="label-radio">
              <input
                type="radio"
                value={'bachelor'}
                name="maritalStatus"
                id="bachelor"
                onChange={handleChange}
                required
              />
              <label htmlFor="bachelor">רווק/ה</label>
            </div>
            <div className="label-radio">
              <input
                type="radio"
                value={'married'}
                name="maritalStatus"
                onChange={handleChange}
                required
              />
              <label htmlFor="married">נשוי/אה</label>
            </div>
            <div className="label-radio">
              <input
                type="radio"
                value={'divorcee'}
                name="maritalStatus"
                onChange={handleChange}
                required
              />
              <label htmlFor="divorcee">גרוש/ה</label>
            </div>
            <div className="label-radio">
              <input
                type="radio"
                value={'widower'}
                name="maritalStatus"
                onChange={handleChange}
                required
              />
              <label htmlFor="widower">אלמן/ה</label>
            </div>
            <div className="label-radio">
              <input
                type="radio"
                value={'separated'}
                name="maritalStatus"
                onChange={handleChange}
                required
              />
              <label htmlFor="separated">פרוד/ה</label>
            </div>
          </div>
        </div>

        <div className="inputRadio flex-column">
          <div className="label">
            <span> * </span> תושב ישראל
          </div>
          <div className="container-input-radio">
            <div className="label-radio">
              <input
                type="radio"
                value={'yes'}
                id="israeliResident-yes"
                name="israeliResident"
                onChange={handleChange}
                required
              />
              <label htmlFor="israeliResident-yes">כן</label>
            </div>
            <div className="label-radio">
              <input
                type="radio"
                value={'no'}
                name="israeliResident"
                onChange={handleChange}
                id="idisraeliResident-no"
                required
              />
              <label htmlFor="israeliResident-no">לא</label>
            </div>
          </div>
        </div>

        <div className="inputRadio flex-column">
          <div className="label">
            <span> * </span> חבר קיבוץ / מושב שיתופי
          </div>
          <div className="container-input-radio">
            <div className="label-radio">
              <input
                type="radio"
                value={'yes'}
                name="memberKibbutzOrMoshav"
                onChange={handleChange}
                required
              />
              <label htmlFor="memberKibbutzOrMoshav-yes">כן</label>
            </div>
            <div className="label-radio">
              <input
                type="radio"
                value={'no'}
                id="memberKibbutzOrMoshav-no"
                name="memberKibbutzOrMoshav"
                onChange={handleChange}
                required
              />
              <label htmlFor="memberKibbutzOrMoshav-no">לא</label>
            </div>
          </div>
        </div>

        <div className="inputRadio flex-column">
          <div className="label">
            <span> * </span> חבר בקופת חולים
          </div>
          <div className="container-input-radio">
            <div className="label-radio">
              <input
                type="radio"
                value={'yes'}
                name="HMOMember"
                id="HMOMember-yes"
                onChange={(e) => {
                  setHMO(!0);
                  handleChange(e);
                }}
                required
              />
              <label htmlFor="HMOMember-yes">כן</label>
            </div>
            <div className="label-radio">
              <input
                type="radio"
                value={'no'}
                name="HMOMember"
                id="HMOMember-no"
                onChange={(e) => {
                  setHMO(!1);
                  handleChange(e);
                }}
                required
              />
              <label htmlFor="HMOMember-no">לא</label>
            </div>
          </div>
          {hmo && (
            <div className="inputRadio flex-column m-t1 open-options">
              <div className="label">
                <span> * </span> שם הקופה
              </div>
              <select
                name="HMOEM"
                id=""
                onChange={(e) => {
                  handleChange(e);
                  setvalueSelect(e.target.value);
                }}
                value={valueSelect}
                noValidate
                required
              >
                <option value="" disabled>
                  בחר קופה
                </option>
                <option value="כללית">כללית</option>
                <option value="לאומית">לאומית</option>
                <option value="מאוחדת">מאוחדת</option>
                <option value="מכבי">מכבי</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
