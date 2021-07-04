import { createContext } from "react";

function game() {}
export const AuthContext = createContext({
  token: null,
  userId: null,
  login: game,
  logout: game,
  isAuthenticated: false,
});
