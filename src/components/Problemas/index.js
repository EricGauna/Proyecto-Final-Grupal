import React, { useEffect, useState } from 'react';
import { useQuery } from '../../hooks/useQuery';
import { useNavigate } from 'react-router';
import { getProblemas } from '../../services/Problemas';
import { Buscador } from '../Buscador';
import { createSearchParams } from "react-router-dom"
import "./index.css"

export const Problemas = () => {
    const [problemas, setProblemas] = useState([])
    const query = useQuery();
    const [filter, setFilter] = useState((query.get("search") || "").toLocaleLowerCase())
    const navigate = useNavigate()

    const [activeEl, setActiveEl] = useState(null);

    useEffect(() => {
        const cont = document.querySelector(".cont");
        cont.classList.remove("s--inactive");
    }, []);

    const handleElClick = (event) => {
        const target = event.currentTarget;
        if (target.classList.contains("s--active")) return;
        const cont = document.querySelector(".cont");
        cont.classList.add("s--el-active");
        target.classList.add("s--active");
        setActiveEl(target);
    };

    const handleCloseClick = (event) => {
        event.stopPropagation();
        const cont = document.querySelector(".cont");
        cont.classList.remove("s--el-active");
        activeEl.classList.remove("s--active");
        setActiveEl(null);
    };

    const getData = async () => {
        const { data } = await getProblemas()
        console.log(data);
        setProblemas(data)
    }

    useEffect(() => {
        getData()
    }, [])
    const showDetail = ({ id }) => {
        console.info(id)
        navigate(`/problemas/${id}`)
    }


    const [isActive, setIsActive] = useState(false);

    

    return (
        <div className="App container">
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center mb-4 border-bottom">
                    <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                        <span className="fs-4">Bienvenido a mi ciudad</span>
                    </a>
                </div>
            </header>
            <Buscador initialValue={filter} onSearch={({ value }) => navigate({ pathname: "/", search: createSearchParams({ search: value }).toString() })}></Buscador>
            <div className="cont s--inactive">
                <div className="cont__inner">
                    {problemas.map((problema, index) => (
                        <div className="el" onClick={handleElClick}>
                            <div className="el__overflow">
                                <div className="el__inner">
                                    <div className="el__bg"></div>
                                    <div className="el__preview-cont">
                                        <h2 className="el__heading">{problema.title}</h2>
                                    </div>
                                    <div className="el__content">
                                        <div className="el__text">{problema.description}</div>
                                        <div className="el__close-btn" onClick={handleCloseClick} />
                                    </div>
                                </div>
                            </div>
                        </div>))}
                </div>
            </div>
            </div>
    );
}



