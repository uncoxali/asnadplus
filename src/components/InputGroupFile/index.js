import BInputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "./style.css";

export default function InputGroupFile({
  label = "",
  value = "",
  setValue = () => {},
  ...otherProps
}) {
  let input = null;
  const [file, setFile] = useState(value);

  return (
    <BInputGroup dir="ltr">
      {/* <FormControl readOnly defaultValue={fileName} />
      <Button variant="primary" onClick={() => input.click()}>
        انتخاب فایل
      </Button> */}
      <input
        className="form-control input"
        ref={(element) => (input = element)}
        type="file"
        placeholder="test"
        onChange={({ target }) => {
          const file = target.files[0];
          setFile(file);
          setValue(file);
        }}
        {...otherProps}
      />
      <BInputGroup.Append>
        <BInputGroup.Text>{label}</BInputGroup.Text>
      </BInputGroup.Append>
    </BInputGroup>
  );
}
