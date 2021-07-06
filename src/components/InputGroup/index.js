import BInputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
export default function InputGroup({
  label = "",
  value = "",
  setValue = () => {},
  type = "text",
  dir='rtl',
  disabled = false,
}) {
  return (
    <BInputGroup dir="ltr">
      <FormControl
        value={value}
        onChange={({ target }) => setValue(target.value)}
        dir={dir}
        className={type === "text" ? "text-end" : "text-start"}
        type={type}
        disabled={disabled}
      />
      <BInputGroup.Append>
        <BInputGroup.Text>{label}</BInputGroup.Text>
      </BInputGroup.Append>
    </BInputGroup>
  );
}
