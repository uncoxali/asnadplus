import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { getShowCustomer } from "../../../../../redux/showCustomer";
import Sidebar from "../Sidebar";
import "./index.scss";

export default function Header({ set = () => {} }) {
  const [time, setTime] = useState(null);

  const dispatch = useDispatch();

  const set_city_class_member = (data) =>
    dispatch({ type: "SET_CITY_CLASS_MEMBER", data });

  const showCustomer = useSelector((state) => state.showCustomer);
  const profile = useSelector((state) => state.profile);
  const city_class_member = useSelector((state) => state.city_class_member);

  const city_class_member_names = (key = "city") => {
    if (city_class_member[key] !== null) {
      return city_class_member[key].name;
    }
    return "تعریف نشده";
  };
  const gotToSelectCity = () => {
    set_city_class_member({ city: null, class: null, member: null });
  };
  const goToSelectClass = () => {
    set_city_class_member({ ...city_class_member, class: null, member: null });
  };
  const gotToSelectMember = () => {
    set_city_class_member({ ...city_class_member, member: null });
  };
  const showFiscalYear = () => {
    if (showCustomer !== null) {
      return showCustomer.detail.fund_setting.fiscal_year.year;
    }
    return "تعریف نشده";
  };
  const showTime = (value = "0") => {
    if (Number(value) < 10) {
      return `0${value}`;
    }
    return value;
  };

  const updateTime = () => {
    const date = new Date();
    const newTime = `${showTime(date.getHours())}:${showTime(
      date.getMinutes()
    )}:${showTime(date.getSeconds())}`;
    setTime(newTime);
  };

  useEffect(() => {
    setInterval(() => updateTime(), 1000);
  }, []);
  useEffect(() => {
    if (city_class_member.member !== null) {
      getShowCustomer(city_class_member.member.id);
    }
  }, [city_class_member.member]);
  return (
    <>
      <header className="Header border-bottom border-light bg-white shadow">
        <Row className="text-dark align-items-center mx-0 py-1">
          <Col>
            <Button
              onClick={set}
              variant="outline-dark"
              className="border-0 shadow-none"
            >
              <List size="30px" />
            </Button>
          </Col>
          <Col>
            <label className="w-100 text-center link" onClick={gotToSelectCity}>
              {city_class_member_names("city")}
            </label>
          </Col>
          <Col>
            <label className="w-100 text-start">{`سال مالی جاری: ${showFiscalYear()}`}</label>
          </Col>
        </Row>
        <div className="w-100 border-top border-light " />
        <Row className="text-dark align-items-center mx-0 py-1">
          <Col>
            <label>مسئول ثبت: {profile.name}</label>
          </Col>
          <Col xs="6" className="row flex-center text-center">
            <div className="col-12 col-md-4 link" onClick={goToSelectClass}>
              {`اتحادیه ${city_class_member_names("class")}: `}
            </div>
            <div className="col-12 col-md-4">
              {city_class_member_names("member")}
            </div>
            <Button
              variant="outline-primary"
              onClick={gotToSelectMember}
              size="sm"
              className="col-12 col-md-4"
            >
              تغییر مشتری
            </Button>
          </Col>
          <Col>
            <label className="w-100 text-start">{time}</label>
          </Col>
        </Row>
      </header>
    </>
  );
}
