import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  loginUser,
} from "../../services/auth.service";

import {
  useAuthStore,
} from "../../store/useAuthStore";

function LoginPage() {
  const navigate =
    useNavigate();

  const setAuth =
    useAuthStore(
      (state) => state.setAuth
    );

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data =
        await loginUser(
          email,
          password
        );

      setAuth(
        data.user,
        data.token
      );

      toast.success(
        "Login successful"
      );

      navigate("/dashboard");

    } catch (error: any) {
      toast.error(
        error.response?.data
          ?.message ||
          "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-10 shadow-2xl backdrop-blur-xl"
      >
        <h1 className="mb-2 text-4xl font-bold">
          Welcome Back
        </h1>

        <p className="mb-8 text-slate-400">
          Login to your LeadFlow CRM account
        </p>

        <div className="space-y-5">
          
          <input
            type="email"

            placeholder="Enter email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-violet-500"
          />

          <input
            type="password"

            placeholder="Enter password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-violet-500"
          />

          <button
            type="submit"

            disabled={loading}

            className="w-full rounded-xl bg-violet-600 py-3 font-semibold transition hover:bg-violet-700 disabled:opacity-70"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;