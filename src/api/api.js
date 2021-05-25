import axios from "axios";

export const api = axios.create({
  baseURL: "https://my-json-server.typicode.com/tractian/fake-api/"
});

export const pegarTudo = async (setDados, params) => {
  await api.get(params)
    .then((res) => (setDados(res.data)))
    .catch((err) => {
      alert("Error não foi pegar as informações!");
      console.log(err)
    })
};

export const pegarUm = async (setDado, params, id) => {
  await api.get(`${params}/${id}`)
    .then((res) => (setDado(res.data)))
    .catch((err) => {
      alert("Error não foi pegar a informação!");
      console.log(err)
    })
};

export const criar = async (params, formulario) => {
  console.log(formulario);
  api.post(params, formulario)
    .then(() => (console.log("dados enviado com sucesso")))
    .catch((err) => {
      alert("Error não foi possivel criar um usuario!");
      console.log(err)
    })
};

export const atualizar = async (params, formulario) => {
  console.log(formulario)
  api.put(params, formulario)
    .then(() => (console.log("dados atualizado com sucesso")))
    .catch((err) => {
      alert("Error não foi possivel criar um usuario!");
      console.log(err)
    })
};

export const deletar = async (params) => {
  console.log(params);
  api.delete(params)
    .then(() => (console.log("Dados delato com sucesso")))
    .catch((err) => {
      alert("Error não foi deletar o dado!");
      console.log(err)
    })
};