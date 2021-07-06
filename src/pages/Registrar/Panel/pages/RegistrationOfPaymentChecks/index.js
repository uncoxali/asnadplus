import {
  Button,
  Col,
  Form,
  Row,
  InputGroup,
  FormControl,
  Table,
} from "react-bootstrap";
import formControls from "./_formControls";
import "./index.scss";
export default function RegistrationOfPaymentChecks() {
  return (
    <div className="RegistrationOfPaymentChecks">
      <header className="header mx-0 mb-4 flex-column">
        <Row className="mx-auto p-0 flex-column flex-md-row">
          <Col
            xs="12"
            className="d-flex align-items-center justify-content-start my-1"
          >
            <label>ثبت چک‌های پرداختی</label>
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
            <Button className="ms-2" variant="success">
              پاس چک
            </Button>
            <Button className="ms-2" variant="outline-danger">
              برگشت چک
            </Button>
            <Button className="ms-2" variant="outline-danger">
              ابطال چک
            </Button>
          </Col>
          <Col
            xs="12"
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
        <Form className="mx-auto">
          <Row>
            {formControls.map((item, index) => (
              <Col
                key={index}
                xs="12"
                md={index === 6 ? "12" : "6"}
                lg={index === 6 ? "12" : "4"}
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
          <Button variant="success" className="d-block mx-auto my-3 px-4">
            ثبت
          </Button>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>نام بانک</td>
              <td>شماره چک</td>
              <td>در وجه</td>
              <td>مبلغ</td>
              <td>تاریخ صدور</td>
              <td>تاریخ سررسید</td>
              <td>تاریخ پاس/برگشت/ابطال</td>
              <td>توضیحات</td>
              <td>وضعیت</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ملی مدرس 123456</td>
              <td>12850</td>
              <td>بخش البرز</td>
              <td>145،020،000</td>
              <td>99/23/03</td>
              <td>99/05/25</td>
              <td>99/05/25</td>
              <td>توضیح</td>
              <td>پاس شده</td>
            </tr>
            <tr>
              <td>ملی مدرس 123456</td>
              <td>12850</td>
              <td>بخش البرز</td>
              <td>145،020،000</td>
              <td>99/23/03</td>
              <td>99/05/25</td>
              <td>99/05/25</td>
              <td>توضیح</td>
              <td>پاس شده</td>
            </tr>
          </tbody>
        </Table>
      </main>
    </div>
  );
}
