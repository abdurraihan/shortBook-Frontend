import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import { useAuth } from "../hook/useAuth";

export default function PrivateRoutes() {
  const { auth } = useAuth();
  console.log("from private router dom");
  console.log(auth.user);

  return (
    <>
      <Header />
      {auth.user ? (
        <main className="mx-auto max-w-[1020px] py-8">
          <div className="container">
            <Outlet></Outlet>
          </div>
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
