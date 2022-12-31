import React, { useEffect } from "react";

import "./layout.css";

import TopNav from "../topnav/TopNav";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import ThemeAction from "../../context/actions/ThemeAction";
import checkAdminAuth from "../AdminAuth";

import { UserProvider } from "../../context/userState/userContext";
import { AuthProvider } from "../../context/auth/AuthContext";

import Dashboard from "../../pages/Dashboard";
import Companys from "../../pages/Companys";
import Forms from "../../pages/Forms";
import { SelectForm } from "../../pages/Forms";
import Admins from "../../pages/Admins";
import Settings from "../../pages/Settings";
import NewCompany from "../newCompany/NewCompany";
import EditOrAddAdmin from "../editOrAddAdmin/EditOrAddAdmin";

import Form101 from "../form101/Main";
import { CompanysProvider } from "../../context/companysState/CompanysContext";
import LoginForm from "../auth/Login";
import { useState } from "react";

const Layout = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-light");

    const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

    dispatch(ThemeAction.setMode(themeClass));

    dispatch(ThemeAction.setColor(colorClass));
  }, [dispatch]);

  return (
    <Routes>
      <Route exact path="/" element={<PagesAdmin Element={Dashboard} themeReducer={themeReducer} />} />
      <Route exact path="/companys" element={<PagesAdmin Element={Companys} themeReducer={themeReducer} />} />
      <Route exact path="/companys/edit/:id" element={<PagesAdmin Element={NewCompany} themeReducer={themeReducer} />} />
      <Route exact path="/companys/newCompany" element={<PagesAdmin Element={NewCompany} themeReducer={themeReducer} />} />
      <Route exact path="/forms" element={<PagesAdmin Element={Forms} themeReducer={themeReducer} />} />
      <Route exact path="/forms/:id" element={<PagesAdmin Element={SelectForm} themeReducer={themeReducer} />} />

      <Route exact path="/admins" element={<PagesAdmin Element={Admins} themeReducer={themeReducer} />} />

      <Route exact path="/edit-admin/:id" element={<PagesAdmin Element={EditOrAddAdmin} themeReducer={themeReducer} />} />
      <Route exact path="/add-new-user" element={<PagesAdmin Element={EditOrAddAdmin} themeReducer={themeReducer} />} />
      <Route exact path="/settings" element={<PagesAdmin Element={Settings} themeReducer={themeReducer} />} />
      <Route
        exact
        path="/user/login"
        element={
          <AuthProvider>
            <LoginForm />
          </AuthProvider>
        }
      />
      <Route exact path="/form101/:id" element={<Form101 />} />
      <Route exact path="*" element={<NotFound />} />
    </Routes>
  );
};

const PagesAdmin = ({ Element, themeReducer }) => {
  const [colorLogo, setColorLogo] = useState("");

  useEffect(() => {
    function randumColor() {
      let hue = Math.floor(Math.random() * 359);
      let hsl = `hsl(${hue}deg 100% 82%)`;

      return hsl;
    }

    setColorLogo(randumColor());
  }, [Element, setColorLogo]);

  return (
    <>
      {checkAdminAuth() ? (
        <UserProvider>
          <CompanysProvider>
            <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
              <div className="layout__content">
                <TopNav colorLogo={colorLogo} />
                <div className="layout__content-main">
                  <Element />
                </div>
              </div>
            </div>
          </CompanysProvider>
        </UserProvider>
      ) : (
        window.location.replace("/user/login")
      )}
    </>
  );
};

const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

export default Layout;
