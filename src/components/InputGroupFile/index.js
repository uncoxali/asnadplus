import BInputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useState } from "react";
import { Button } from "react-bootstrap";
export default function InputGroupFile({
  label = "",
  value = "",
  setValue = () => {},
  ...otherProps
}) {
  let input = null;
  const [file, setFile] = useState(value);
  const fileName = file === "" ? "" : file.name;
  return (
    <BInputGroup dir="ltr">
      <BInputGroup.Prepend>
        <Button variant="primary" onClick={() => input.click()}>
          انتخاب فایل
        </Button>
      </BInputGroup.Prepend>
      <FormControl readOnly defaultValue={fileName} />
      <input
        ref={(element) => (input = element)}
        type="file"
        onChange={({ target }) => {
          const file = target.files[0];
          setFile(file);
          setValue(file);
        }}
        style={{ display: "none" }}
        {...otherProps}
      />
      <BInputGroup.Append>
        <BInputGroup.Text>{label}</BInputGroup.Text>
      </BInputGroup.Append>
    </BInputGroup>
  );
}
