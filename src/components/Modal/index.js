import Button from "react-bootstrap/Button";
import BModal from "react-bootstrap/Modal";
export default function Modal({
  show = true,
  onHide = () => {},
  title = "",
  bodyText = "",
  type = "dark",
  buttons = [],
}) {
  return (
    <BModal show={show} onHide={onHide} className="text-center">
      <BModal.Header>
        <BModal.Title className='mx-auto'>
          <span
            dir="rtl"
            className={`d-block text-center mx-auto h2 text-${type}`}
          >
            {title}
          </span>
        </BModal.Title>
      </BModal.Header>
      <BModal.Body>
        <p dir="rtl" className="text-dark d-block text-center mx-auto h5">
          {bodyText}
        </p>
      </BModal.Body>
      <BModal.Footer className="justify-content-center">
        {buttons.map((item, index) => (
          <Button key={index} variant={item.variant} onClick={item.onClick}>
            {item.label}
          </Button>
        ))}
      </BModal.Footer>
    </BModal>
  );
}
