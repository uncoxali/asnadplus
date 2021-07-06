import { Spinner } from "react-bootstrap";
import "./index.scss";
export default function Loading() {
  return (
    <div className="Loading d-flex justify-content-center align-items-center">
      <Spinner variant='primary' animation="border" />
    </div>
  );
}
