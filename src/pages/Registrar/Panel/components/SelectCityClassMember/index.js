import { Modal } from "react-bootstrap";
import SelectCity from "./SelectCity";
import SelectClass from "./SelectClass";
import "./index.scss";
import { useEffect, useState } from "react";
import SelectMember from "./SelectMember";
import { useDispatch, useSelector } from "react-redux";

export default function SelectCityClassMember({ show = true }) {
  const dispatch = useDispatch();
  const city_class_member = useSelector((state) => state.city_class_member);
  const set_city_class_member = (data) =>
    dispatch({ type: "SET_CITY_CLASS_MEMBER", data });
  const modalHeader = [
    {
      id: 0,
      label: "انتخاب صنف",
      part: "city",
      onClick: () => setCity(null),
    },
    {
      id: 1,
      label: "انتخاب اتحادیه",
      part: "class",
      onClick: () => setClass(null),
    },
    {
      id: 2,
      label: "انتخاب مشتری",
      part: "member",
      onClick: () => setMember(null),
    },
  ];
  const activeItem = modalHeader.find(
    (e) => city_class_member[e.part] === null
  );
  const activetab = activeItem !== undefined ? activeItem.id : null;
  const setCity = (item = {}) => {
    const data = { city: item, class: null, member: null };
    set_city_class_member(data);
  };
  const setClass = (item = {}) => {
    const data = { ...city_class_member, class: item, member: null };
    set_city_class_member(data);
  };
  const setMember = (item = {}) => {
    const data = { ...city_class_member, member: item };
    set_city_class_member(data);
  };

  return (
    <Modal dir="rtl" show={show} className="SelectCityClassMember">
      <Modal.Header>
        <div className="Modal-header d-flex flex-row justify-content-between align-items-start">
          {modalHeader.map((item) => (
            <div
              key={item.id}
              className={`${activetab >= item.id ? "active" : ""}`}
            >
              <div
                onClick={() => {
                  if (city_class_member[item.part] !== null) {
                    item.onClick()
                  }
                }}
                className="h1"
              >
                {item.id + 1}
              </div>
              <label>{item.label}</label>
            </div>
          ))}
        </div>
      </Modal.Header>
      <SelectCity show={activetab === 0} setCity={setCity} />
      <SelectClass
        show={activetab === 1}
        city={city_class_member.city}
        setClass={setClass}
      />
      <SelectMember
        show={activetab === 2}
        classN={city_class_member.class}
        setMember={setMember}
      />
    </Modal>
  );
}
