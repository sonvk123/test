import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserAPI from "../../API/UserAPI";

import styles from "./NewUser.module.css";

const UpdateUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  // set formData mặc định
  const [formData, setFormData] = useState({
    _id: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  // set tên lỗi
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  // set có lỗi hay không
  const [isErrors, setIsErrors] = useState({
    fullName: false,
    email: false,
    password: false,
    phone: false,
  });

  // gọi api để lấy data User để sửa
  useEffect(() => {
    const fetchApi = async () => {
      const response = await UserAPI.getDetailData(userId);
      const user = await response.user;

      // set form data mặc định theo data lấy được từ api
      setFormData((prevState) => ({
        ...prevState,
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phoneNumber,
      }));
    };
    fetchApi();
  }, [userId]);

  // khi chỉnh sửa input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
    setIsErrors((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };

  // khi nhấn nust Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // kiểm tra xem formData có phần nào để trống hay không
    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === "") {
        setIsErrors((prevState) => ({
          ...prevState,
          [key]: true,
        }));
        setErrors((prevState) => ({
          ...prevState,
          [key]: "Phần này không được để trống",
        }));
      }
    });

    // Tiếp tục xử lý khi mọi thứ đều hợp lệ
    const data = new FormData();
    data.append("_id", formData._id);
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phone", formData.phone);

    try {
      await UserAPI.putUpdateUser(data);

      setFormData({
        fullName: "",
        email: "",
        password: "",
        phone: "",
      });
      document.getElementById("UpdateUser").reset();
      window.alert("Cập nhật User thành công");
      navigate("/users");
    } catch (error) {
      console.error("Error uploading User", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className={styles.page_NewUser}>
        <div className={styles.tytile}>
          <h1>Update User</h1>
        </div>
        <div className="row">
          <form style={{ width: "50%", marginLeft: "10%" }} id="UpdateUser">
            <div className="form-group">
              <label>User Name</label>
              <input
                name="fullName"
                onChange={handleInputChange}
                value={formData.fullName}
                type="text"
                className="form-control"
                placeholder="Enter User fullName"
              />
              {isErrors.fullName && (
                <span style={{ color: "red" }}>{errors.fullName}</span>
              )}
            </div>

            <div className="form-group">
              <label>User email</label>
              <input
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                className="form-control"
                placeholder="Enter User email"
              ></input>
              {isErrors.email && (
                <span style={{ color: "red" }}>{errors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label>User password</label>
              <input
                name="password"
                onChange={handleInputChange}
                value={formData.password}
                className="form-control"
                placeholder="Enter User password"
              ></input>
              {isErrors.password && (
                <span style={{ color: "red" }}>{errors.password}</span>
              )}
            </div>
            <div className="form-group">
              <label>User phone</label>
              <input
                name="phone"
                onChange={handleInputChange}
                value={formData.phone}
                className="form-control"
                placeholder="Enter User phone"
              ></input>
              {isErrors.phone && (
                <span style={{ color: "red" }}>{errors.phone}</span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
