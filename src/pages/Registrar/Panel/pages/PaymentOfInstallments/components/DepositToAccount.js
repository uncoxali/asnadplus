import { Col, FormControl, InputGroup, Row } from "react-bootstrap";

const formControls = [
  {
    label: "نام بانک",
    value: "",
    type: "",
  },
  {
    label: "تاریخ",
    value: "",
    type: "",
  },
  {
    label: "مبلغ",
    value: "",
    type: "",
  },
  {
    label: "توضیحات",
    value: "",
    type: "",
  },
];
export default function DepositToAccount() {
  return (
    <Row className="DepositToAccount">
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
    </Row>
  );
}
