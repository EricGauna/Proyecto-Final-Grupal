import axios from "axios";

export const getProblemas = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/problemas"
    );
    return data;
  } catch (e) {
    return {};
  }
};

export const getProblemaById = async (id) => {
  try {
    const { data } = await axios.get(
    `http://localhost:8080/problemas/${id}`
  )
  return data;
} catch (e) {
  return {};
}
}

export const getImages = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/images`
    )
    return (data)
  } catch (e) {
    return {}
  }
}