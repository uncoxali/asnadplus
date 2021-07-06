import React from "react";
import { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
export default function InputGroupDate({
  label = "",
  value = "",
  setValue = "",
}) {
  const [year, setYear] = useState("1400");
  const [month, setMonth] = useState("01");
  const [day, setDay] = useState("01");
  const inputs = [
    {
      label: "سال",
      value: year,
      onChange: setYear,
      max: 4,
    },
    {
      label: "ماه",
      value: month,
      onChange: setMonth,
      max: 2,
    },
    {
      label: "روز",
      value: day,
      onChange: setDay,
      max: 2,
    },
  ];
  return (
    <InputGroup dir="ltr">
      {inputs.map((item, index) => (
        <React.Fragment key={index}>
          <FormControl
            type="number"
            value={item.value}
            placeholder={item.label}
            className="text-center"
            onChange={({ target }) => {
              const val = target.value;
              if (val.length <= item.max) {
                item.onChange(val);
              }
            }}
          />
          {index !== 2 ? (
            <InputGroup.Append>
              <InputGroup.Text>{"/"}</InputGroup.Text>
            </InputGroup.Append>
          ) : null}
        </React.Fragment>
      ))}
      <InputGroup.Append>
        <InputGroup.Text>{label}</InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );
}
