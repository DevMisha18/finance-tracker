import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}
