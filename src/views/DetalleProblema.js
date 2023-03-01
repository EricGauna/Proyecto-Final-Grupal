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
                    <h2>Detalles de {problema.title}</h2>
                    <p>{problema.description}</p>
                    <p>{problema.barrio}, {problema.ciudad}</p>
                    <p>{problema.likes}</p>
                    <div>
                        <h3>Imágenes:</h3>
                        {imagenes.map(image => (
                            <img key={image.filename} src={`http://localhost:8080${image.url}`} alt={image.filename} />
                        ))}
                        
                        <button></button>
                    </div>
                </div>
            )}
        </div>
    );
}