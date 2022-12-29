import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/Loading';
import { UserContext } from '../../context/userState/userContext';

import { MdDelete } from 'react-icons/md';
import './editOrAddAdmin.css';
import { RiLockPasswordLine } from 'react-icons/ri';

function EditOrAddAdmin(props) {
  const { id } = useParams();
  const { state, addUser, fetchSingleUser, editUser } = useContext(UserContext);
  const { error, loading, user, errResponse } = state;

  const [data, setData] = useState({});
  const [changePassword, setChangePassword] = useState(false);

  const navigate = useNavigate();

  const nav = () => navigate('/admins');
  useEffect(() => {
    if (user && id && id === user._id) {
      delete user.password;

      setData(user);
    }
  }, [user, setData, id]);

  useEffect(() => {
    if (id) {
      fetchSingleUser(id);
    }
  }, [fetchSingleUser, id]);

  const sendCustomers = (e, data) => {
    e.preventDefault();

    //  data.isActive
    const dataStete = {
      name: data.name,
      phone: data.phone,
      role: data.role || 'member',
      password: data.password,
      email: data.email,
      isActive: data.isActive
    };

    if (id) {
      dataStete._id = id;
      !changePassword && delete dataStete.password;
      editUser(dataStete, nav);
    } else {
      addUser(dataStete, nav);
    }
  };
  return (
    <>
      {!loading ? (
        <div className="customers">
          <div className="card__body forms">
            <div className="form_new_customers">
              <h2 className="page-header">
                {id ? `ערוך את ${data.name || ''}` : 'הוסף מנהל'}
                {id && <DeleteMessage userName={data.name} id={id} nav={nav} />}
              </h2>
              {error && (
                <p
                  style={{
                    color: 'red',
                    fontSize: '1rem',
                    textAlign: 'center'
                  }}
                >
                  {errResponse}
                </p>
              )}
              <form
                autoComplete="off"
                role="presentation"
                onSubmit={(e) => sendCustomers(e, data)}
              >
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
                    <label htmlFor="address">תפקיד:</label>
                    <div className="input_container">
                      <select
                        name="role"
                        id="role"
                        required={true}
                        onChange={(e) =>
                          setData({ ...data, role: e.target.value })
                        }
                        defaultValue={data.role ? data.role : 'member'}
                      >
                        <option value="member">חבר</option>
                        <option value="staff">צוות</option>
                      </select>

                      <i className="bx bx-spreadsheet" />
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

                {!id || changePassword ? (
                  <div className="row">
                    <div>
                      <label htmlFor="address">סיסמה:</label>
                      <div className="input_container">
                        <input
                          type="password"
                          name="address"
                          id="address"
                          autoComplete="new-password"
                          required={true}
                          defaultValue={data.password}
                          onInput={(e) =>
                            setData({ ...data, password: e.target.value })
                          }
                        />
                        <i className="bx bx-shield-quarter" />
                      </div>
                    </div>
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
                  </div>
                ) : (
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
                )}

                <div className="row">
                  <div>
                    {id && (
                      <label
                        onClick={() => setChangePassword(!changePassword)}
                        style={{
                          cursor: 'pointer',
                          paddingTop: '20px'
                        }}
                      >
                        <RiLockPasswordLine
                          style={{
                            marginLeft: '4px',
                            marginBottom: '-3px'
                          }}
                        />
                        {!changePassword ? 'שנה סיסמה' : 'אל תשנה סיסמה'}{' '}
                      </label>
                    )}
                  </div>
                  <div>
                    <div className="bottons">
                      <button type="submit">שמור</button>
                      <div className="back" onClick={nav}>
                        חזור
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

const DeleteMessage = ({ userName, id, nav }) => {
  const [showDeleteMessage, setShowDeleteMessage] = useState(!1);
  const { deleteUserAction } = useContext(UserContext);

  const deleteUser = () => {
    deleteUserAction(id, nav);
  };

  return (
    <div className="delete-user">
      <div className="delete-btn" onClick={() => setShowDeleteMessage(!0)}>
        <MdDelete />
      </div>
      {showDeleteMessage && (
        <div className="delete-message">
          <p>האם אתה בטוח שברצונך למחוק את {userName}?</p>
          <div className="bottons">
            <button onClick={() => setShowDeleteMessage(!1)}>בטל</button>
            <button onClick={deleteUser}>מחק</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditOrAddAdmin;
