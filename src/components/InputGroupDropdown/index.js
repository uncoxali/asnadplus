import { useEffect, useState } from "react";
import { FormControl, InputGroup, Dropdown } from "react-bootstrap";

export default function InputGroupDropdown({
  label = "",
  value = "",
  setValue = () => {},
  items = [],
  itemLabel = "name",
  itemValue = "id",
  disabled = false,
}) {
  const [filter, setFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showValue, setShowValue] = useState("انتخاب");
  const showItems = () => {
    return items.filter((e) => e[itemLabel].search(filter) !== -1);
  };
  const handleSelect = (key) => {
    const item = items.find((e) => String(e[itemValue]) === String(key));
    if (item !== undefined) {
      setShowValue(item[itemLabel]);
      setFilter(item[itemLabel]);
      setValue(item[itemValue]);
    }
    setShowDropdown(false);
  };
  const handleShowDropdown = () => {
    if (filter.length > 0) {
      setFilter("");
      setShowDropdown(true);
    } else {
      setShowDropdown(!showDropdown);
    }
  };
  const handleChange = ({ target }) => {
    setShowDropdown(true);
    setFilter(target.value);
  };
  useEffect(() => {
    const condition =
      value !== null && value !== undefined && String(value).length > 0;
    if (condition) {
      handleSelect(value);
    } else if (value === "") {
      setFilter("");
      setShowValue("انتخاب");
    }
  }, [value]);
  return (
    <InputGroup dir="ltr">
      <InputGroup.Prepend>
        <Dropdown show={showDropdown} onSelect={handleSelect}>
          <Dropdown.Toggle disabled={disabled} onClick={handleShowDropdown}>
            {showValue}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {showItems().map((item, index) => (
              <Dropdown.Item key={index} eventKey={item[itemValue]}>
                {item[itemLabel]}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </InputGroup.Prepend>
      <FormControl
        className="text-end"
        value={filter}
        dir="rtl"
        onChange={handleChange}
        disabled={disabled}
      />
      <InputGroup.Append>
        <InputGroup.Text>{label}</InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );
}
