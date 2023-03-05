import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProblemaById, getImages, editProblemasById } from "../services/Problemas";
import { UserContext } from "../contexto/UserContext";
import "./editProblemas.css";

export const EditProblema = () => {
    const { problemasid: id } = useParams();
    const [problema, setProblema] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [barrio, setBarrio] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [files, setFiles] = useState([]);
    const [imagenes, setImagenes] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const { loggedUser } = useContext(UserContext);
    console.log(problema, title, description, barrio, ciudad, files);
    
    useEffect(() => {
        const loadData = async () => {
            const { data } = await getProblemaById(id);
            setProblema(data);
            const imagesData = await getImages();
            const filteredImages = imagesData.filter((image) =>
                data.images.find((img) => img.images === image.filename)
            );
            setImagenes(filteredImages);
            setTitle(data.title);
            setDescription(data.description);
            setBarrio(data.barrio);
            setCiudad(data.ciudad);
        };
        loadData();
    }, [id]);

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        const fileArray = Array.from(selectedFiles);
        setFiles(fileArray);
        setFileNames(fileArray.map((file) =>
            URL.createObjectURL(file)))
        setImagenes([]);
    };

    const updateProblema = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("barrio", barrio);
        formData.append("ciudad", ciudad);
        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i]);
        }
        const token = loggedUser()?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        }; console.log(formData);
        try {
            await editProblemasById(formData, config, id);
            console.log(formData, config, id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (e) => {
        
        window.location.href = `http://localhost:3000/problemas`
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const updatedProblema = {
            ...problema,
            title,
            description,
            barrio,
            ciudad,
        };

        setProblema(updatedProblema);
        await updateProblema();
        window.location.href = `http://localhost:3000/problemas/${id}`;
    };

    return (

        <div className="form-container-edit">
            <button onClick={handleDelete}>Borrar</button>
            {!problema && <span>No hemos encontrado el problema seleccionado</span>}
            {problema && (
                <form className="formulario-edit" onSubmit={handleUpdate}>
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
                            onChange={(event) => setCiudad(event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="file">Imagenes:</label>
                        <input
                            type="file"
                            id="file"
                            onChange={handleFileChange}
                            multiple
                        />
                        <div className="previewContainer-edit">
                            {imagenes.map((image, index) => (
                                <img
                                    key={image.filename}
                                    src={`http://localhost:8080/images/${image.filename}`}
                                    alt={`Preview ${index}`}
                                    className="preview-edit"
                                />
                            ))}
                            {fileNames.map((name, index) => (
                                <img
                                    key={name}
                                    src={name}
                                    alt={`Preview ${index}`}
                                    className="preview-edit"
                                />
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="registro">
                        Actualizar
                    </button>
                </form>
            )}
            <button>Borrar</button>
        </div>
    );
}