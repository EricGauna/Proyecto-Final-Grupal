import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editProblemasById, getImages } from "../services/Problemas";
import "./editProblemas.css";

export const EditProblema = () => {
    const { problemasid: id } = useParams();
    const [problema, setProblema] = useState({});
    const [imagenes, setImagenes] = useState([]);
    const [imagenActual, setImagenActual] = useState("");

    useEffect(() => {
        const loadData = async () => {
            const { data } = await editProblemasById(id);
            console.log(data);
            setProblema(data);

            const imagesData = await getImages();
            const filteredImages = imagesData.filter((image) =>
                data.images.find((img) => img.images === image.filename)
            );
            setImagenes(filteredImages);
            setImagenActual(filteredImages[0]?.url || "");
        };
        loadData();
    }, [id]);

    const handleClick = (url) => {
        setImagenActual(url);
    };

    return (
        <div>
            {!problema && <span>No hemos encontrado el problema seleccionado</span>}
            {problema && (
                <span className="recuadro" >
                    <div className="texto">
                        <h2 className="titulo">Detalles de {problema.title}</h2>
                        <p className="descripcion">{problema.description}</p>
                        <p className="lugar">
                            {problema.barrio}, {problema.ciudad}
                        </p>
                        <p className="likes">{problema.likes}</p>
                    </div>
                    <div className="contenedor-imagenes">
                    <h3>Imágenes:</h3>
                        <img
                            className="imagen-actual"
                            src={`http://localhost:8080${imagenActual}`}
                            alt=""
                        />
                        <div className="navegacion-imagenes">
                            {imagenes.map((image) => (
                                <img
                                    key={image.filename}
                                    src={`http://localhost:8080${image.url}`}
                                    alt={image.filename}
                                    className={`miniatura-imagen ${imagenActual === image.url && "seleccionado"
                                        }`}
                                    onClick={() => handleClick(image.url)}
                                />
                            ))}
                        </div>
                    </div>
                </span>)}
        </div>)
}



