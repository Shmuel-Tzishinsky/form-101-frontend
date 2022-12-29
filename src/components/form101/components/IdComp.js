import React, { useState, useRef } from 'react';

export function checkIdIsraeli(id) {
  if (parseFloat(id) === 0) return false;
  id = String(id).trim();
  if (id.length > 9 && isNaN(id)) return false;
  id = id.length < 9 ? ('00000000' + id).slice(-9) : id;
  return (
    Array.from(id, Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    }) %
      10 ===
    0
  );
}

function IdComp({ idOrPassport, dataText, handleChange, classname }) {
  const [erorrAnimation, setErorrAnimation] = useState('');
  const [showError, setShowError] = useState(false);
  // בדיקת תקינות התעודת זהות
  const [error, setError] = useState(!1);
  const inputID = useRef();

  const focusIfError = () => {
    if (error) {
      inputID.current.focus();
      setShowError(true);
      setErorrAnimation('erorr-animation');
      setTimeout(() => {
        setErorrAnimation('');
      }, 200);
    }
  };

  // בשינוי של הטקסט בתעודת זיהוי
  const changeInput = (e) => {
    const { value } = e.target;
    // לא ריק
    if (value.length !== 0) {
      // אם הטקסט כולל טקסט שהוא לא מספרים
      if (!/^[0-9]+$/.test(value)) {
        setError('num');
      } else if (
        idOrPassport[0] !== 'מספר דרכון' &&
        value.length >= 9 &&
        idOrPassport[0] !== 'מספר דרכון' &&
        value.length < 10
      ) {
        // אחרי שהאורך נכון בודק את תקינות המספר
        setError(!checkIdIsraeli(value));
      } else if (idOrPassport[0] === 'מספר דרכון' && value.length >= 8) {
        const regex = new RegExp('^(?!^0+$)[a-zA-Z0-9]{3,20}$');
        setError(!regex.test(value));
      } else {
        // שגיאת תקינות
        setError(!0);
      }
    } else {
      // אין שגיאה
      setError(!1);
      setShowError(false);
    }

    handleChange(e);
  };

  return (
    <div className={`inputHolder ${classname}`} id="id">
      <label>
        <div className="label">
          <span> * </span>
          {idOrPassport[0]}
        </div>
        <input
          ref={inputID}
          type={idOrPassport[0] === 'מספר זהות' ? 'tel' : 'text'}
          name="id-employee"
          onInput={changeInput}
          onBlur={focusIfError}
          maxLength={idOrPassport[0] === 'מספר זהות' ? '9' : '13'}
          required
        />
      </label>
      {showError && error && (
        <div className={`error ${erorrAnimation}`}>
          <p>{error === 'num' ? dataText.errNum : idOrPassport[2]}</p>
        </div>
      )}
    </div>
  );
}

export default IdComp;
