import { useAuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}
