import { Outlet, Link } from "react-router-dom";
import "./default-layout.scss";
import { useEffect, useState } from "react";
// import { setUser } from "../store/actions/users.actions";
import { useDispatch } from "react-redux";
import { userSlice } from "../store-toolkit/reducers/userSlice";

export default function DefaultLayout() {
  const [login, setLogin] = useState(0);
  const [isAdmin, setIsAdmin] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(1);
      const username = localStorage.getItem("user");
      fetch(`http://localhost:4000/user/${username}`).then(async (res) => {
        const data = await res.json();
        console.log(data);
        // dispatch(setUser(data || {}));
        dispatch(userSlice.actions.setUser(data || {}));
        if (data?.role.includes("admin")) {
          setIsAdmin(1);
        } else {
          setIsAdmin(0);
        }
      });
    } else setLogin(0);
  }, [dispatch]);
  function logout() {
    localStorage.removeItem("token");
    setLogin(0);
    window.location.href = "/";
  }
  return (
    <>
      <nav>
        <Link to="/">Hompage</Link>
        {login === 0 ? (
          <div>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        ) : (
          <div>
            {isAdmin ? <Link to="/admin">Admin</Link> : ""}
            <Link to="/user">User</Link>
            <Link to="/user/profile">Profile</Link>
            <Link onClick={logout}>Logout</Link>
          </div>
        )}
      </nav>
      <div className="main">
        <Outlet />
      </div>
    </>
  );
}
