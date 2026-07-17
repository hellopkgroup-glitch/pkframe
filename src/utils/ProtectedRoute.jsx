import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { listenAuth } from "../services/authService";

export default function ProtectedRoute({ children }) {

  const [user, setUser] = useState(undefined);

  useEffect(() => {

    const unsubscribe = listenAuth((currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;

  }, []);

  // Checking authentication
  if (user === undefined) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: 20,
        }}
      >
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Logged in
  return children;
}