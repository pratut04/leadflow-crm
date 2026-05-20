import { motion } from "framer-motion";

import {
  Inbox,
} from "lucide-react";

function EmptyState() {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.4,
      }}

      className="
        flex
        flex-col
        items-center
        justify-center

        rounded-3xl
        border
        border-slate-800

        bg-slate-900/70

        px-6
        py-20

        text-center

        backdrop-blur-xl
      "
    >

      {/* ICON */}

      <div
        className="
          flex
          h-24
          w-24
          items-center
          justify-center

          rounded-full

          bg-violet-500/10

          shadow-[0_0_40px_rgba(139,92,246,0.18)]
        "
      >

        <Inbox
          className="
            h-16
            w-16
            text-violet-500
          "
        />

      </div>

      {/* TITLE */}

      <h2
        className="
          mt-8

          bg-gradient-to-r
          from-violet-400
          to-fuchsia-500

          bg-clip-text
          text-4xl
          font-bold
          text-transparent
        "
      >
        No Leads Found
      </h2>

      {/* DESCRIPTION */}

      <p
        className="
          mt-4
          max-w-md

          text-lg
          text-slate-400
        "
      >
        Try changing your filters,
        search query, or create a
        new lead to get started.
      </p>

    </motion.div>
  );
}

export default EmptyState;