import { useParams } from "react-router-dom";

import HistoryAPI from "../API/HistoryAPI";
import { useEffect, useState } from "react";

const HistoryDetail = () => {
  const params = useParams();
  const historyId = params.historyId;

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [information, setInformation] = useState({});

  useEffect(() => {
    const resData = async () => {
      const res = await HistoryAPI.getDetail(historyId);

      setTotal(res.cart.total);

      setCart(res.cart.items);

      setInformation(res);
    };
    resData();
  }, [historyId]);

  return (
    <div className="container">
      <div className="p-5">
        <h1 className="text-uppercase mt-5">Information Order</h1>
        <p className="mt-5">ID User: {information.userId}</p>
        <p>Full Name: {information.fullname}</p>
        <p>Phone: {information.phone}</p>
        <p>Address: {information.address}</p>
        <p>Total: {total} VND</p>
      </div>

      <div className="table-responsive pt-5 pb-5">
        <table className="table">
          <thead className="bg-light">
            <tr className="text-center">
              <th className="border-0" scope="col">
                <strong className="text-small text-uppercase">
                  ID Product
                </strong>
              </th>
              <th className="border-0" scope="col">
                <strong className="text-small text-uppercase">Image</strong>
              </th>
              <th className="border-0" scope="col">
                <strong className="text-small text-uppercase">Name</strong>
              </th>
              <th className="border-0" scope="col">
                <strong className="text-small text-uppercase">Price</strong>
              </th>
              <th className="border-0" scope="col">
                <strong className="text-small text-uppercase">Count</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              cart.map((value) => (
                <tr className="text-center" key={value.productId}>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.productId}</h6>
                  </td>
                  <td className="pl-0 border-0">
                    <div className="media align-items-center justify-content-center">
                      <img src={value.img} alt="..." width="200" />
                    </div>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.nameProduct}</h6>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.priceProduct}</h6>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.quantity}</h6>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryDetail;
