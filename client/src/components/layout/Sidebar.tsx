import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

import {
  useAuthStore,
} from "../../store/useAuthStore";

import {
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,

    roles: [
      "admin",
      "sales",
    ],
  },


  {
    title: "Pipeline",
    icon: BarChart3,

    roles: [
      "admin",
      "sales",
    ],
  },
  {
    title: "Settings",
    icon: Settings,

    roles: [
      "admin",
      "sales",
    ],
  },

  {
    title: "Users",
    icon: Users,

    roles: [
      "admin",
    ],
  },
];

function Sidebar({
  open,
  onClose,
}: Props) {

  const user =
    useAuthStore(
      (state) => state.user
    );

  const navigate = useNavigate();

  return (

    <>

      {/* OVERLAY */}

      {open && (

        <motion.div

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          onClick={onClose}

          className="
            fixed
            inset-0
            z-40

            bg-black/50
            backdrop-blur-sm

            lg:hidden
          "
        />

      )}

      {/* SIDEBAR */}

      <motion.aside

        initial={{
          x: -300,
        }}

        animate={{
          x:
            window.innerWidth >= 1024
              ? 0
              : open
                ? 0
                : -300,
        }}

        transition={{
          duration: 0.3,
        }}

        className="
          fixed
          left-0
          top-0
          z-50

          flex
          lg:flex
          h-screen
          w-[85vw]
          max-w-72
          flex-col

          border-r
          border-slate-800

          bg-slate-950/95

          backdrop-blur-xl

          lg:translate-x-0
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between

            border-b
            border-slate-800

            p-6
            sm:p-8
          "
        >

          <div>

            <h1 className="text-3xl font-bold tracking-wide">
              LeadFlow
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              CRM Dashboard
            </p>

          </div>

          <button
            onClick={onClose}

            className="
              rounded-xl
              p-2

              transition-all
              duration-200

              hover:bg-slate-800

              lg:hidden
            "
          >

            <X size={22} />

          </button>

        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 space-y-3 p-5">

          {menuItems
            .filter((item) =>
              item.roles.includes(
                user?.role || ""
              )
            )
            .map((item) => {

              const Icon =
                item.icon;

              return (

                <button
                  key={item.title}

                  onClick={() => {

                    if (
                      item.title ===
                      "Dashboard"
                    ) {

                      navigate(
                        "/dashboard"
                      );
                    }

                    if (
                      item.title ===
                      "Pipeline"
                    ) {

                      navigate(
                        "/dashboard/pipeline"
                      );
                    }

                    if (
                      item.title ===
                      "Settings"
                    ) {

                      navigate(
                        "/dashboard/settings"
                      );
                    }
                    if (
                      item.title ===
                      "Users"
                    ) {

                      navigate(
                        "/dashboard/users"
                      );
                    }

                    onClose();
                  }}

                  className="
                    flex
                    w-full
                    items-center
                    gap-4

                    rounded-2xl

                    px-4
                    py-4

                    text-sm
                    text-slate-300

                    transition-all
                    duration-300

                    hover:bg-violet-600
                    hover:text-white

                    sm:px-5
                    sm:text-base
                  "
                >

                  <Icon size={22} />

                  <span className="text-base font-medium">
                    {item.title}
                  </span>

                </button>
              );
            })}

        </nav>

      </motion.aside>

    </>
  );
}

export default Sidebar;