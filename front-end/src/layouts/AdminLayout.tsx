import { Outlet } from "react-router";
import { useAppContext } from "@/App";
import { Navigate } from "react-router";

const AdminLayout = () => {
  const { user } = useAppContext();
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminLayout;
