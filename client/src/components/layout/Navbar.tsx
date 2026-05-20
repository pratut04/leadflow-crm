import {
  Bell,
  Menu,
  ChevronDown,
  LogOut,
  Settings,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useAuthStore,
} from "../../store/useAuthStore";

interface Props {
  onMenuClick: () => void;
}

function Navbar({
  onMenuClick,
}: Props) {

  const navigate =
    useNavigate();

  const [open, setOpen] =
    useState(false);

  const {
    user,
    logout,
  } = useAuthStore();

  const handleLogout = () => {

    logout();

    navigate("/");
  };


  return (

    <header
      className="
        sticky
        top-0
        z-30

        flex
        items-center
        justify-between

        border-b
        border-slate-800

        bg-slate-950/80

        px-4
        py-4

        sm:px-6
        sm:py-5

        backdrop-blur-xl
      "
    >

      {/* MOBILE MENU */}

      <button
        onClick={onMenuClick}

        className="
          rounded-xl
          border
          border-slate-700

          p-3

          transition-all
          duration-200

          hover:bg-slate-800

          lg:hidden
        "
      >

        <Menu size={22} />

      </button>

      {/* RIGHT SIDE */}

      <div
        className="
        ml-auto
        flex
        items-center
        gap-2

        sm:gap-5
      "
      >

        <button
          className="
            rounded-full
            border
            border-slate-700

            p-3

            transition-all
            duration-200

            hover:scale-[1.03]
            hover:bg-slate-800

            active:scale-[0.97]
          "
        >

          <Bell size={20} />

        </button>

        <div className="relative">

          <button
            onClick={() =>
              setOpen(!open)
            }
            className="
      flex
      items-center
      gap-2 sm:gap-3

      rounded-2xl
      border
      border-slate-800

      bg-slate-900/70

      px-3
      py-2

      sm:px-4

      transition-all
      duration-200

      hover:border-violet-500
    "
          >

            <div
              className="
        flex
        items-center
        justify-center
        h-10
        w-10

        sm:h-11
        sm:w-11

        rounded-full

        bg-violet-600

        font-bold
        uppercase
      "
            >

              {user?.name?.charAt(0)}

            </div>

            <div className="hidden sm:block text-left">

              <h3 className="font-semibold">

                {user?.name}

              </h3>

              <div className="mt-1 flex items-center gap-2">

                

                <span
                  className="
            rounded-full

            bg-violet-500/20

            px-3
            py-1

            text-xs
            font-semibold

            capitalize

            text-violet-300
          "
                >

                  {user?.role}

                </span>

              </div>

            </div>

            <ChevronDown size={18} />

          </button>

          {open && (

            <div
              className="
        absolute
        right-0
        mt-3
        w-56

        overflow-hidden

        rounded-2xl
        border
        border-slate-800

        bg-slate-900

        shadow-2xl
      "
            >

              <Link
                to="/dashboard/settings"
                className="
          flex
          items-center
          gap-2 sm:gap-3

          px-5
          py-4

          transition

          hover:bg-slate-800
        "
              >

                <Settings size={18} />

                Settings

              </Link>

              <button
                onClick={handleLogout}
                className="
                  flex
                  w-full
                  items-center
                  gap-2 sm:gap-3

                  px-5
                  py-4

                  text-red-400

                  transition

                  hover:bg-slate-800
                "
              >

                <LogOut size={18} />

                Logout

              </button>

            </div>
          )}
        </div>

      </div>

    </header>
  );
}

export default Navbar;