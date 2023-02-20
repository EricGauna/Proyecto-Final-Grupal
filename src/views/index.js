import React, { useEffect, useState } from "react";
import './index.css'

export const Problemas = () => {
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

    return (
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
    )
}





