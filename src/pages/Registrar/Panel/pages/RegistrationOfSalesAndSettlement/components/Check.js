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
    label: "شماره حساب",
    type: "",
    value: "",
  },
  {
    label: "واگذار کننده",
    type: "",
    value: "",
  },
  {
    label: "مبلغ",
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
      <Col xs="12">
        <p className="text-center my-3">بابت فروش به آقای فرهادی</p>
      </Col>
    </Row>
  );
}
