import { axiosInstance as axios } from "../../boot/axios";

const list = async context => {
  return await axios.get("/entries").then(response => {
    context.commit("setEntries", response.data);
    return response.data.data;
  });
};

const add = async (context, data) => {
  return await axios.post("/entries", data).then(response => {
    context.commit("addEntry", response.data);
    return response.data.data;
  });
};

const remove = async (context, entries) => {
  let ids = _.map(entries, entry => entry.id);
  return await axios
    .delete("/entries/delete/many", { params: ids })
    .then(() => {
      context.commit("removeEntries", ids);
    });
};

export { list, add, remove };
