import { useState } from 'react';

function Date({
  title,
  name,
  setAllData,
  requiredB,
  year,
  helpBleow,
  nameObj,
  maxWidth
}) {
  return (
    <div className="inputHolder date-inputHolder" {...maxWidth}>
      <div>
        <div className="label">
          {requiredB ? (
            <>
              <span> *</span>
              {title}
            </>
          ) : (
            title
          )}
        </div>
        <div className="container-input-date">
          <Dropdown
            name={`${name}Year`}
            from={year.min}
            to={year.max}
            dateText="שנה"
            setAllData={setAllData}
            nameObj={nameObj}
            required={requiredB}
          />
          <Dropdown
            name={`${name}Month`}
            from={1}
            to={12}
            dateText="חודש"
            setAllData={setAllData}
            nameObj={nameObj}
            required={requiredB}
          />
          <Dropdown
            name={`${name}Day`}
            from={1}
            to={31}
            dateText="יום"
            setAllData={setAllData}
            nameObj={nameObj}
            required={requiredB}
          />
        </div>
      </div>

      {helpBleow && (
        <div className="help-below">
          <p>{helpBleow}</p>
        </div>
      )}
    </div>
  );
}

export default Date;

const setLengthOptions = (from, to, dateText) => {
  const array = [dateText];
  for (let i = parseFloat(to); i >= parseFloat(from); i--) {
    array.push(i);
  }

  return array;
};

function Dropdown({ name, from, to, dateText, setAllData, nameObj, required }) {
  const [isActive, setIsActive] = useState('');
  const [select, setSelect] = useState(dateText);
  const options = setLengthOptions(from, to, dateText);

  const setSelectFunction = (opt) => {
    setAllData((values) => ({
      ...values,
      [nameObj]: {
        ...values[nameObj],
        [name]: opt !== dateText ? opt : null
      }
    }));

    setSelect(opt);
    setIsActive('close-dropdown-content');
  };

  return (
    <div className="dropdown">
      <label>
        <select
          type="text"
          autoComplete="off"
          spellCheck="false"
          className="dropdown-btn"
          autoCorrect="off"
          onBlur={() => setIsActive('close-dropdown-content')}
          onFocus={() => setIsActive('open-dropdown-content')}
          onKeyDown={(e) => {
            e.preventDefault();
            return false;
          }}
          required={required}
        >
          <option value={`${select === dateText ? '' : select}`} key="">
            {select === dateText ? '' : select}
          </option>
        </select>

        <div className="demoInput">
          <div> {select} </div>
          <div className="fas fa-caret-down"></div>
        </div>
      </label>

      <div className={`dropdown-content ${isActive}`}>
        {options.map((opt, k) => (
          <div
            key={k}
            className="dropdown-item"
            onMouseDown={() => {
              setSelectFunction(opt);
            }}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}
