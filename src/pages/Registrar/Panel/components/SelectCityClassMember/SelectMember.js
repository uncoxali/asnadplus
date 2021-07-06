import axios from "../../../../../boot/axios";
import React, { useEffect, useState } from "react";
import { Modal, Col, Row } from "react-bootstrap";
import InputGroup from "../../../../../components/InputGroup";
import filterItem from "../../../../../global/filter";

export default function SelectMember({
  classN = null,
  show = true,
  setMember = () => {},
}) {
  const [members, setMembers] = useState([]);
  const [filter, setFilter] = useState("");
  const getMembers = (id) => {
    const body = {
      etehady_id: id,
    };
    axios.post("employee/asnaf/get_members", body).then(({ data }) => {
      setMembers(data.data);
    });
  };
  useEffect(() => {
    if (show && classN !== null) {
      getMembers(classN.id);
    }
  }, [show, classN]);
  return (
    <>
      {show ? (
        <React.Fragment>
          <Modal.Body>
            <InputGroup
              value={filter}
              setValue={(value) => setFilter(value)}
              label=":نام فرد"
            />
          </Modal.Body>
          <Modal.Footer>
            <Row className="w-100 items">
              {filterItem({ value: filter, items: members }).map(
                (item, index) => (
                  <Col
                    xs="6"
                    className="item"
                    key={index}
                    onClick={() => setMember(item)}
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
