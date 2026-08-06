import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const token = window.localStorage.getItem("admin_token");
  if (!token) return <Navigate to="/admin" replace />;
  return children;
}
