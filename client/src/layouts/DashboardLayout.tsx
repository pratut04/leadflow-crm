import {
  useState,
} from "react";

import {
  Outlet,
} from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";

import Navbar from "../components/layout/Navbar";

function DashboardLayout() {

  const [
    openSidebar,
    setOpenSidebar,
  ] = useState(false);

  return (

    <div className="min-h-screen bg-[#020617] text-white">

      {/* MOBILE SIDEBAR */}

      <Sidebar
        open={openSidebar}

        onClose={() =>
          setOpenSidebar(false)
        }
      />

      <div
        className="
          min-h-screen

          lg:ml-72
        "
      >

        <Navbar
          onMenuClick={() =>
            setOpenSidebar(true)
          }
        />

        <main
          className="
            p-4
            sm:p-6
            lg:p-8

            overflow-x-hidden
          "
        >

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;