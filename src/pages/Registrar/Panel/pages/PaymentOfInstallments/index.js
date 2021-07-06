import {
  Button,
  Col,
  Form,
  Row,
  Tabs,
  Tab,
  InputGroup,
  FormControl,
  Table,
} from "react-bootstrap";
import formControls from "./_formControls";
import Fieldset from "../../../../../components/Fieldset";
import "./index.scss";
import DepositToAccount from "./components/DepositToAccount";
export default function PaymentOfInstallments() {
  return (
    <div className="PaymentOfInstallments">
      <header className="header mx-0 mb-4 flex-column">
        <Row className="mx-auto p-0 flex-column flex-md-row">
          <Col
            xs="12"
            className="d-flex align-items-center justify-content-start my-1"
          >
            <label>پرداخت اقساط</label>
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
            <Button variant="info">صداهای ارسال شده</Button>
          </Col>
        </Row>
      </header>
      <main>
        <Form className="row mx-auto">
          {formControls.map((item, index) => (
            <Col key={index} xs="12" md="6" className="my-2">
              <InputGroup dir="ltr">
                <FormControl />
                <InputGroup.Append>
                  <InputGroup.Text>{item.label}</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          ))}
          <div>
            <Fieldset title="نحوه تسویه" />
            <Tabs
              defaultActiveKey="deposit-to-account"
              className="justify-content-center mb-3"
            >
              <Tab eventKey="cash" title="نقد">
                نقد
              </Tab>
              <Tab eventKey="credit" title="کارتخوان">
                بانکI
              </Tab>
              <Tab eventKey="deposit-to-account" title="واریز به حساب">
                <DepositToAccount />
              </Tab>
              <Tab eventKey="check" title="چک">
                خرج چک مشتری
              </Tab>
            </Tabs>
            <Button variant="success" className="my-3 mx-auto px-4 d-block">
              ثبت و سند
            </Button>
          </div>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>تاریخ پرداخت اقساط</th>
              <th>مبلغ پرداخت اقساط</th>
              <th>مانده حساب</th>
              <th>نحوه پرداخت</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>مانده حساب از قبل</td>
              <td>-</td>
              <td>102،000،000</td>
              <td>-</td>
            </tr>
            <tr>
              <td>99/05/25</td>
              <td>12,000,000</td>
              <td>90,000,000</td>
              <td>واریز به ملت</td>
            </tr>
          </tbody>
        </Table>
      </main>
    </div>
  );
}
