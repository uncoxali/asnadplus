import axios from "../../../../../boot/axios";
import React, { useEffect, useState } from "react";
import { Modal, Col, Row } from "react-bootstrap";
import InputGroup from "../../../../../components/InputGroup";
import filterItem from "../../../../../global/filter";

export default function SelectClass({
  city = null,
  show = true,
  setClass = () => {},
}) {
  const [classes, setClasses] = useState([]);
  const [filter, setFilter] = useState("");
  const getClasses = (id) => {
    const body = {
      asnaf_id: id,
    };
    axios.post("employee/asnaf/get_etehadey", body).then(({ data }) => {
      setClasses(data.data);
    });
  };
  useEffect(() => {
    if (show && city !== null) {
      getClasses(city.id);
    }
  }, [show, city]);
  return (
    <>
      {show ? (
        <React.Fragment>
          <Modal.Body>
            <InputGroup
              value={filter}
              setValue={(value) => setFilter(value)}
              label=":نام صنف"
            />
          </Modal.Body>
          <Modal.Footer>
            <Row className="w-100 items">
              {filterItem({ value: filter, items: classes }).map(
                (item, index) => (
                  <Col
                    xs="6"
                    className="item"
                    key={index}
                    onClick={() => setClass(item)}
                  >
                    {item.name}
                    <span>{item.count}</span>
                  </Col>
                )
              )}
            </Row>
          </Modal.Footer>
        </React.Fragment>
      ) : null}
    </>
  );
}
