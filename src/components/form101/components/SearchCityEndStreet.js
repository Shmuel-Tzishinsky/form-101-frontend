import { useState, useEffect, useRef } from "react";

function SearchCityEndStreet({ citi, street, setAllData, allData, inAllData, name }) {
  const [allOption, setAllOption] = useState([]);
  const [showOption, setShowOption] = useState([]);
  const [selectCiti, setSelectCiti] = useState();
  const [openOption, setOpenOption] = useState("");
  const [searchInput, setSerchInput] = useState("");

  const autofocus = useRef(null);

  useEffect(() => {
    if (autofocus.current && openOption !== "") {
      autofocus.current.focus();
    }
  }, [openOption]);

  const handleCiti = (e) => {
    setSelectCiti(e);
    if (e && encodeURI !== allData.employeeDetails[name[0]]) {
      setAllData((values) => ({
        ...values,
        [inAllData]: { ...values[inAllData], [name[0]]: e },
      }));
    }
  };

  useEffect(() => {
    setShowOption(allOption);
  }, [allOption, setShowOption]);

  useEffect(() => {
    async function fetchData() {
      if (street && allData.employeeDetails.citi && allData.employeeDetails.citi !== "") {
        handleCiti(null);

        let res = await fetch(
          `https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&q=${allData.employeeDetails.citi}&fields=שם_ישוב&fields=שם_רחוב&fields=סמל_ישוב&limit=90000`
        );

        const data = await res.json();

        if (data.success) {
          let mapCiti = data.result.records
            .filter(
              (e) =>
                e["שם_ישוב"] === allData.employeeDetails.citi && e["שם_ישוב"].replace(/^\s+|\s+$/g, "") !== e["שם_רחוב"].replace(/^\s+|\s+$/g, "")
            )
            .map((e) => e["שם_רחוב"]);

          setAllOption(mapCiti);
        }
      }
    }
    fetchData();
  }, [allData.employeeDetails.citi, street]);

  useEffect(() => {
    async function fetchData() {
      if (!street) {
        let data = await (
          await fetch(
            `https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&q=&fields=שם_ישוב&limit=90000&sort=שם_ישוב&distinct=true`
          )
        ).json();

        if (data.success) {
          const arrayData = data.result.records.map((e) => e["שם_ישוב"]);

          function array_move(arr, old_index, new_index) {
            if (new_index >= arr.length) {
              var k = new_index - arr.length + 1;
              while (k--) {
                arr.push(undefined);
              }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr;
          }

          if (arrayData) {
            let s = [
              "עמנואל ",
              "באר שבע ",
              "גבעת זאב ",
              "רמת גן ",
              "מודיעין עילית ",
              "חצור הגלילית ",
              "אלעד ",
              "אשדוד ",
              "בית שמש ",
              "ביתר עילית ",
              "תל אביב - יפו ",
              "פתח תקווה ",
              "ירושלים ",
              "בני ברק ",
            ];

            let newArray = [];
            s.forEach((e) => (newArray = array_move(arrayData, arrayData.indexOf(e), 0)));

            setAllOption(newArray);
          }
        }
      }
    }
    fetchData();
  }, [street]);

  const searchCiti = (e) => {
    setSerchInput(e.target.value);
    const filterData = allOption.filter((item) => item.includes(e.target.value));

    if (filterData.length === 0) {
      handleCiti("");
      return setShowOption(["לא נמצאו תוצאות"]);
    }

    setShowOption(filterData);
  };

  return (
    <div className="inputHolder">
      <label>
        <div className="label">
          <span> * </span>
          {name[1]}
        </div>

        <div>
          <label style={{ position: "relative" }}>
            <input
              type="text"
              autoComplete="off"
              spellCheck="false"
              className="inputDemo"
              autoCorrect="off"
              defaultValue={street && showOption.length === 0 ? `אין רחובות ב${allData.employeeDetails.citi}` : selectCiti}
              onBlur={() => setOpenOption("")}
              onFocus={() => setOpenOption("open-option-dropDown")}
              onKeyDown={(e) => {
                e.preventDefault();
                return false;
              }}
              required
            />

            <div
              className="demoInput"
              style={{
                position: "absolute",
                top: "-9.6px",
                height: "38px",
                left: " 0",
                width: "100%",
                bottom: "-11px",
                right: "0",
                background: " #fff",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {street && showOption.length === 0 ? `אין רחובות ב${allData.employeeDetails.citi}` : selectCiti}
            </div>
          </label>

          <div className={`option-dropDown ${openOption}`}>
            {showOption.length !== 0 ? (
              (allData.employeeDetails.citi && allData.employeeDetails.citi !== "") || !street ? (
                <>
                  <div className="search-drop">
                    <input
                      autoComplete="off"
                      spellCheck="false"
                      autoCorrect="off"
                      type="text"
                      onBlur={() => setOpenOption("")}
                      onFocus={() => setOpenOption("open-option-dropDown")}
                      onInput={searchCiti}
                      value={searchInput}
                      ref={autofocus}
                    />
                    <div className="icon-search">{searchIcon()}</div>
                  </div>

                  <div className="all-options">
                    {showOption.map((e, k) => (
                      <div key={k} onMouseDown={() => e !== "לא נמצאו תוצאות" && handleCiti(e)}>
                        {e}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="all-options">
                  <div>יש לבחור קודם ישוב</div>
                </div>
              )
            ) : (
              <div className="all-options">
                <div>אין רחובות ב{allData.employeeDetails.citi}</div>
              </div>
            )}
          </div>
        </div>
      </label>
    </div>
  );
}

const searchIcon = () => (
  <svg width="16" height="16" fill="#686868" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
  </svg>
);

export default SearchCityEndStreet;
