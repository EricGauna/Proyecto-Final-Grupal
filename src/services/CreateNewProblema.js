import axios from "axios";

export const CreateNewProblema = async ({
  title,
  ciudad,
  barrio,
  file,
  description,
  userId,
}) => {
  if (!file) {
    throw new Error("No es un archivo valido");
  }
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("ciudad", ciudad);
    formData.append("barrio", barrio);
    formData.append("images", file)
    formData.append("description", description);
    formData.append("userId", userId);

    const { data } = await axios.post(
      "http://localhost:8080/problemas/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ); console.log(data);
    return data;
  } catch (e) {
    return {};
  }
};
