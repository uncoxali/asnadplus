import React, { Suspense, useState } from "react";
import { Route, Switch } from "react-router";
import Loading from "../../../components/Loading";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SelectCityClassMember from "./components/SelectCityClassMember";

import "./index.scss";
import routes from "./_routes";
import { useSelector } from "react-redux";

export default function Panel({ match }) {
  const city_class_member = useSelector((state) => state.city_class_member);
  const pathname = match.path;
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 992);
  const showSelectCityClassMember = () => {
    for (let i in city_class_member) {
      if (city_class_member[i] === null) {
        return true;
      }
    }
    return false;
  };
  return (
    <div className="RegistrarPanel w-100 d-flex flex-row">
      <SelectCityClassMember show={showSelectCityClassMember()} />
      <div className={`sidebar d-flex ${showSidebar ? "show" : "hide"}`}>
        <Sidebar />
        <button
          className="close-sidebar"
          onClick={() => setShowSidebar(!showSidebar)}
        />
      </div>
      <div className={`wrapper sidebar-${showSidebar ? "show" : "hide"}`}>
        <Header set={() => setShowSidebar(!showSidebar)} />
        {!showSelectCityClassMember() ? (
          <main className="shadow rounded border bg-white p-4 m-3">
            <Suspense fallback={<Loading />}>
              <Switch>
                {routes.map((item, index) => (
                  <Route
                    key={index}
                    path={`${pathname}${item.pathname}`}
                    component={item.component}
                    exact
                  />
                ))}
                <Route
                  path={`${pathname}/*`}
                  component={() => <h1>404</h1>}
                  exact
                />
              </Switch>
            </Suspense>
          </main>
        ) : null}
      </div>
    </div>
  );
}
