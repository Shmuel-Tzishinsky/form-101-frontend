import { FiAlertTriangle } from "react-icons/fi";
import { baseURL } from "../../config";

function Errors({ errors, showPage, setShowPage }) {
  const shoeClose = () => setShowPage(true);

  return (
    <>
      {!showPage && (
        <div className="error-container">
          <div className="error-blur"></div>
          <div className="error">
            <div className="error-header">
              <img
                src={`${baseURL.replace("5000", "3000")}images/error-icon.jpg`}
                alt=""
              />
              <div className="error-title">
                {" "}
                אנא תקן {errors.length} סעיפים אלו כדי להמשיך{" "}
              </div>
            </div>

            <div className="error-main">
              <div className="error-list">
                {errors.map((e, k) => (
                  <div key={k} className="error-line">
                    <div className="error-num">
                      <FiAlertTriangle />
                    </div>
                    <div>
                      <div className="error-line-positin">
                        סעיף: <span>{e.position}</span>
                      </div>
                      <div className="error-line-error">
                        {" "}
                        <span>{e.data}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="error-footer">
              <div className="error-close-btn" onClick={shoeClose}>
                אישור
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Errors;
