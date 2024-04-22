import React, { useState } from "react";

import ProductAPI from "../API/ProductAPI";

import styles from "./NewProduct.module.css";

const NewProduct = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Category: "iphone",
    Price: 0,
    ShortDes: "",
    LongDes: "",
    Images: [],
    Quantity: 0,
  });
  const [errors, setErrors] = useState({
    Name: "",
    Category: "",
    Price: "",
    ShortDes: "",
    LongDes: "",
    Images: "",
    Quantity: "",
  });
  const [isErrors, setIsErrors] = useState({
    Name: false,
    Category: false,
    Price: false,
    ShortDes: false,
    LongDes: false,
    Images: false,
    Quantity: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: value.trim() ? "" : "Phần này không được để trống",
    }));
    setIsErrors((prevState) => ({
      ...prevState,
      [name]: !value.trim(),
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, Images: files });
    setErrors((prevState) => ({
      ...prevState,
      Images: files.length === 4 ? "" : "Vui lòng chọn chính xác 4 ảnh.",
    }));
    setIsErrors((prevState) => ({
      ...prevState,
      Images: files.length !== 4,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let test = true;
    Object.keys(formData).forEach((key) => {
      if (key !== "Images" && key !== "Price" && key !== "Quantity") {
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
        test = false;
      } else {
        test = true;
      }
    });

    // Kiểm tra giá tiền
    if (formData.Price <= 0) {
      setIsErrors((prevState) => ({
        ...prevState,
        Price: true,
      }));
      setErrors((prevState) => ({
        ...prevState,
        Price: "Vui lòng nhập giá tiền.",
      }));
      test = false;
    } else {
      test = true;
    }

    if (formData.Quantity <= 0) {
      setIsErrors((prevState) => ({
        ...prevState,
        Quantity: true,
      }));
      setErrors((prevState) => ({
        ...prevState,
        Quantity: "Vui lòng nhập số lượng sản phẩm.",
      }));
      test = false;
    } else {
      test = true;
    }

    // Kiểm tra số lượng ảnh
    if (formData.Images.length !== 4) {
      setIsErrors((prevState) => ({
        ...prevState,
        Images: true,
      }));
      setErrors((prevState) => ({
        ...prevState,
        Images: "Vui lòng chọn chính xác 4 ảnh.",
      }));
      test = false;
    } else {
      test = true;
    }

    // Tiếp tục xử lý khi mọi thứ đều hợp lệ
    const data = new FormData();
    data.append("Name", formData.Name);
    data.append("Category", formData.Category);
    data.append("Price", formData.Price);
    data.append("ShortDes", formData.ShortDes);
    data.append("LongDes", formData.LongDes);
    data.append("Quantity", formData.Quantity);

    formData.Images.forEach((image, index) => {
      data.append("files", formData.Images[index]);
    });

    try {
      if (!test) {
        return;
      }
      await ProductAPI.postAddProduct(data);
      setFormData({
        Name: "",
        Category: "iphone",
        Price: 0,
        ShortDes: "",
        LongDes: "",
        Images: [],
        Quantity: 0,
      });
      // đặt from về mặc định
      // document.getElementById("NewProduct").reset();
      window.alert("Đã thêm sản phẩm mới thành công");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading product", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className={styles.page_NewProduct}>
        <div className={styles.tytile}>
          <h1>New Product</h1>
        </div>
        <div className="row">
          <form style={{ width: "50%", marginLeft: "10%" }} id="NewProduct">
            <div className="form-group">
              <label>Product Name</label>
              <input
                name="Name"
                onChange={handleInputChange}
                type="text"
                className="form-control"
                placeholder="Enter Product Name"
              />
              {isErrors.Name && (
                <span style={{ color: "red" }}>{errors.Name}</span>
              )}
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                name="Category"
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="iphone">iphone</option>
                <option value="ipad">ipad</option>
                <option value="macbook">macbook</option>
                <option value="airpod">airpod</option>
                <option value="watch">watch</option>
                <option value="mouse">mouse</option>
                <option value="keyboard">keyboard</option>
              </select>
              {isErrors.Category && (
                <span style={{ color: "red" }}>{errors.Category}</span>
              )}
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                name="Price"
                onChange={handleInputChange}
                type="number"
                className="form-control"
                placeholder="Enter Price"
              />
              {isErrors.Price && (
                <span style={{ color: "red" }}>{errors.Price}</span>
              )}
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                name="Quantity"
                onChange={handleInputChange}
                type="number"
                className="form-control"
                placeholder="Enter Quantity"
              />
              {isErrors.Quantity && (
                <span style={{ color: "red" }}>{errors.Quantity}</span>
              )}
            </div>
            <div className="form-group">
              <label>Short Description</label>
              <textarea
                name="ShortDes"
                onChange={handleInputChange}
                className="form-control"
                rows="3"
                placeholder="Enter Short Description"
              ></textarea>
              {isErrors.ShortDes && (
                <span style={{ color: "red" }}>{errors.ShortDes}</span>
              )}
            </div>
            <div className="form-group">
              <label>Long Description</label>
              <textarea
                name="LongDes"
                onChange={handleInputChange}
                className="form-control"
                rows="4"
                placeholder="Enter Long Description"
              ></textarea>
              {isErrors.LongDes && (
                <span style={{ color: "red" }}>{errors.LongDes}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlFile1">
                Upload image (4 images)
              </label>
              <input
                onChange={handleImageChange}
                type="file"
                name="images"
                multiple
                className="form-control-file"
                id="exampleFormControlFile1"
              />
              {isErrors.Images && (
                <span style={{ color: "red" }}>{errors.Images}</span>
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

export default NewProduct;
