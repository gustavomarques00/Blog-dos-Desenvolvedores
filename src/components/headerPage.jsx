import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const headerPage = (props) => {
  return (
    <div className="d-flex bg-info justify-content-center">
      <h3 className="my-5">{props.titulo}</h3>
    </div>
  );
};

export default headerPage;
