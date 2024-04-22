import axiosClient from "./axiosClient";

const UserAPI = {
  // đăng nhập
  postSignIn: (query) => {
    const url = `/user/loginAdmin/${query}`;
    return axiosClient.post(url);
  },

  // đăng xuất
  getLogout: () => {
    const url = `/user/logout`;
    return axiosClient.get(url);
  },

  // lấy danh sách user và theo tên
  postAllData: (query) => {
    const url = `/users/${query}`;
    return axiosClient.post(url);
  },

  // lấy user theo id để sửa
  getDetailData: (id) => {
    const url = `/users/user/${id}`;
    return axiosClient.get(url);
  },

  // update user
  putUpdateUser: (data, isFormData = true) => {
    const url = `/users/putUpdateUser`;
    return axiosClient.put(url, data, { isFormData });
  },

  // xóa user
  deleteUser: (id) => {
    const url = `/users/deleteUser/${id}`;
    return axiosClient.delete(url);
  },

  // đăng ký
  postSignUp: (query) => {
    const url = `/users/signup/${query}`;
    return axiosClient.post(url);
  },
};

export default UserAPI;
