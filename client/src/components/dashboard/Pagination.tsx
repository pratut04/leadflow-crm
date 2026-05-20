interface Props {

  currentPage: number;

  totalPages: number;

  onPageChange: (
    page: number
  ) => void;
}

function Pagination({

  currentPage,
  totalPages,
  onPageChange,

}: Props) {

  return (

    <div className="mt-8 flex items-center justify-center gap-3">

      <button

        disabled={
          currentPage === 1
        }

        onClick={() =>
          onPageChange(
            currentPage - 1
          )
        }

        className="
            rounded-xl
            border
            border-slate-700

            px-4
            py-2

            transition-all
            duration-200

            hover:scale-[1.02]

            active:scale-[0.98]

            disabled:opacity-50
            "
      >
        Previous
      </button>

      {[...Array(totalPages)].map(
        (_, index) => (

          <button
            key={index}

            onClick={() =>
              onPageChange(
                index + 1
              )
            }

            className={`

          h-10
          w-10

          rounded-xl

          transition-all
          duration-200

          hover:scale-[1.02]

          active:scale-[0.98]

          ${currentPage ===
                index + 1
                ? "bg-violet-600"
                : "border border-slate-700"
              }`}
          >
            {index + 1}
          </button>
        )
      )}

      <button

        disabled={
          currentPage ===
          totalPages
        }

        onClick={() =>
          onPageChange(
            currentPage + 1
          )
        }

        className="
        rounded-xl
        border
        border-slate-700

        px-4
        py-2

        transition-all
        duration-200

        hover:scale-[1.02]

        active:scale-[0.98]

        disabled:opacity-50
        "
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;