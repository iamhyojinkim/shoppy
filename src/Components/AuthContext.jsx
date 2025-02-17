import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { onUserChanged } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    </>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
