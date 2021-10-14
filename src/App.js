import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderPage from "./components/headerPage";
import api from "./services/api";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [dados, setDados] = useState([]);
  const [cabecalho, setCabecalho] = useState([])

  const maisInformacoes = async (pagina) => {
    await Axios
    .get("https://blog.apiki.com/wp-json/wp/v2/posts?_embed&categories=518", {params: {page: pagina}})
    .then((response) => {
      setDados(response.data)
      console.log(dados)
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro " + err);
    });
  }
  
  useEffect(() => {
    api
      .get()
      .then((response) => {
        setDados(response.data);
        setCabecalho(response.headers)
        console.log(response.data)
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro " + err);
      });
  }, []);

  return (
    <section>
      <HeaderPage titulo="Blog dos Programadores" />

      <div className="container my-5 d-flex flex-wrap">
        <div className="g-0 justify-content-around ">
          <div className="px-2 py-3 row  ">
            {dados.map((dado, index) => {
              return (
                <div key={index} className="p-2 col-md-6 col-sm-12 col-lg-4">
                  <div  className="card">
                    <img
                      className="card-image-top"
                      src={
                        dado._embedded["wp:featuredmedia"][0].media_details
                          .sizes.medium_large.source_url
                      }
                      alt="Imagem do Post"
                    />

                    <div className="card-body">
                      <h4 className="card-title text-center">
                        {dado.title.rendered}
                      </h4>
                    </div>
                    <div className="pt-4 d-grid card-footer">
                      <a className="btn btn-primary" role="button" href={dado.link}>
                        Clique aqui
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="py-5 d-flex justify-content-center">
              <button onClick={() => maisInformacoes(2)} className="btn btn-info" type="submit">
                Carregar Mais
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
