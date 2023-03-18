import { useState, useContext } from "react";
import { createProblemas } from "../services/Problemas";
import "./CreateProblema.css";
import { UserContext } from "../contexto/UserContext";

export const CreateProblema = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [barrio, setBarrio] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const { loggedUser } = useContext(UserContext);

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
    formData.append("title", title);
    formData.append("description", description);
    formData.append("barrio", barrio);
    formData.append("ciudad", ciudad);
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
      const response = await createProblemas(formData, config);
      console.log(response);
      window.location.href = `http://localhost:3000/`
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container-create">
      <form className="formulario-create" onSubmit={handleSubmit}>
      <div className="titulo-create">Rellena todos los campos y crear un nuevo problema en tu ciudad</div>
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
          <label htmlFor="description-create">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="barrio-create">Barrio:</label>
          <input
            type="text"
            id="barrio"
            value={barrio}
            onChange={(event) => setBarrio(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="ciudad-create">Ciudad:</label>
          <input
            type="text"
            id="ciudad"
            value={ciudad}
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
          <div className="previewContainer-create">
            {fileNames.map((file, index) => (
              <img key={file} src={file} alt={`Preview ${index}`} className="preview" />
            ))}
          </div>
        </div>

        <button type="submit" className="registro">
          Crear problema
        </button>
      </form>
    </div>
  );
};
