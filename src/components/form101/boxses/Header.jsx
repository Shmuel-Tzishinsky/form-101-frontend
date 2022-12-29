// שנת המס
// בחודש הראשון של השנה יהיה גם שנה קודמת, הנוכחית, והשנה הבאה
// בכל שאר השנה יהיה רק את השנה הנוכחית ואת השנה הבאה
const setAllYears = () => {
  const dateYear = new Date();
  const y = dateYear.getFullYear();
  const m = dateYear.getUTCMonth() + 1;

  return m === 1 ? [y - 1, String(y), y + 1] : [String(y), y + 1];
};

function Header({ setAllData }) {
  const years = setAllYears();

  const handleChange = (e) => {
    setAllData((values) => ({
      ...values,
      header: { ...values.header, taxYear: e.target?.value },
    }));
  };

  return (
    // כותרת + שנת המס
    <div className="myContainer">
      <div className="title">טופס 101</div>
      <p className="header-text">
        כרטיס עובד - ובקשה להקלה ולתיאום מס על ידי המעביד לפי תקנות מס הכנסה
        (ניכוי ממשכורת ומשכר עבודה), התשנ"ג - 1993
      </p>
      <div className="line"></div>

      {/* <!-- .שנת המס: --> */}
      <h4>שנת המס:</h4>
      {years.map((y, k) => (
        <label key={k}>
          {typeof y === "string" || y instanceof String ? (
            <input
              type={"radio"}
              value={y}
              name="taxYear"
              onChange={handleChange}
              defaultChecked
            />
          ) : (
            <input
              type={"radio"}
              value={y}
              name="taxYear"
              onChange={handleChange}
            />
          )}
          <span> {y} </span>
        </label>
      ))}
    </div>
  );
}

export default Header;
