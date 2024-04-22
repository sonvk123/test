import axiosClient from "./axiosClient";

const HistoryAPI = {
  getAll: (query) => {
    const url = `/histories/all${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/histories/${id}`;
    return axiosClient.get(url);
  },
};

export default HistoryAPI;
