import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductAPI from "../../API/ProductAPI";

import styles from "./NewProduct.module.css";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  // set formData mặc định
  const [formData, setFormData] = useState({
    _id: "",
    Name: "",
    Category: "",
    Price: 0,
    ShortDes: "",
    LongDes: "",
    Quantity: 0,
    Images: [],
  });
  // set tên lỗi
  const [errors, setErrors] = useState({
    Name: "",
    Category: "",
    Price: "",
    ShortDes: "",
    Quantity: "",
    LongDes: "",
  });
  // set có lỗi hay không
  const [isErrors, setIsErrors] = useState({
    Name: false,
    Category: false,
    Price: false,
    ShortDes: false,
    Quantity: false,
    LongDes: false,
  });

  // gọi api để lấy data product để sửa
  useEffect(() => {
    const fetchApi = async () => {
      const response = await ProductAPI.getDetail(productId);
      const product = await response.product;

      // set form data mặc định theo data lấy được từ api
      setFormData((prevState) => ({
        ...prevState,
        _id: product._id,
        Name: product.name,
        Category: product.category,
        Price: product.price,
        ShortDes: product.short_desc,
        LongDes: product.long_desc,
        Quantity: product.quantity,
        img1: product.img1,
        img2: product.img2,
        img3: product.img3,
        img4: product.img4,
      }));
    };
    fetchApi();
  }, [productId]);

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
    }

    // Tiếp tục xử lý khi mọi thứ đều hợp lệ
    const data = new FormData();
    data.append("_id", formData._id);
    data.append("Name", formData.Name);
    data.append("Category", formData.Category);
    data.append("Price", formData.Price);
    data.append("ShortDes", formData.ShortDes);
    data.append("LongDes", formData.LongDes);
    data.append("Quantity", formData.Quantity);

    try {
      await ProductAPI.putUpdateProduct(data);

      setFormData({
        Name: "",
        Category: "",
        Price: 0,
        ShortDes: "",
        LongDes: "",
        Images: [],
        Quantity: 0,
      });
      document.getElementById("UpdateProduct").reset();
      window.alert("Cập nhật sản phẩm thành công");
      navigate("/products");
    } catch (error) {
      console.error("Error uploading product", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className={styles.page_NewProduct}>
        <div className={styles.tytile}>
          <h1>Update Product</h1>
        </div>
        <div className="row">
          <form style={{ width: "50%", marginLeft: "10%" }} id="UpdateProduct">
            <div className="form-group">
              <label>Product Name</label>
              <input
                name="Name"
                onChange={handleInputChange}
                value={formData.Name}
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
              <input
                name="Category"
                onChange={handleInputChange}
                value={formData.Category}
                type="text"
                className="form-control"
                placeholder="Enter Category"
              />
              {isErrors.Category && (
                <span style={{ color: "red" }}>{errors.Category}</span>
              )}
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                name="Price"
                onChange={handleInputChange}
                value={formData.Price}
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
                value={formData.Quantity}
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
                value={formData.ShortDes}
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
                value={formData.LongDes}
                className="form-control"
                rows="4"
                placeholder="Enter Long Description"
              ></textarea>
              {isErrors.LongDes && (
                <span style={{ color: "red" }}>{errors.LongDes}</span>
              )}
            </div>
            <div className={styles.form_group_img}>
              <p for="exampleFormControlFile1">Upload image (4 images)</p>
              <img src={formData.img1} alt="" />
              <img src={formData.img2} alt="" />
              <img src={formData.img3} alt="" />
              <img src={formData.img3} alt="" />
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

export default UpdateProduct;
