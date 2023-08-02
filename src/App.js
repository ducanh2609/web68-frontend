import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import DefaultLayout from "./layout/DefaultLayout";
import Register from "./pages/Regisrer";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import UserPage from "./pages/user/UserPage";
import Profile from "./pages/user/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="user">
          <Route path="" element={<UserPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
