import './topnav.css';

import { Link } from 'react-router-dom';

import Dropdown from '../dropdown/Dropdown';

import ThemeMenu from '../thememenu/ThemeMenu';

import user_menu from '../../assets/JsonData/user_menus.json';

import Sight from '../sight/Sight';
import { useContext } from 'react';
import { UserContext } from '../../context/userState/userContext';

const renderUserToggle = (userName, colorLogo) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <div
        className="logo-user"
        style={{
          backgroundColor: colorLogo
        }}
        title={userName}
      >
        {userName.split(' ')[0][0]}
      </div>
    </div>
    <div className="name"> {userName.split(' ')[0]}</div>
  </div>
);

const renderUserMenu = (item, index) => (
  <Link
    to={item.content === 'התנתק' ? '/user/login' : '/'}
    key={index}
    onClick={() =>
      item.content === 'התנתק'
        ? localStorage.removeItem('mern_admin_dashboard')
        : ''
    }
  >
    <div className="notification-item">
      <span>{item.content}</span>
      <i className={item.icon}></i>
    </div>
  </Link>
);

const Topnav = ({ colorLogo }) => {
  const { state } = useContext(UserContext);
  const { userName } = state;

  return (
    <div className="topnav">
      <div className="topnav__right">
        {/* dropdown here */}
        <div className="topnav__right-item">
          <Dropdown
            customToggle={() =>
              renderUserToggle(
                userName === ''
                  ? userName
                  : localStorage.getItem('mern_admin_name'),
                colorLogo
              )
            }
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        {/* dropdown here */}
        <div className="topnav__right-item">
          <Sight />
        </div>
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
