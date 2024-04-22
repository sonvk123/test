const userModel = require("../../models/userModels");
const orderModel = require("../../models/orderModels");

let url =
  process.env.NODE_ENV === "production"
    ? `${process.env.URL_BACKEND}`
    : "http://localhost:5000";

// lấy History
exports.getHistory = async (req, res) => {
  const { count, page, idUser } = req.query;
  // count: số lượng đơn hàng trong mỗi trang
  // page: trang hiện tại
  // idUser: ID của người dùng

  const pageSize = +count;
  const skip = (page - 1) * pageSize;

  try {
    const user = await userModel.findById(idUser);

    // lấy các orderId để lấy các order của user
    const orderIds = user.order || [];
    // Lấy orders theo trang và sắp xếp giảm dần theo dateTime
    const orders = await orderModel
      .find({ _id: { $in: orderIds } })
      .sort({ dateTime: -1 })
      .skip(skip)
      .limit(pageSize);

    const totalRecords = await orderModel.countDocuments({
      _id: { $in: orderIds },
    });
    const totalPages = Math.ceil(totalRecords / pageSize); // Tổng số trang tối ưu

    let historySend = [];
    orders.forEach((order) => {
      const history = {
        _id: order._id,
        idUser: idUser,
        fullname: order.fullname,
        phone: order.phone,
        address: order.address,
        total: order.cart.total,
        delivery: true,
        status: true,
      };
      historySend.push(history);
    });

    const data_send = {
      totalPages: totalPages,
      currentPageData: historySend,
    };

    res.send(data_send);
  } catch (error) {
    res.status(500).send({ message: "Lỗi server khi lấy lịch sử đơn hàng" });
  }
};

// lấy History theo id
exports.getDetail = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).send({ message: "Đơn hàng không tồn tại" });
    }

    order.cart.items.forEach((item) => {
      if (item.img && !item.img.includes("firebasestorage")) {
        item.img = `${url}/${item.img}`;
      }
    });

    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ message: "Lỗi server khi lấy chi tiết đơn hàng" });
  }
};
