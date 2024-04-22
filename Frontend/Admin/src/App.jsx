import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./Chat/Chat";
import Header from "./Header/Header";
import Home from "./Home/Home";
import HistoryDetail from "./Home/HistoryDetail";
import Menu from "./Menu/Menu";
import Products from "./Products/Products";
import UpdateProduct from "./Products/updateProduct/updateProduct";
import Users from "./Users/Users";
import UpdateUser from "./Users/updateUser/updateUser";
import Login from "./Login/Login";
import NewProduct from "./New/NewProduct";
import { AuthContextProvider } from "./Context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <div
            id="main-wrapper"
            data-theme="light"
            data-layout="vertical"
            data-navbarbg="skin6"
            data-sidebartype="full"
            data-sidebar-position="fixed"
            data-header-position="fixed"
            data-boxed-layout="full"
          >
            <Header />
            <Menu />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history/:historyId" element={<HistoryDetail />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/users" element={<Users />} />
              <Route path="/updateUser/:userId" element={<UpdateUser />} />
              <Route path="/products" element={<Products />} />
              <Route
                path="/updateProduct/:productId"
                element={<UpdateProduct />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/new" element={<NewProduct />} />
            </Routes>
          </div>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
