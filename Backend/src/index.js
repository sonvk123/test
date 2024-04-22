const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const { connect } = require("./database/database.js");
const { MONGODB_URI } = require("./database/database.js");

const app = express();
const PORT = process.env.PORT || 5000;

require("dotenv").config();

const urlAdmin = process.env.URL_ADMIN;
const urlClient = process.env.URL_CLIENT;

// Đặt header Access-Control-Allow-Credentials và Access-Control-Allow-Origin khi cần
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    urlAdmin,
    urlClient,
  ],
  credentials: true,
};

app.use(cors(corsOptions));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = "./src/images";
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath);
    }
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// xác thực tài khoản
const authRoutes = require("./routes/authRoute.js");

// chat
const chatRouter = require("./routes/chat/chatRouter.js");

// client
const homeRouteClient = require("./routes/client/homeRoute.js");
const productsRouterClient = require("./routes/client/productsRouter.js");
const cartRouter = require("./routes/client/cartRouter.js");
const orderRouter = require("./routes/client/orderRouter.js");
const historyRouter = require("./routes/client/historyRouter.js");

// admin
const adminRoutes = require("./routes/admin/adminRoute.js");
const dashboardRouter = require("./routes/admin/dashboardRouter.js");
const productsRouterAdmin = require("./routes/admin/productsRouter.js");

// Sử dụng multer để xử lý tải lên hình ảnh
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("files")
);

app.use("/src/images", express.static(path.join(__dirname, "images")));

app.use(cookieParser());

// chat

app.use("/admin/chatrooms", chatRouter);

app.use("/client/chatrooms", chatRouter);

// admin
app.use("/admin", adminRoutes);
// đăng ký đăng nhập
app.use("/admin/user", authRoutes);
// trang dashboard
app.use("/admin/histories", dashboardRouter);
app.use("/admin/products", productsRouterAdmin);

// CLIENT
//
// đăng ký đăng nhập
app.use("/client/user", authRoutes); //
// trang home
app.use("/client", homeRouteClient); //
// trang shop
app.use("/client/products", productsRouterClient); //
// cart
app.use("/client/carts", cartRouter);
// Order
app.use("/client", orderRouter);
// History
app.use("/client/histories", historyRouter);

connect(MONGODB_URI).then(() => {
  // Khởi động server
  const server = app.listen(PORT, () => {
    console.log("Server đang chạy ở PORT: ", PORT);
  });
  // Tích hợp Socket.IO với CORS
  const io = require("./public/socket.js").init(server);

  // Xử lý sự kiện kết nối
  io.on("connection", (client) => {
    let room; // phòng chát

    // tham gia chat
    client.on("join", (data) => {
      room = data;
      client.join(room);
    });
    // nhận và gửi tin nhắn
    client.on("send_message", (data) => {
      io.to(data.roomId).emit("receive_message", data);
    });
  });
});
