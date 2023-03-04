import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexto/UserContext";
import { editProblemasById, getImages, getProblemaById } from "../services/Problemas";
import "./editProblemas.css";

export const EditProblema = () => {
    const { problemasid: id } = useParams();
    const [problema, setProblema] = useState({});
    const [imagenes, setImagenes] = useState([]);
    const [imagenActual, setImagenActual] = useState("");
    const [editando, setEditando] = useState(false);
    const [problemaEditado, setProblemaEditado] = useState([]);
    const [files, setFiles] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const { loggedUser } = useContext(UserContext);



    useEffect(() => {
        const loadData = async () => {
            const { data } = await getProblemaById(id);
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

    const handleEdit = () => {
        setEditando(true);
    };

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        const fileArray = Array.from(selectedFiles);
        setFiles(fileArray);
        setFileNames(fileArray.map((file) =>
            URL.createObjectURL(file)))
    };

    const handleUpdate = async () => {
        const token = loggedUser()?.token;
        const formData = new FormData();
        console.log(problemaEditado);
        formData.append("title", problemaEditado.title);
        formData.append("description", problemaEditado.description);
        formData.append("barrio", problemaEditado.barrio);
        formData.append("ciudad", problemaEditado.ciudad);
        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i]);
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        };
        try {
            const data = await editProblemasById(formData, config, id);
            setProblema(data);
            setProblemaEditado(data);
            setEditando(false);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (event) => {
        setProblema({
            ...problema,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div>
            {!problema && <span>No hemos encontrado el problema seleccionado</span>}
            {problema && (
                <span className="recuadro">
                    <div className="texto">
                        <h2 className="titulo">Detalles de {problema.title}</h2>
                        <div className="descripcion-wrapper">
                            {editando ? (
                                <input
                                    className="descripcion-input"
                                    type="text"
                                    name="description"
                                    value={problema.description}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p className="descripcion">{problema.description}</p>
                            )}
                        </div>
                        <div className="barrio-wrapper">
                            {editando ? (
                                <input
                                    className="barrio-input"
                                    type="text"
                                    name="barrio"
                                    value={problema.barrio}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p className="barrio">{problema.barrio}</p>
                            )}
                        </div>
                        <div className="ciudad-wrapper">
                            {editando ? (
                                <input
                                    className="ciudad-input"
                                    type="text"
                                    name="ciudad"
                                    value={problema.ciudad}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p className="ciudad">{problema.ciudad}</p>
                            )}
                        </div>
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
                            {editando ? (
                                <div>
                                    <label htmlFor="file"></label>
                                    <input
                                        type="file"
                                        id="file"
                                        onChange={handleFileChange}
                                        multiple
                                    />
                                    <div className="previewContainer">
                                        {fileNames.map((file, index) => (
                                            <img key={file} src={file} alt={`Preview ${index}`} className="preview" />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                    <div>
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
                            )}
                        </div>
                    </div>
                    {editando ? (
                        <button onClick={handleUpdate}>Actualizar</button>
                    ) : (
                        <button onClick={handleEdit}>Editar</button>
                    )}
                </span>
            )}
        </div>
    );
};
