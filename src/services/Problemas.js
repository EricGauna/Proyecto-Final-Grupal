import axios from "axios";
import swal from "sweetalert";

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

    ); 
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
    swal({
      title: "Algo ha ido mal!",
      text: "Vuelve a intentarlo!",
      icon: "warning",
      button: "Ok!",
    });
  }
}

export const getImages = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/images`
    )
    return (data)
  } catch (e) {
    swal({
      title: "Algo ha ido mal!",
      text: "Vuelve a intentarlo!",
      icon: "warning",
      button: "Ok!",
    });
  }
}

export const searchProblemas = async (searchParams) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/search?${searchParams}`
    );
    return data;
  } catch (e) {
    swal({
      title: "Algo ha ido mal!",
      text: "Vuelve a intentarlo!",
      icon: "warning",
      button: "Ok!",
    });
  }
};

export const editProblemasById = async (formData, config, id) => {
  try {
    const { data } = await axios.put(
      `http://localhost:8080/problemas/${id}/edit`,
      formData, config
    )

    return data;
  } catch (e) {
    swal({
      title: "Algo ha ido mal!",
      text: "Vuelve a intentarlo!",
      icon: "warning",
      button: "Ok!",
    });
  }
}

export const deleteProblemaById = async (config, id) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:8080/problemas/${id}`, config
    )
    return data;
  } catch (e) {
    swal({
      title: "Algo ha ido mal!",
      text: "Vuelve a intentarlo!",
      icon: "warning",
      button: "Ok!",
    });
  }
}

export const toggleLike = async (config, id) => {
  try {
    const response = await fetch(`http://localhost:8080/problemas/${id}/like`, config);
    const  data  = await response.json();
    const isLiked = data.data.liked;
    return isLiked;
  } catch (e) {
    swal({
      title: "Algo ha ido mal!",
      text: "Vuelve a intentarlo!",
      icon: "warning",
      button: "Ok!",
    });
  }
}

export const toggleStatus = async (config, id) => {
  try {
    const response = await fetch(`http://localhost:8080/problemas/${id}/status`, config);
    const {data} = await response.json();
    return data;
  } catch (e) {
    swal({
      title: "Algo ha ido mal!",
      text: "Vuelve a intentarlo!",
      icon: "warning",
      button: "Ok!",
    });
  }
}
