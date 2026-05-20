import {
  useState,
} from "react";

import toast from "react-hot-toast";

import api from "../../services/api";

interface Props {
  open: boolean;

  onClose: () => void;

  refetch: () => void;
}

function CreateUserModal({
  open,
  onClose,
  refetch,
}: Props) {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  if (!open) return null;

  const handleCreate =
    async () => {

      try {

        setLoading(true);

        await api.post(
          "/auth/register",
          {
            name,
            email,
            password,
            role: "sales",
          }
        );

        toast.success(
          "Sales user created"
        );

        refetch();

        onClose();

        setName("");
        setEmail("");
        setPassword("");

      } catch (error: any) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to create user"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/60
        backdrop-blur-sm
      "
    >

      <div
        className="
          w-full
          max-w-md

          rounded-3xl
          border
          border-slate-800

          bg-slate-950

          p-8
        "
      >

        <h2
          className="
            text-3xl
            font-bold
          "
        >
          Create Sales User
        </h2>

        <p
          className="
            mt-2
            text-slate-400
          "
        >
          Add a new sales employee
        </p>

        <div
          className="
            mt-8
            space-y-5
          "
        >

          <input
            type="text"

            placeholder="Name"

            value={name}

            onChange={(e) =>
              setName(
                e.target.value
              )
            }

            className="
              w-full
              rounded-xl
              border
              border-slate-700

              bg-slate-900

              px-4
              py-3

              outline-none

              focus:border-violet-500
            "
          />

          <input
            type="email"

            placeholder="Email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            className="
              w-full
              rounded-xl
              border
              border-slate-700

              bg-slate-900

              px-4
              py-3

              outline-none

              focus:border-violet-500
            "
          />

          <input
            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            className="
              w-full
              rounded-xl
              border
              border-slate-700

              bg-slate-900

              px-4
              py-3

              outline-none

              focus:border-violet-500
            "
          />

        </div>

        <div
          className="
            mt-8
            flex
            justify-end
            gap-4
          "
        >

          <button
            onClick={onClose}

            className="
              rounded-xl
              border
              border-slate-700

              px-5
              py-3

              hover:bg-slate-800
            "
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}

            disabled={loading}

            className="
              rounded-xl

              bg-violet-600

              px-5
              py-3

              font-semibold

              hover:bg-violet-700
            "
          >
            {loading
              ? "Creating..."
              : "Create User"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default CreateUserModal;