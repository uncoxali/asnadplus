import {
  Button,
  Col,
  Form,
  Row,
  Tabs,
  Tab,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Check from "./components/Check";
import formControls from "./_formControls";
import Fieldset from '../../../../../components/Fieldset'
import "./index.scss";
export default function RegistrationOfSalesAndSettlement() {
  return (
    <div className="RegistrationOfSalesAndSettlement">
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
      <main>
        <Form className="row mx-auto">
          {formControls.map((item, index) => (
            <Col key={index} xs="12" sm="10" md="6" lg="4" className="my-2">
              <InputGroup dir="ltr">
                <FormControl />
                <InputGroup.Append>
                  <InputGroup.Text>{item.label}</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
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
      </main>
    </div>
  );
}
