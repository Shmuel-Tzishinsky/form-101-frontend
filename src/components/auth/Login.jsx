import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/auth/AuthContext';
import checkAdminAuth from '../AdminAuth';
import LoadingLogin from '../loading/Loading-login';

import './login.css';

const LoginForm = () => {
  const [showPass, setShowPass] = useState(!0);
  const [data, setData] = useState({
    email: 'fake@email.com',
    password: 'passwordpassword'
  });

  const { state, LoginAction } = useContext(AuthContext);

  const navigete = useNavigate();
  const nav = () => navigete('/');

  useEffect(() => {
    if (checkAdminAuth(state.token)) navigete('/');
  }, [state.token, navigete]);

  const onFinish = async (e) => {
    e.preventDefault();
    LoginAction(data, nav);
  };

  return (
    <div className="customers-login">
      <div className="form_container">
        <h1 className="page-header">ברוך הבא</h1>
        <form className="login-form" onSubmit={onFinish}>
          <div>
            <label htmlFor="name">אימייל:</label>
            <div className="input-container">
              <input
                required={true}
                type={'email'}
                name="email"
                autoComplete="on"
                defaultValue={data.email || ''}
                className="rounded-pill"
                onInput={(e) => setData({ ...data, email: e.target.value })}
              />
              <i className="bx bx-user"></i>
            </div>
          </div>
          <div>
            <label htmlFor="name">סיסמה:</label>
            <div className="input-container">
              <input
                required={true}
                autoComplete="on"
                type={showPass ? 'password' : 'text'}
                name="password"
                className="rounded-pill"
                defaultValue={data.password || ''}
                onInput={(e) => setData({ ...data, password: e.target.value })}
              />
              <i className="bx bx-lock"></i>
            </div>
            <label className="label-checkbox">
              <input
                type="checkbox"
                onChange={(e) => setShowPass(!e.target.checked)}
              />
              הצג סיסמה
            </label>

            {state.error && (
              <div className="error">
                {state.errResponse
                  .replace('Error:', '')
                  .replace('"email" must be a valid email', 'אימייל לא חוקי')}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="login-form-button"
              disabled={state.loading}
            >
              {state.loading ? <LoadingLogin /> : 'הכנס'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
