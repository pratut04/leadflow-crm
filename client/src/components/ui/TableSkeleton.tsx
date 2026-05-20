function TableSkeleton() {

  return (

    <div
      className="
        overflow-hidden

        rounded-3xl
        border
        border-slate-800

        bg-slate-900/70

        backdrop-blur-xl
      "
    >

      {/* HEADER */}

      <div
        className="
          border-b
          border-slate-800

          bg-slate-900

          px-6
          py-5
        "
      >

        <div
          className="
            h-6
            w-40

            animate-pulse

            rounded-xl

            bg-slate-800
          "
        />

      </div>

      {/* ROWS */}

      <div className="divide-y divide-slate-800">

        {[...Array(6)].map(
          (_, index) => (

            <div
              key={index}

              className="
                grid
                grid-cols-5

                gap-6

                px-6
                py-6
              "
            >

              {[...Array(5)].map(
                (_, i) => (

                  <div
                    key={i}

                    className="
                      relative
                      overflow-hidden

                      rounded-xl

                      bg-slate-800

                      h-5
                    "
                  >

                    {/* SHIMMER */}

                    <div
                      className="
                        absolute
                        inset-0

                        -translate-x-full

                        animate-[shimmer_2s_infinite]

                        bg-gradient-to-r

                        from-transparent
                        via-white/10
                        to-transparent
                      "
                    />

                  </div>
                )
              )}

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default TableSkeleton;