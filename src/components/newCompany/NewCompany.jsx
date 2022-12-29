import { useContext, useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import useCopmanys, {
  CpompanysContext
} from '../../context/companysState/CompanysContext.js';
import { axiosInstance } from '../config.js';
import Loading from '../loading/Loading';
import './newCompany.css';

function NewCompany(props) {
  const { editCompany, addNewCompany, error, load } = useCopmanys();

  const [data, setData] = useState({});

  const navigate = useNavigate();

  const nav = () => navigate('/companys');

  const { id } = useParams();

  useEffect(() => {
    const fatchData = async () => {
      if (id) {
        const value = await axiosInstance.post(
          'api/companys/get-edit-company',
          {
            data: id
          }
        );
        setData(value?.data?.data || {});
      }
    };

    fatchData();
  }, [id, setData]);

  const sendCustomers = async (e) => {
    e.preventDefault();

    const dataStete = {
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
      privateCompany: data.privateCompany,
      deductionsPortfolio: data.deductionsPortfolio,
      isActive: data.isActive ? true : false,
      token: data.token
    };

    if (id) {
      editCompany(dataStete, nav);
    } else {
      addNewCompany(dataStete, nav);
    }
  };

  return (
    <div className="customers">
      <div className="card__body forms">
        <div className="form_new_customers">
          <h2 className="page-header">
            {id ? `ערוך את ${data.name || ''}` : 'הוסף חברה חדשה'}
            {id && (
              <DeleteMessage userName={data.name} id={data._id} nav={nav} />
            )}
          </h2>
          {error && (
            <p style={{ color: 'red', fontSize: '1rem', textAlign: 'center' }}>
              {error}
            </p>
          )}
          <form onSubmit={sendCustomers} autoComplete="new-password">
            {!load ? (
              <>
                <div className="row">
                  <div>
                    <label htmlFor="name">שם:</label>
                    <div className="input_container">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required={true}
                        defaultValue={data.name}
                        onInput={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                      />
                      <i className="bx bx-user" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone">טלפון:</label>
                    <div className="input_container">
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        required={true}
                        defaultValue={data.phone}
                        onInput={(e) =>
                          setData({ ...data, phone: e.target.value })
                        }
                      />
                      <i className="bx bx-phone" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div>
                    <label htmlFor="address">כתובת:</label>
                    <div className="input_container">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        required={true}
                        defaultValue={data.address}
                        onInput={(e) =>
                          setData({ ...data, address: e.target.value })
                        }
                      />
                      <i className="bx bx-home" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email">אמייל</label>
                    <div className="input_container">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        min={'6'}
                        defaultValue={data.email}
                        onInput={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        required={true}
                      />
                      <i className="bx bx-envelope" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div>
                    <label htmlFor="privateCompany">ח"פ:</label>
                    <div className="input_container">
                      <input
                        type="number"
                        name="privateCompany"
                        id="privateCompany"
                        defaultValue={data.privateCompany}
                        onInput={(e) =>
                          setData({ ...data, privateCompany: e.target.value })
                        }
                        required={true}
                        autoComplete="off"
                      />

                      <i className="bx bx-link" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="deductionsPortfolio">תיק ניכויים</label>
                    <div className="input_container">
                      <input
                        type="number"
                        name="deductionsPortfolio"
                        id="deductionsPortfolio"
                        defaultValue={data.deductionsPortfolio}
                        required={true}
                        autoComplete="off"
                        onInput={(e) =>
                          setData({
                            ...data,
                            deductionsPortfolio: e.target.value
                          })
                        }
                      />
                      <i className="bx bx-link-alt" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div>
                    <label>פעיל:</label>
                    <div className="input_container">
                      <input
                        type="checkbox"
                        id="switch-switch"
                        className="switch-active"
                        defaultChecked={data.isActive}
                        onInput={(e) =>
                          setData({ ...data, isActive: e.target.checked })
                        }
                      />
                      <label
                        className="switch-label-active"
                        htmlFor="switch-switch"
                      ></label>
                      <i
                        className={`bx bx-user-${
                          data.isActive ? 'check' : 'x'
                        }`}
                      />
                    </div>
                  </div>
                  <div></div>
                </div>
              </>
            ) : (
              <Loading />
            )}
            <div className="row">
              <div></div>
              <div>
                <div className="bottons">
                  <button type="submit">שמור</button>
                  <div className="back" onClick={() => navigate('/companys')}>
                    חזור
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewCompany;

const DeleteMessage = ({ userName, id, nav }) => {
  const [showDeleteMessage, setShowDeleteMessage] = useState(!1);
  const { deleteCompany } = useContext(CpompanysContext);

  const deleteUser = () => {
    deleteCompany(id, nav);
    setShowDeleteMessage(!1);
  };

  return (
    <div className="delete-user">
      <div className="delete-btn" onClick={() => setShowDeleteMessage(!0)}>
        <MdDelete />
      </div>
      {showDeleteMessage && (
        <div className="delete-message">
          <p>האם אתה בטוח שברצונך למחוק את {userName}?</p>
          <br />
          <h3>שים לב: מחיקת החברה תמחק את כל הטפסים המשויכים אליה.</h3>
          <div className="bottons">
            <button onClick={() => setShowDeleteMessage(!1)}>בטל</button>
            <button onClick={deleteUser}>מחק</button>
          </div>
        </div>
      )}
    </div>
  );
};
