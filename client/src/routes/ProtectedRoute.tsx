import {
  Navigate,
  Outlet,
} from "react-router-dom";

import {
  useAuthStore,
} from "../store/useAuthStore";

function ProtectedRoute() {

  const {
    token,
    loading,
  } = useAuthStore();

  // WAIT FOR SESSION RESTORE

  if (loading) {

    return (

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center

          bg-slate-950
        "
      >

        <div
          className="
            h-14
            w-14

            animate-spin

            rounded-full
            border-4

            border-violet-500
            border-t-transparent
          "
        />

      </div>
    );
  }

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default ProtectedRoute;