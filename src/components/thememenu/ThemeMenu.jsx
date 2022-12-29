import React, { useRef } from 'react';

import { Link } from 'react-router-dom';

import './thememenu.css';

import logo from '../../assets/images/logo.png';

import sidebar_items from '../../assets/JsonData/sidebar_routes.json';

const clickOutsideRef = (content_ref, toggle_ref) => {
  document.addEventListener('mousedown', (e) => {
    // user click toggle
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      content_ref.current.classList.toggle('active');
    } else {
      // user click outside toggle and content
      if (content_ref.current && !content_ref.current.contains(e.target)) {
        content_ref.current.classList.remove('active');
      }
    }
  });
};

const ThemeMenuItem = (props) => {
  const active = props.active ? 'active' : '';

  return (
    <div className="theme-menu__item">
      <div className={`theme-menu__item-inner ${active}`}>
        <span>{props.title}</span>
        <i className={props.icon}></i>
      </div>
    </div>
  );
};

const ThemeMenu = (props) => {
  const menu_ref = useRef(null);
  const menu_toggle_ref = useRef(null);

  clickOutsideRef(menu_ref, menu_toggle_ref);

  const setActiveMenu = () => menu_ref.current.classList.add('active');

  const closeMenu = () => menu_ref.current.classList.remove('active');

  const pathname = window.location.pathname.split('/')[1];

  const activeItem = sidebar_items.findIndex(
    (item) => item.route === `/${pathname}`
  );

  return (
    <div>
      <button
        ref={menu_toggle_ref}
        className="dropdown__toggle"
        onClick={() => setActiveMenu()}
      >
        <i className="bx bx-menu"></i>
      </button>

      <div ref={menu_ref} className="theme-menu">
        <div className="theme-menu__logo">
          <img src={logo} alt="company logo" />
        </div>
        <button className="theme-menu__close" onClick={closeMenu}>
          <i className="bx bx-x"></i>
        </button>

        {sidebar_items.map((item, index) => (
          <Link to={item.route} key={index} onClick={closeMenu}>
            <ThemeMenuItem
              title={item.display_name}
              icon={item.icon}
              active={index === activeItem}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ThemeMenu;
