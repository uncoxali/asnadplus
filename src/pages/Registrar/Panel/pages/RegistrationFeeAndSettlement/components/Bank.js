import { Col, FormControl, InputGroup, Row } from "react-bootstrap";

const formControls = [
  {
    label: "نام بانک",
    type: "",
    value: "",
  },
  {
    label: "مبلغ",
    type: "",
    value: "",
  },
  {
    label: "توضیحات",
    type: "",
    value: "",
  },
];
export default function Bank() {
  return (
    <Row className="Bank">
      {formControls.map((item, index) => (
        <Col xs="12" md={index===2?'12':'6'} className="my-1" key={index}>
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
