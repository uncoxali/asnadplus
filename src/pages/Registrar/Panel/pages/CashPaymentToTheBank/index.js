import {
  Col,
  Row,
  Button,
  Form,
  InputGroup,
  FormControl,
  Table,
} from "react-bootstrap";
import "./index.scss";
import formControls from "./_formControls";

export default function CashPaymentToTheBank() {
  return (
    <div className="CashPaymentToTheBank">
      <header className="header mx-0 mb-4 flex-column">
        <Row className="mx-auto p-0 flex-column flex-md-row">
          <Col
            xs="12"
            className="d-flex align-items-center justify-content-start my-1"
          >
            <label>پرداخت نقدی به بانک</label>
          </Col>
          <Col
            xs="12"
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
        </Row>
      </header>
      <main>
        <Form className="mx-auto">
          <Row className="mx-auto">
            {formControls.map((item, index) => (
              <Col
                key={index}
                xs="12"
                md={index === 4 ? "12" : "6"}
                className="my-2"
              >
                <InputGroup dir="ltr">
                  <FormControl />
                  <InputGroup.Append>
                    <InputGroup.Text>{item.label}</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            ))}
          </Row>
          <Button variant="success" className="mx-auto my-3 px-4 d-block">
            ثبت و سند
          </Button>
          <Button variant="success" className="mx-auto my-3 px-4 d-block">
            واریز به بانک
          </Button>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>تاریخ</th>
              <th>نام بانک</th>
              <th>مبلغ</th>
              <th>پرداخت کننده</th>
              <th>توضیحات</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>99/03/12</td>
              <td>ملت شهدا</td>
              <td>20,000,000</td>
              <td>رضوی</td>
              <td>-</td>
            </tr>
            <tr>
              <td>99/03/12</td>
              <td>ملت شهدا</td>
              <td>20,000,000</td>
              <td>رضوی</td>
              <td>-</td>
            </tr>
          </tbody>
        </Table>
      </main>
    </div>
  );
}
