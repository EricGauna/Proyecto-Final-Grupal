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

export const createProblemas = async (formData, config) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/createproblema",
      formData, config
      
    ); console.log(data);
    return data;
  } catch (e) {
    return {};
  }
}

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
    console.log(data);
    return (data)
  } catch (e) {
    return {}
  }
}



export const searchProblemas = async (searchParams) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/search?${searchParams}`
    );
    return data;
  } catch (e) {
    return {};
  }
};

export const editProblemasById = async (id) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/problemas/${id}`
    )
    return data;
  } catch (e) {
    return {};
  }
}
