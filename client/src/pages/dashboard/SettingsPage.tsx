import {
  useState,
} from "react";

import {
  Save,
  Shield,
  User,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  useAuthStore,
} from "../../store/useAuthStore";

function SettingsPage() {

  const user =
    useAuthStore(
      (state) => state.user
    );

  const [name, setName] =
    useState(
      user?.name || ""
    );

  const [
    password,
    setPassword,
  ] = useState("");

  const handleSave = () => {

    toast.success(
      "Profile updated"
    );
  };

  const handlePassword = () => {

    toast.success(
      "Password updated"
    );

    setPassword("");
  };

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your account
        </p>

      </div>

      {/* PROFILE */}

      <div
        className="
          rounded-3xl
          border
          border-slate-800

          bg-slate-900/70

          p-8
        "
      >

        <div className="mb-8 flex items-center gap-4">

          <div
            className="
              rounded-2xl
              bg-violet-500/10

              p-4
            "
          >

            <User className="text-violet-400" />

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Profile Information
            </h2>

            <p className="text-slate-400">
              Update account details
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block text-sm text-slate-400">
              Full Name
            </label>

            <input
              value={name}

              onChange={(e) =>
                setName(
                  e.target.value
                )
              }

              className="
                w-full

                rounded-2xl
                border
                border-slate-700

                bg-slate-950

                px-4
                py-3

                outline-none

                focus:border-violet-500
              "
            />

          </div>

          <div>

            <label className="mb-2 block text-sm text-slate-400">
              Email
            </label>

            <input
              disabled

              value={user?.email}

              className="
                w-full

                rounded-2xl
                border
                border-slate-700

                bg-slate-800

                px-4
                py-3

                text-slate-500
              "
            />

          </div>

          <button
            onClick={handleSave}

            className="
              flex
              items-center
              gap-2

              rounded-2xl

              bg-violet-600

              px-6
              py-3

              font-semibold

              transition

              hover:bg-violet-500
            "
          >

            <Save size={18} />

            Save Changes

          </button>

        </div>

      </div>

      {/* PASSWORD */}

      <div
        className="
          rounded-3xl
          border
          border-slate-800

          bg-slate-900/70

          p-8
        "
      >

        <div className="mb-8 flex items-center gap-4">

          <div
            className="
              rounded-2xl
              bg-emerald-500/10

              p-4
            "
          >

            <Shield className="text-emerald-400" />

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Security
            </h2>

            <p className="text-slate-400">
              Change your password
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <input
            type="password"

            placeholder="New password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            className="
              w-full

              rounded-2xl
              border
              border-slate-700

              bg-slate-950

              px-4
              py-3

              outline-none

              focus:border-violet-500
            "
          />

          <button
            onClick={
              handlePassword
            }

            className="
              rounded-2xl

              bg-emerald-600

              px-6
              py-3

              font-semibold

              transition

              hover:bg-emerald-500
            "
          >
            Update Password
          </button>

        </div>

      </div>

    </div>
  );
}

export default SettingsPage;