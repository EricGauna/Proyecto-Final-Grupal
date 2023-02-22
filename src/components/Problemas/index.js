import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getProblemas } from '../../services/Problemas';
import "./index.css"

export const Problemas = () => {
    const [problemas, setProblemas] = useState([])
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
    const showDetail = (id) => {
        console.info(id)
        navigate(`/problemas/${id}`)
    }

  




    return (

    
    
        <div className="App container">
            <header>
                
            </header>

            <div className="cont s--inactive">
                <div className="cont__inner">
                    {problemas.map((problema, index) => (
                        
                        <div className="el" key={index} onClick={handleElClick}>
                            <div className="el__overflow">
                                <div className="el__inner">
                                    <div className="el__bg"></div>
                                    <div className="el__preview-cont">
                                        <h2 className="el__heading">{problema.title}</h2>
                                    </div>
                                    <div className="el__content">
                                        <div className="el__text">{problema.description}</div>
                                        <div className="el__text">{problema.id}</div>
                                        <div className="el__close-btn" onClick={handleCloseClick} />
                                        <div className="el__go-detail" onClick={() => showDetail(problema.id)}/>
                                    </div>
                                </div>
                            </div>
                        </div>))}
                </div>
            </div>
            </div>
        
    );
}


