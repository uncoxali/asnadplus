import { Col, FormControl, InputGroup, Row } from "react-bootstrap";

const formControls = [
  {
    label: "نام بانک",
    type: "",
    value: "",
  },
  {
    label: "شماره چک",
    type: "",
    value: "",
  },
  {
    label: "در وجه",
    type: "",
    value: "",
  },
  {
    label: "مبلغ",
    type: "",
    value: "",
  },
  {
    label: "تاریخ صدور",
    type: "",
    value: "",
  },
  {
    label: "تاریخ سررسید",
    type: "",
    value: "",
  },
];
export default function Check() {
  return (
    <Row className="Check">
      {formControls.map((item, index) => (
        <Col xs="12" md="6" className="my-1" key={index}>
          <InputGroup dir="ltr">
            <FormControl />
            <InputGroup.Append>
              <InputGroup.Text>{item.label}</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      ))}
      <Col xs="12" md="6">
        <div className="border py-2 px-3 mt-2">مبلغ تسویه:</div>
      </Col>
      <Col xs="12" md="6">
        <div className="border py-2 px-3 mt-2">مبلغ قابل پرداخت:</div>
      </Col>
    </Row>
  );
}
