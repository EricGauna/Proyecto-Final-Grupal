import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProblemaById, getImages, toggleLike } from "../services/Problemas";
import { UserContext } from "../contexto/UserContext";
import { Link } from "react-router-dom";
import Slideshow from "../components/Slideshow/Slideshow";
import "./detalle.css";
    
export const DetalleProblema = () => {
    const { problemasid: id } = useParams();
    const { isloggedUser, loggedUser, isAuthorized, getLikes } = useContext(UserContext);
    const [problema, setProblema] = useState({});
    const [imagenes, setImagenes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

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
            setLikes(data.likes);
            if (data.liked !== undefined) {
                setIsLiked(data.liked);
            }
        };
        loadData();
    }, [id]);

    useEffect(() => {
        const seeLikes = async () => {
            const token = isloggedUser()?.token;
            if (token !== undefined) {
                const config = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                };
                try {
                    const Likes = await getLikes(config);
                    const filteredLikes = Likes.filter((like) => {
                        return like.problemasId === problema.id;
                    });
                    if (filteredLikes.length > 0) {
                        setIsLiked(true);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };
        seeLikes();
    }, [problema.id ])

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
                <>
                    <h2 className="Detalle-Title">{problema.title}</h2>
                    <div className="ImageButtons">
                        {loggedUser() && (
                            <div>
                                <div className="LikeBox">
                                    <i onClick={handleToggleLike} className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                                </div>
                            </div>
                        )}
                        <p className="Detalle-Likes">{`Likes: ${likes}`}</p>
                        <p className="Detalle-Estado">{problema.estado=== 1 ? "Pendiente ❌" : "Resuelto ✅"}</p>
                        {isAuthorized() && (
                            <div className="EditBox">
                                <Link to={`/problemas/${id}/edit`}>
                                    <div className="fa-solid fa-pen-to-square btn btn-secondary"></div>
                                </Link>
                            </div>
                        )}
                    </div>
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
                </>
            )}
        </div>
    );
};