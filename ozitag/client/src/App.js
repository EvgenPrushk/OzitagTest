import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./pages/routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import "materialize-css";
import { NavBar } from "./components/Navbar";

function App() {
  const { token, login, logout, userId } = useAuth();
  // have or not have token
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <Router>
        {isAuthenticated && <NavBar/>}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
