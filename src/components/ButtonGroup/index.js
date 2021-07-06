import BButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
export default function ButtonGroup({
  size = "md",
  buttons = [],
  className = "",
}) {
  return (
    <BButtonGroup dir="ltr" size={size} className={className}>
      {buttons.map((item, index) => (
        <Button key={index} variant={item.variant} onClick={item.onClick}>
          {item.label}
        </Button>
      ))}
    </BButtonGroup>
  );
}
