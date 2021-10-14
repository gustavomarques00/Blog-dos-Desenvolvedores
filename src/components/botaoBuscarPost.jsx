import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const saberMais = (index) => {
  console.log("o index é " + index);
};

const botaoBuscarPost = (props) => {
  return (
    <>
      <button onClick={saberMais(props.index)} className="btn btn-primary btn-block">
        Saiba Mais
      </button>
    </>
  );
};

export default botaoBuscarPost;
