import React from "react";
import BTable from "react-bootstrap/Table";
export default function Table({ show = true, children }) {
  return (
    <React.Fragment>
      {show ? (
        <BTable striped bordered hover>
          {children}
        </BTable>
      ) : null}
    </React.Fragment>
  );
}
