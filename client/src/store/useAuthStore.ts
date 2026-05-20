import {
  create,
} from "zustand";

interface User {

  _id: string;

  name: string;

  email: string;

  role: string;
}

interface AuthStore {

  user: User | null;

  token: string | null;

  loading: boolean;

  setAuth: (
    user: User,
    token: string
  ) => void;

  logout: () => void;

  restoreSession: () => void;
}

export const useAuthStore =
  create<AuthStore>((set) => ({

    user: null,

    token: null,

    loading: true,

    // LOGIN

    setAuth: (
      user,
      token
    ) => {

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "token",
        token
      );

      set({
        user,
        token,
        loading: false,
      });
    },

    // LOGOUT

    logout: () => {

      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "token"
      );

      set({
        user: null,
        token: null,
      });
    },

    // RESTORE SESSION

    restoreSession: () => {

      const user =
        localStorage.getItem(
          "user"
        );

      const token =
        localStorage.getItem(
          "token"
        );

      set({

        user:
          user
            ? JSON.parse(user)
            : null,

        token,

        loading: false,
      });
    },
  }));