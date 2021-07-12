import React from "react";
import { Accordion, Button } from "react-bootstrap";
import { ArrowBarRight, CaretDown } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import "./index.scss";
import sidebarItem from "./_sidebar";
import axios from "../../../../../boot/axios";
import moment from "jalali-moment";

export default function Sidebar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    localStorage.removeItem("role");
    dispatch({ type: "SET_ROLE", data: null });
    delete axios.defaults.headers.Authorization;
    history.push("/sign-in");
  };
  let pe = 2;
  const items = (list = sidebarItem) => {
    const globalItemClassName = "text-white text-end w-100 border-0 btn-md";
    const sidebarItemClassName = `Sidebar-item btn btn-outline-primary pe-${pe}`;
    let listItem = [];
    list.forEach((item, index) => {
      if (item.tag === "Link") {
        listItem.push(
          <Link
            key={index}
            className={`${globalItemClassName} ${sidebarItemClassName}`}
            to={`/registrar${item.to}`}
          >
            {item.icon !== null
              ? React.createElement(item.icon, { className: "ms-2" })
              : null}
            {item.label}
          </Link>
        );
      } else if (item.tag === "Accordion") {
        pe = 4;
        listItem.push(
          <React.Fragment key={index}>
            <Accordion.Toggle
              eventKey={index}
              className={`${globalItemClassName} ${sidebarItemClassName} d-flex align-items-center`}
            >
              {React.createElement(item.icon, { className: "ms-2" })}
              {item.label}
              <CaretDown className="me-auto" />
            </Accordion.Toggle>
            <Accordion.Collapse
              eventKey={index}
              className={globalItemClassName}
            >
              <React.Fragment>{items(item.children)}</React.Fragment>
            </Accordion.Collapse>
          </React.Fragment>
        );
      }
    });
    return listItem;
  };

  const dateShamsi = () => {
    const date = moment().locale("fa").format("YYYY/MM/DD");
    return date;
  };

  const dateMiladi = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = `${yyyy}/${mm}/${dd}`;
    return today;
  };

  const DaysAWeek = () => {
    const days = [
      { fa: "یکشنبه", en: "Sunday" },
      { fa: "دوشنبه", en: "Monday" },
      { fa: "سه‌شنبه", en: "Tuesday" },
      { fa: "چهارشنبه", en: "Wednesday" },
      { fa: "پنجشنبه", en: "Thursday" },
      { fa: "جمعه", en: "Friday" },
      { fa: "شنبه", en: "Saturday" },
    ];
    const day = new Date().getDay();
    return days[day];
  };

  return (
    <div>
      <div className="Sidebar bg-dark text-white h-100">
        <div className="Sidebar-header d-flex flex-column justify-content-center align-item-center text-white text-center py-3 bg-success">
          <p className="my-1">{`${DaysAWeek().fa} ${dateShamsi()}`}</p>
          <p className="my-1 lang-en-us" dir="ltr">{`${dateMiladi()} ${
            DaysAWeek().en
          }`}</p>
        </div>
        <Accordion>
          {items()}
          <Button
            variant="outline-primary"
            className="text-white text-end w-100 border-0 btn-md Sidebar-item pe-2"
            onClick={logout}
          >
            <ArrowBarRight className="ms-2" />
            خروج از حساب
          </Button>
        </Accordion>
      </div>
    </div>
  );
}
