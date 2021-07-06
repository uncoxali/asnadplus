import axios from "../../../../../boot/axios";
import React, { useEffect, useState } from "react";
import { Modal, Col, Row, Badge } from "react-bootstrap";
import InputGroup from "../../../../../components/InputGroup";
import filterItem from "../../../../../global/filter";

export default function SelectCity({ show = true, setCity = () => {} }) {
  const [cities, setCities] = useState([]);
  const [filter, setFilter] = useState("");
  const getCities = () => {
    axios.post("employee/asnaf/get_asnafs").then(({ data }) => {
      setCities(data.data);
    });
  };
  useEffect(() => {
    if (show) {
      getCities();
    }
  }, [show]);
  return (
    <>
      {show ? (
        <React.Fragment>
          <Modal.Body>
            <InputGroup
              value={filter}
              setValue={(value) => setFilter(value)}
              label=":نام شهر"
            />
          </Modal.Body>
          <Modal.Footer>
            <Row className="w-100 items">
              {filterItem({ value: filter, items: cities }).map(
                (item, index) => (
                  <Col
                    xs="6"
                    className="item"
                    key={index}
                    onClick={() => setCity(item)}
                  >
                    {item.name}
                    <span variant="danger">{item.count}1</span>
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
