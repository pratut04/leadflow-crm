import React, {
  useEffect,
} from "react";

import ReactDOM from "react-dom/client";

import {
  RouterProvider,
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  Toaster,
} from "react-hot-toast";

import {
  useAuthStore,
} from "./store/useAuthStore";

import { router } from "./routes";

import "./index.css";

const queryClient =
  new QueryClient();

function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {

  const restoreSession =
    useAuthStore(
      (state) =>
        state.restoreSession
    );

  useEffect(() => {

    restoreSession();

  }, []);

  return <>{children}</>;
}

ReactDOM.createRoot(
  document.getElementById(
    "root"
  )!
).render(
  <React.StrictMode>

    <QueryClientProvider
      client={queryClient}
    >

      <AppInitializer>

        <RouterProvider
          router={router}
        />

        <Toaster
          position="top-right"
        />

      </AppInitializer>

    </QueryClientProvider>

  </React.StrictMode>
);