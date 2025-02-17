import { Link } from "react-router-dom";
import { BsBagHeart } from "react-icons/bs";
import { IoPencilOutline } from "react-icons/io5";
import { login, logout } from "../api/firebase";
import { useAuthContext } from "./AuthContext";

export default function Navbar() {
  const { user } = useAuthContext();
  return (
    <>
      <header className="flex justify-between border-b border-gray-300 p-3">
        <Link to="/" className="flex items-center text-4xl text-brand">
          <BsBagHeart />
          <h1>Shoppy</h1>
        </Link>
        <nav className="flex items-center font-bold gap-4 text-gray-500">
          <Link to="/products">Products</Link>
          <Link to="/carts">Carts</Link>
          <Link to="/products/new" className="text-2xl">
            {user?.isAdmin && <IoPencilOutline />}
          </Link>
          <span>{user ? `Welcome, ${user.displayName}` : ""}</span>
          {user && <button onClick={logout}>logout</button>}
          {!user && <button onClick={login}>login</button>}
        </nav>
      </header>
    </>
  );
}
