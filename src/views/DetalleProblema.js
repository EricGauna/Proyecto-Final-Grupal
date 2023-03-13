import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProblemaById, getImages, toggleLike } from "../services/Problemas";
import { UserContext } from "../contexto/UserContext";
import { Link } from "react-router-dom";
import "./detalle.css";
import Slideshow from "../components/Slideshow/Slideshow";

export const DetalleProblema = () => {
    const { problemasid: id } = useParams();
    const { isloggedUser, loggedUser, isAuthorized } = useContext(UserContext);
    const [problema, setProblema] = useState({});
    const [imagenes, setImagenes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const  {data}  = await getProblemaById(id);
            setProblema(data);
            const imagesData = await getImages();
            const filteredImages = imagesData.filter((image) =>
                data.images.find((img) => img.images === image.filename)
            );
            setImagenes(filteredImages);
            setIsLoading(false);
            setLikes(data.likes)
            if (data.liked !== undefined) {
                setIsLiked(data.liked);
            }
        };
        loadData();
    }, [id]);

    const handleToggleLike = async (event) => {
        const token = isloggedUser()?.token;
        const config = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        try {
            const liked = await toggleLike(config, id);
            console.log(liked);
            if (liked === false) {
                setIsLiked(false);
                setLikes(likes - 1);
            } else if (liked === true) {
                setIsLiked(true);
                setLikes(likes + 1);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="Detalle">
            {!problema && <span>No hemos encontrado el problema seleccionado</span>}
            {problema && (
                <div>
                    <h2 className="Detalle-Title">{problema.title}</h2>

                    {isAuthorized() && (
                        <div>
                            <Link to={`/problemas/${id}/edit`}>
                                <button className="Edit">Editar</button>
                            </Link>
                        </div>
                    )}
                    {loggedUser() && (
                        <div>
                            <button onClick={handleToggleLike} className={isLiked ? "Edit liked" : "Edit"}>
                                {isLiked ? "Liked" : "Like"}
                            </button>
                        </div>
                    )}
                    <div>
                        <div>
                            {isLoading ? (
                                <p>Loading images...</p>
                            ) : (
                                <div className="SlideShow">
                                    <Slideshow problema={problema} images={imagenes.map((image) => `http://localhost:8080${image.url}`)} />
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};