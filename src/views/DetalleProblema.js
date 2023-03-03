import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProblemaById, getImages } from "../services/Problemas";
import "./detalle.css";

export const DetalleProblema = () => {
    const { problemasid: id } = useParams();
    const [problema, setProblema] = useState({});
    const [imagenes, setImagenes] = useState([]);
    
    useEffect(() => {
        const loadData = async () => {
            const { data } = await getProblemaById(id);
            console.log(data);
            setProblema(data);

            const imagesData = await getImages();
            const filteredImages = imagesData.filter(image =>
                data.images.find(img => img.images === image.filename)
            );
            setImagenes(filteredImages);
        };
        loadData();
    }, [id]);

    return (
        <div className="Detalle">
            {!problema && <span>No hemos encontrado el problema seleccionado</span>}
            {problema && (
                <div>
                    <h2 className="Detalle-Title">{problema.title}</h2>
                    <p className="Detalle-Description">{problema.description}</p>
                    <p className="Detalle-Barrio">{problema.barrio}, {problema.ciudad}</p>
                    <p className="Detalle-Likes">{problema.likes}</p>
                    <div>
                        <div className="Detalle">
                        {imagenes.map(image => (
                            <img className="Image" key={image.filename} src={`http://localhost:8080${image.url}`} alt={image.filename} />
                        ))}
                        </div>
                        <button></button>
                    </div>
                </div>
            )}
        </div>
    );
}