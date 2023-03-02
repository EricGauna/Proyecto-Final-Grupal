import { useState } from "react";

export const CreateProblema = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [barrio, setBarrio] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("barrio", barrio);
    formData.append("ciudad", ciudad);
    formData.append("file", file);
    // Aquí podrías enviar el formData al servidor para crear el "problema"
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Título:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="description">Descripción:</label>
      <textarea
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <label htmlFor="barrio">Barrio:</label>
      <input
        type="text"
        id="barrio"
        value={barrio}
        onChange={(event) => setBarrio(event.target.value)}
      />

      <label htmlFor="ciudad">Ciudad:</label>
      <input
        type="text"
        id="ciudad"
        value={ciudad}
        onChange={(event) => setCiudad(event.target.value)}
      />

      <label htmlFor="file">Archivo:</label>
      <input type="file" id="file" onChange={handleFileChange} />

      <button type="submit">Crear problema</button>
    </form>
  );
};




