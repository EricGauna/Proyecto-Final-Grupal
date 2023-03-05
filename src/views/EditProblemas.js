import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProblemaById, getImages, editProblemasById } from "../services/Problemas";
import Slideshow from "../components/Slideshow/Slideshow";
import { UserContext } from "../contexto/UserContext";
import "./detalle.css";

export const EditProblema = () => {
    const { problemasid: id } = useParams();
    const [problema, setProblema] = useState({ title: "", Description: "", ciudad: "", barrio: "" });
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [barrio, setBarrio] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [files, setFiles] = useState([]);
    const [imagenes, setImagenes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
            setIsLoading(false);
        };
        loadData();
    }, [id]);


    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        const fileArray = Array.from(selectedFiles);
        setFiles(fileArray);
        setFileNames(fileArray.map((file) =>
            URL.createObjectURL(file)))
    };


    const handleSubmit = async (event) => {
        const token = loggedUser()?.token;
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", problema.title);
        formData.append("description", problema.description);
        formData.append("barrio", problema.barrio);
        formData.append("ciudad", problema.ciudad);
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
            const response = await editProblemasById(formData, config, id);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="Detalle">
            {!problema && <span>No hemos encontrado el problema seleccionado</span>}
            {problema && (
                <form className="formulario" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Título:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="description">Descripción:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="barrio">Barrio:</label>
                        <input
                            type="text"
                            id="barrio"
                            value={barrio}
                            onChange={(event) => setBarrio(event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="ciudad">Ciudad:</label>
                        <input
                            type="text"
                            id="ciudad"
                            value={ciudad}
                            initialvalue={problema.ciudad}
                            onChange={(event) => setCiudad(event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="file"></label>
                        <input
                            type="file"
                            id="file"
                            onChange={handleFileChange}
                            multiple
                        />
                        <div className="previewContainer">
                            {isLoading ? (
                                <p>Loading images...</p>
                            ) : (
                                <Slideshow images={imagenes.map((image) => `http://localhost:8080${image.url}`)} />
                            )}

                            {fileNames.map((file, index) => (
                                <img key={file} src={file} alt={`Preview ${index}`} className="preview" />
                            ))}
                        </div>
                    </div>


                    <button type="submit" className="registro">
                        Crear problema
                    </button>
                </form>
            )}
        </div>
    );
};