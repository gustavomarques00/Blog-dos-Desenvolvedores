import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderPage from "./components/headerPage";
import api from "./services/api";
import Axios from 'axios'
import { useState, useEffect } from "react";
import BotaoBuscarPost from "./components/botaoBuscarPost";

function App() {
  const [dados, setDados] = useState([]);
  const [base64, setBase64] = useState();


  useEffect(() => {
    api
      .get()
      .then((response) => {
        setDados(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro " + err);
      });
  }, []);

  useEffect(() => {
    Axios
      .get(
        'https://blog.apiki.com/wp-json/wp/v2/posts?_embed&categories=518',
        {
          responseType: "arraybuffer",
        }
      )
      .then((response) =>
        setBase64(Buffer.from(response.data, "binary").toString("base64"))
      );
  }, []);


  return (
    <section>
      <HeaderPage titulo="Blog dos Programadores" />

      <div className="container my-5 d-flex flex-wrap  align-items-stretch">
        <div className="g-0 justify-content-around ">
          <div className="px-2 py-3 row  ">
            {dados.map((dado, index) => {
              return (
                <div className="p-2 col-md-6 col-sm-12 col-lg-4">
                  <div
                    key={dado.id}
                    className="card"
                  >
                    <img className="card-image-top" alt="Imagem do Post"/>

                    <div className="card-body">
                      <h4 className="card-title text-center">
                        {dado.title.rendered}
                      </h4>
                    </div>
                    <div className="pt-4 d-grid card-footer">
                      <BotaoBuscarPost  />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
