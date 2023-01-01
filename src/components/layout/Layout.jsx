import React, { useEffect } from "react";

import "./layout.css";

import TopNav from "../topnav/TopNav";

import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute themeReducer={themeReducer}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/companys"
            element={
              <ProtectedRoute themeReducer={themeReducer}>
                <Companys />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/companys/edit/:id"
            element={
              <ProtectedRoute themeReducer={themeReducer}>
                <NewCompany />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/companys/newCompany"
            element={
              <ProtectedRoute themeReducer={themeReducer}>
                <NewCompany />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/forms"
            element={
              <ProtectedRoute themeReducer={themeReducer}>
                <Forms />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/forms/:id"
            element={
              <ProtectedRoute themeReducer={themeReducer}>
                <SelectForm />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admins"
            element={
              <ProtectedRoute themeReducer={themeReducer}>
                <Admins />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/edit-admin/:id"
            element={
              <ProtectedRoute themeReducer={themeReducer}>
                <EditOrAddAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/add-new-user"
            element={
              <ProtectedRoute themeReducer={themeReducer}>
                <EditOrAddAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/settings"
            element={
              <ProtectedRoute themeReducer={themeReducer}>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="/user/login" element={<LoginForm />} />
          <Route path="/form101/:id" element={<Form101 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

const ProtectedRoute = ({ children, themeReducer }) => {
  const [colorLogo, setColorLogo] = useState("");

  useEffect(() => {
    function randomColor() {
      let hue = Math.floor(Math.random() * 359);
      let hsl = `hsl(${hue}deg 100% 82%)`;

      return hsl;
    }

    setColorLogo(randomColor());
  }, [Element, setColorLogo]);

  if (!checkAdminAuth()) {
    return <Navigate to="/user/login" />;
  }

  return (
    <UserProvider>
      <CompanysProvider>
        <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
          <div className="layout__content">
            <TopNav colorLogo={colorLogo} />
            <div className="layout__content-main">{children}</div>
          </div>
        </div>
      </CompanysProvider>
    </UserProvider>
  );
};

const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

export default Layout;
