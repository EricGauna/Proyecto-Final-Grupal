import axios from "axios";

export const CreateNewProblema = async ({
  file,
  title,
  description,
  barrio,
  ciudad,
  userId,
}) => {
  if (!file) {
    throw new Error("No es un archivo valido");
  }
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("barrio", barrio);
    formData.append("ciudad", ciudad);
    formData.append("userId", userId);

    const { data } = await axios.post(
      "http://localhost:8080/problema/post",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (e) {
    return {};
  }
};
