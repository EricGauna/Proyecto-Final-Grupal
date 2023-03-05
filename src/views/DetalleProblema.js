import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProblemaById, getImages } from "../services/Problemas";
import { UserContext } from "../contexto/UserContext";
import { Link } from "react-router-dom";
import "./detalle.css";
import Slideshow from "../components/Slideshow/Slideshow";

export const DetalleProblema = () => {
    const { problemasid: id } = useParams();
    const user = useContext(UserContext);
    const [problema, setProblema] = useState({});
    const [imagenes, setImagenes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const { data } = await getProblemaById(id);
            setProblema(data);
            const imagesData = await getImages();
            const filteredImages = imagesData.filter((image) =>
                data.images.find((img) => img.images === image.filename)
            );
            setImagenes(filteredImages);
            setIsLoading(false);
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
                    <p className="Detalle-Barrio">
                        {problema.barrio}, {problema.ciudad}
                    </p>
                    <p className="Detalle-Likes">{problema.likes}</p>
                    <div>
                        <div className="SlideShow">
                        {isLoading ? (
                        <p>Loading images...</p>
                        ) : (
                            <Slideshow images={imagenes.map((image) => `http://localhost:8080${image.url}`)} />
                        )}
                        </div>
                        {user.isAuthorized() && (
                            <div>
                                <Link to={`/problemas/${id}/edit`}>
                                    <button>Editar problema</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};