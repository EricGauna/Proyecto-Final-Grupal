import { CreateNewProblema } from "../services/CreateNewProblema";

export const CreateProblema = () => {
  const uploadNow = (event) => {
    event.prevenDefault();
    const file = event.target.file.files[0];
    CreateNewProblema({
      file,
      title: event.target.title.value,
      description: event.target.description.value,
      barrio: event.target.barrio.value,
      ciudad: event.target.ciudad.value,
    });
  };
  return (
    <form onSubmit={(event) => uploadNow(event)}>
      <label for="username">Nombre: </label>
      <input
        type="text"
        name="title"
        alt="Título"
      />
      <label for="barrio">Barrio: </label>
      <input type="text" name="barrio" />
      <label for="ciudad">Ciudad: </label>
      <input type="text" name="ciudad" />
      <label for="file">Imagen: </label>
      <input name="file" type="file" />
      <label for="descripcion"> Descripcion: </label>
      <input type="text" name="descripcion" />
      <button type="submit">Enviar Problema</button>
    </form>
  );
};
