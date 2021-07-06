import React, { useState } from "react";
import BInputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { notification } from "../../global/functions";

export default function InputGroupSelectProduct({
  label = "",
  value = [],
  setValue = () => {},
  items = [],
  itemLabel = "name",
  itemValue = "id",
  disabled = false,
}) {
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState(null);
  const [countNewProduct, setCountNewProduct] = useState(1);
  const [activeProducts, setActiveProducts] = useState([]);
  const newProductLabel =
    newProduct === null ? "انتخاب" : newProduct[itemLabel];
  const addNewProduct = () => {
    if (newProduct !== null) {
      const product = { ...newProduct, count: countNewProduct };
      setActiveProducts([...activeProducts, product]);
      setNewProduct(null);
      setCountNewProduct(1);
    } else {
      notification({ text: "لطفا کالای مورد نظر را انتخاب کنید." });
    }
  };
  const deleteItem = (index = 0) => {
    const products = [...activeProducts];
    products.splice(index, 1);
    setActiveProducts(products);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  const submit = () => {
    setValue(activeProducts);
    setShowModal(false);
  };
  const showActiveItem = Array.isArray(value) && value.length > 0;
  console.log(value);
  return (
    <React.Fragment>
      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header className="justify-content-center">
          انتخاب کالا
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column">
            <ListGroup className="text-end mb-3">
              {activeProducts.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col xs="2">
                      <Button
                        onClick={() => deleteItem(index)}
                        size="sm"
                        variant="danger"
                      >
                        حذف
                      </Button>
                    </Col>
                    <Col>تعداد: {item["count"]}</Col>
                    <Col>نام: {item[itemLabel]}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <BInputGroup dir="ltr">
              <BInputGroup.Append>
                <Button variant="success" onClick={addNewProduct}>
                  افزودن
                </Button>
              </BInputGroup.Append>
              <FormControl
                value={countNewProduct}
                onChange={({ target }) => {
                  const value = Number(target.value);
                  if (value >= 1) {
                    setCountNewProduct(value);
                  } else {
                    setCountNewProduct(1);
                  }
                }}
                type="number"
              />
              <BInputGroup.Text>:تعداد</BInputGroup.Text>
              <Dropdown
                onSelect={(id) => {
                  const product = items.find(
                    (e) => String(e[itemValue]) === String(id)
                  );
                  setNewProduct(product);
                }}
              >
                <Dropdown.Toggle>{newProductLabel}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {items.map((item, index) => (
                    <Dropdown.Item eventKey={item[itemValue]} key={index}>
                      {item[itemLabel]}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <BInputGroup.Text>:کالا</BInputGroup.Text>
            </BInputGroup>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="danger" onClick={hideModal}>
            لغو
          </Button>
          <Button variant="success" onClick={submit}>
            تایید
          </Button>
        </Modal.Footer>
      </Modal>
      <BInputGroup dir="ltr">
        <BInputGroup.Prepend>
          <Button
            className="h-100"
            variant="primary"
            disabled={disabled}
            onClick={() => setShowModal(true)}
          >
            انتخاب
          </Button>
        </BInputGroup.Prepend>
        <div className="form-control row text-end">
          {showActiveItem ? (
            <React.Fragment>
              {value.map((item, index) => (
                <span
                  key={index}
                  style={{ width: "fit-content" }}
                  className="d-inline-flex rounded bg-secondary text-white text-end px-1 py-2 h6 mx-1 my-0"
                >
                  {item[itemLabel]}
                </span>
              ))}
            </React.Fragment>
          ) : null}
        </div>
        <BInputGroup.Append>
          <BInputGroup.Text className="h-100">{label}</BInputGroup.Text>
        </BInputGroup.Append>
      </BInputGroup>
    </React.Fragment>
  );
}
