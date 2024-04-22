import axiosClient from "./axiosClient";

const ProductAPI = {
  getAPI: () => {
    const url = "/products";
    return axiosClient.get(url);
  },

  getCategory: (query) => {
    const url = `/products/category${query}`;
    return axiosClient.get(url);
  },

  // lấy thông tin product để cập nhật product
  getDetail: (id) => {
    const url = `/products/product/${id}`;
    return axiosClient.get(url);
  },

  // cập nhật một product
  putUpdateProduct: (data, isFormData = true) => {
    const url = `/products/updateProduct`;
    return axiosClient.put(url, data, { isFormData });
  },

  // xóa một product
  deleteProduct: (id) => {
    const url = `/products/deleteProduct/${id}`;
    return axiosClient.delete(url);
  },

  postAddProduct: (data, isFormData = true) => {
    const url = `/products/new`;
    return axiosClient.post(url, data, { isFormData });
  },

  getPagination: (query) => {
    const url = `/products/pagination${query}`;
    return axiosClient.get(url);
  },
};

export default ProductAPI;
