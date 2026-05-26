import {
  Navigate,
  Outlet,
} from "react-router-dom";

interface Props {
  allowedRoles: string[];
}

export default function ProtectedRoute({
  allowedRoles,
}: Props) {

  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  // NOT LOGGED IN

  if (!token) {
    return <Navigate to="/" replace />;
  }

  // INVALID USER

  if (!user?.role) {
    return <Navigate to="/" replace />;
  }

  // ROLE BLOCK

  if (
    !allowedRoles.includes(
      user.role
    )
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}