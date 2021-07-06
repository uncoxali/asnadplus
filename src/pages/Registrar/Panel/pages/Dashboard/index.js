import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Button } from "react-bootstrap";
import InputGroupFile from "../../../../../components/InputGroupFile";
import InputGroupDropdown from "../../../../../components/InputGroupDropdown";
import attachmentTypes from "../../../../../global/attachmentTypes";
import axios from "../../../../../boot/axios";
import "./index.scss";

export default function Dashboard() {
  const userId = useSelector((state) => state.city_class_member.member.id);
  const [data, setData] = useState({
    type: "",
    customer_id: userId,
    "attachments[]": "",
  });
  const formControls = [
    {
      tag: InputGroupDropdown,
      label: "نوع سند",
      value: "type",
      props: {
        items: attachmentTypes,
      },
    },
    {
      tag: InputGroupFile,
      label: "فایل",
      value: "attachments[]",
      props: {},
    },
  ];
  const submit = () => {
    const conditions = data.type.length > 0 && data["attachments[]"] !== "";
    if (conditions) {
      const url = "client/pooldoc";
      const body = new FormData();
      Object.keys(data).forEach((item) => {
        body.append(item, data[item]);
      });
      axios.post(url, body).then(({ data }) => {
        console.log(data);
      });
    }
  };
  return (
    <div className="Dashboard">
      <header>
        <label>ارسال سند به صورت آزمایشی</label>
      </header>
      <main>
        <Row>
          {formControls.map((item, index) => (
            <Col xs="12" md="6" className="my-1" key={index}>
              {React.createElement(item.tag, {
                label: item.label,
                value: item.value,
                setValue: (value) => {
                  const newData = { ...data };
                  newData[item.value] = value;
                  setData(newData);
                },
                ...item.props,
              })}
            </Col>
          ))}
          <Button onClick={submit} type="submit" variant="success">
            ثبت
          </Button>
        </Row>
      </main>
    </div>
  );
}
