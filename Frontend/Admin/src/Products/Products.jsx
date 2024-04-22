import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import ProductAPI from "../API/ProductAPI";
import Pagination from "./Component/Pagination";
import convertMoney from "../convertMoney";

function Products(props) {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [pagination, setPagination] = useState({
    page: "1",
    count: "8",
    search: "",
  });
  //Tổng số trang
  const [totalPage, setTotalPage] = useState();

  const onChangeText = (e) => {
    const value = e.target.value;

    setPagination({
      page: pagination.page,
      count: pagination.count,
      search: value,
    });
  };

  //Hàm này dùng để thay đổi state pagination.page
  //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
  const handlerChangePage = (value) => {
    //Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
    setPagination({
      page: value,
      count: pagination.count,
      search: pagination.search,
    });
  };

  const updateProduct = async (productId) => {
    navigate(`/updateProduct/${productId}`);
  };
  const deleteProduct = async (productId, name) => {
    const confirmation = window.confirm(
      `Bạn có chắc chắn muốn xóa sản phẩm có tên: ${name}`
    );

    if (confirmation) {
      try {
        const response = await ProductAPI.deleteProduct(productId);

        window.alert(response.message);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  //Gọi hàm Pagination
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: pagination.page,
        count: pagination.count,
        search: pagination.search,
      };

      const query = queryString.stringify(params);

      const newQuery = "?" + query;

      const response = await ProductAPI.getPagination(newQuery);
      setTotalPage(response.totalPages);
      setProducts(response.currentPageData);
    };

    fetchData();
  }, [pagination]);

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Basic Initialisation
            </h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-muted">
                      Home
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Table
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Products</h4>
                <input
                  className="form-control w-25"
                  onChange={onChangeText}
                  type="text"
                  placeholder="Enter Search!"
                />
                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Count</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products.map((value) => (
                          <tr key={value._id} id={value._id}>
                            <td>{value._id}</td>
                            <td>{value.name}</td>
                            <td>{convertMoney(value.price)} VND</td>
                            <td>{convertMoney(value.quantity)}</td>
                            <td>
                              <img
                                src={value.Images[0]}
                                style={{
                                  height: "60px",
                                  width: "60px",
                                }}
                                alt=""
                              />
                            </td>
                            <td>{value.category}</td>
                            <td>
                              <button
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-success"
                                onClick={() => updateProduct(value._id)}
                              >
                                Update
                              </button>
                              &nbsp;
                              <button
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-danger"
                                onClick={() => {
                                  deleteProduct(value._id, value.name);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <Pagination
                    pagination={pagination}
                    handlerChangePage={handlerChangePage}
                    totalPage={totalPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted"></footer>
    </div>
  );
}

export default Products;
