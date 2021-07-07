import { Tab } from "bootstrap";
import { Col, Row, Button, Form, Tabs } from "react-bootstrap";
import Fieldset from "../../../../../components/Fieldset";
import Slider from "../../../../../components/Slider";
import Check from "./components/Check";
import InputGroup from "../../../../../components/InputGroup";
import InputGroupDate from "../../../../../components/InputGroupDate";
import InputGroupDropdown from "../../../../../components/InputGroupDropdown";
import "./index.scss";
import { useEffect, useState } from "react";
import React from "react";
import axios from "../../../../../boot/axios";
import { useSelector } from "react-redux";
import InputGroupSelectProduct from "../../../../../components/InputGroupSelectProduct";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

export default function RegistrationOfPurchaseAndSettlement() {
  const minimumDate = {
    year: 1400,
    month: 1,
    day: 1,
  };

  const maximumDate = {
    year: 1400,
    month: 12,
    day: 30,
  };
  const [selectedDayRange, setSelectedDayRange] = useState({
    year: 1400,
    month: 4,
    day: 9,
  });

  const [merchandises, setMerchandises] = useState([]);
  const userId = useSelector((state) => state.city_class_member.member.id);
  const [persons, setPersons] = useState([]);
  const [body, setBody] = useState({
    factor_date: "", // تاریخ فاکتور
    factor_number: "", // شماره فاکتور
    enterprise_id: "", // آیدی شخص یا شرکت
    cost: "", // قیمت
    discount: "", // تخفیف
    tax: "", // مالیات
    vat: "", // ارزش افزوده
    returned: "", // مبلغ برگشتی
    description: "", // توضیحات
    merchandises: [],
  });

  const formControls = [
    // {
    //   tag: InputGroupDate,
    //   label: "تاریخ فاکتور",
    //   value: "factor_date",
    //   props: {},
    // },
    {
      tag: InputGroup,
      label: "شماره فاکتور",
      value: "factor_number",
      props: {
        type: "number",
        dir: "ltr",
      },
    },
    {
      tag: InputGroupDropdown,
      label: "نام شخص / شرکت",
      value: "enterprise_id",
      props: {
        items: persons,
      },
    },
    {
      tag: InputGroupSelectProduct,
      label: "کالا ها",
      value: "merchandises",
      props: {
        items: merchandises,
      },
    },
    {
      tag: InputGroup,
      label: "مبلغ خرید",
      value: "cost",
      props: {
        type: "number",
        dir: "ltr",
      },
    },
    {
      tag: InputGroup,
      label: "تخفیف فاکتور",
      value: "discount",
      props: {
        type: "number",
        dir: "ltr",
      },
    },
    {
      tag: InputGroup,
      label: "ارزش افزوده",
      value: "vat",
      props: {
        type: "number",
        dir: "ltr",
      },
    },
    // {
    //   tag: InputGroup,
    //   label: "مرجوعی",
    //   value: "",
    //   type: "",
    // },
    {
      tag: InputGroup,
      label: "توضیحات",
      value: "description",
      props: {
        type: "text",
      },
    },
    // {
    //   tag: InputGroup,
    //   label: "مبلغ قابل پرداخت",
    //   value: "",
    //   props: {
    //     type: "number",
    //   },
    // },
  ];
  // دریافت کردن همه شرکت‌ها و اشخاص
  const getAllPersons = async () => {
    const url = `customers/${userId}/enterprise`;
    await axios.get(url).then(({ data }) => {
      setPersons(data.data);
    });
  };
  // دریافت کردن همه کالا های موجود
  const getAllMerchandise = async () => {
    const url = `customers/${userId}/merchandise`;
    await axios.get(url).then(({ data }) => {
      setMerchandises(data.data);
    });
  };
  useEffect(() => {
    getAllPersons().then(() => {
      getAllMerchandise();
    });
  }, []);

  const renderCustomInput = ({ ref }) => (
    <div>
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">
            تاریخ فاکتور
          </span>
        </div>
        <input
          readOnly
          ref={ref} // necessary
          placeholder="I'm a custom input"
          value={
            selectedDayRange
              ? `${selectedDayRange.day} / ${selectedDayRange.month} / ${selectedDayRange.year}`
              : ""
          }
          type="text"
          className="form-control bg-white text-center"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>
    </div>
  );

  return (
    <div className="RegistrationOfPurchaseAndSettlement">
      <header className="header mx-0 mb-4 flex-column">
        <Row className="mx-auto p-0 flex-column flex-md-row">
          <Col
            xs="12"
            className="d-flex align-items-center justify-content-start my-1"
          >
            <label>ثبت خرید و تسویه</label>
          </Col>
          <Col
            xs="12"
            md="6"
            className="d-flex align-items-center justify-content-start my-1"
          >
            <Button className="ms-2" variant="info">
              ویرایش
            </Button>
            <Button className="ms-2" variant="danger">
              حذف
            </Button>
            <Button className="ms-2" variant="primary">
              جستجو
            </Button>
          </Col>
          <Col
            xs="12"
            md="6"
            className="d-flex align-items-center justify-content-md-end my-1"
          >
            <Button className="ms-2" variant="info">
              عکس‌های ثبت شده
            </Button>
            <Button className="ms-2" variant="info">
              عکس‌های ارسال شده
            </Button>
          </Col>
        </Row>
      </header>
      <main className="row" className="  d-md-flex flex-sm-row-reverse ">
        <Col xs="12" md="5">
          <Slider />
        </Col>
        <Col xs="12" md="7">
          <Form className="row mx-auto">
            <DatePicker
              locale="fa"
              value={selectedDayRange}
              onChange={setSelectedDayRange}
              shouldHighlightWeekends
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              renderInput={renderCustomInput}
            />
            {formControls.map((item, index) => (
              <Col key={index} xs="12" className="my-2">
                {React.createElement(item.tag, {
                  label: item.label,
                  value: body[item.value],
                  setValue: (value) => {
                    const newBody = { ...body };
                    newBody[item.value] = value;
                    setBody(newBody);
                  },
                  ...item.props,
                })}
              </Col>
            ))}
          </Form>
          <div>
            <Fieldset title="نحوه تسویه" />
            <Tabs
              defaultActiveKey="check"
              className="justify-content-center mb-3"
            >
              <Tab eventKey="cash" title="نقد">
                cash
              </Tab>
              <Tab eventKey="credit" title="نسیه">
                credit
              </Tab>
              <Tab eventKey="card-reader" title="کارتخوان">
                card-reader
              </Tab>
              <Tab eventKey="check" title="چک">
                <Check />
              </Tab>
            </Tabs>
            <Button variant="success" className="my-3 w-25 mx-auto d-block">
              ثبت و سند
            </Button>
          </div>
        </Col>
      </main>
    </div>
  );
}
