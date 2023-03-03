import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getProblemas, searchProblemas } from "../../services/Problemas";
import { Buscador } from "../Buscador";
import { createSearchParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";

import "./index.css";

export const Problemas = () => {
  const [problemas, setProblemas] = useState([]);
  const [imagenProblema, setImagenProblema] = useState("");
  const query = useQuery();
  const [filter, setFilter] = useState((query.get("search") || "").toLocaleLowerCase());
  const navigate = useNavigate();

  const getData = async () => {
    const { data } = await getProblemas();
    console.log(data.slice(0, 5));
    setProblemas(data.slice(0, 5));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const { data } = await searchProblemas(filter);
      console.log(data.slice(0, 5));
      setProblemas(data.slice(0, 5));
    };
    getData();
  }, [filter]);

  useEffect(() => {
    const getImagenes = async () => {
      const promises = problemas.map(async (problema) => {
        if (problema.images && problema.images.length > 0) {
          const response = await fetch(`http://localhost:8080/images/${problema.images[0].images}`);
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          return url;
        }
        return "";
      });
      const urls = await Promise.all(promises);
      setImagenProblema(urls);
    };
    getImagenes();
  }, [problemas]);


  useEffect(() => {
    const cont = document.querySelector(".cont");
    cont.classList.remove("s--inactive");
  }, []);

  useEffect(() => {
    const elBgs = document.querySelectorAll(".el__bg");
    elBgs.forEach((elBg, index) => {
      if (imagenProblema[index]) {
        elBg.style.setProperty("--imagen-problema", `url('${imagenProblema[index]}')`);
      }
    });
  }, [imagenProblema]);

  const handleElClick = (event) => {
    const target = event.currentTarget;
    if (target.classList.contains("s--active")) return;
    const cont = document.querySelector(".cont");
    cont.classList.add("s--el-active");
    target.classList.add("s--active");
  };

  const handleCloseClick = (event) => {
    event.stopPropagation();
    const cont = document.querySelector(".cont");
    cont.classList.remove("s--el-active");
    const activeEl = document.querySelector(".el.s--active");
    if (activeEl) {
      activeEl.classList.remove("s--active");
    }
  };

  

  const handleSearch = ({ value, option }) => {
    const searchParams = createSearchParams({
      [option]: value,
    }).toString();
    navigate({ pathname: "/search", search: searchParams });
    setFilter(searchParams);
    console.log(searchParams);
  };

  const showDetail = (id) => {
    console.info(id);
    navigate(`/problemas/${id}`);
  };

  return (
    <div className="Appcontainer">
      <header>
        <Buscador
          className="buscador"
          initialValue={filter}
          onSearch={handleSearch}
          options={[
            { value: "Ciudad", key: "ciudad" },
            { value: "Barrio", key: "barrio" },
            { value: "Estado", key: "estado" },
            { value: "Título", key: "title" },
          ]}
        />
      </header>


      <div className="cont s--inactive">
        <div className="cont__inner">
          {problemas.map((problema, index) => (
            <div
              className="el"
              key={index}
              onClick={handleElClick}
              data-id={index}
            >
              <div className="el__overflow">
                <div
                  className="el__go-detail"
                  onClick={() => showDetail(problema.id)}
                >Ir al Detalle
                </div>
                <div className="el__inner">
                  <div className="el__bg"></div>
                  <div className="el__preview-cont">
                    <h2 className="el__heading">{problema.title}</h2>

                  </div>
                  <div className="el__content">
                    <div className="el__text">{problema.description}</div>
                    <div className="el__likes">{problema.likes}</div>
                    <div className="el__close-btn" onClick={handleCloseClick} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
