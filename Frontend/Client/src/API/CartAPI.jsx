import axiosClient from "./axiosClient";

const CartAPI = {
  // lấy cart
  getCarts: (query) => {
    const url = `/carts${query}`;
    return axiosClient.get(url);
  },

  // thêm cart
  postAddToCart: (query) => {
    const url = `/carts/add${query}`;
    return axiosClient.post(url);
  },

  // xóa cart
  deleteToCart: (query) => {
    const url = `/carts/delete${query}`;
    return axiosClient.delete(url);
  },

  // cập nhật cart
  putToCart: (query) => {
    const url = `/carts/update${query}`;
    return axiosClient.put(url);
  },
};

export default CartAPI;
