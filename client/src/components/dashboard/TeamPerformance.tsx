type Props = {
  performance: any[];
};

function TeamPerformance({
  performance,
}: Props) {

  const topPerformer =
    [...performance].sort(
      (a, b) =>

        Number(
          b.conversionRate
        ) -

        Number(
          a.conversionRate
        )
    )[0];

  return (

    <div
      className="
        rounded-3xl
        border
        border-slate-800

        bg-slate-900/60

        p-8
      "
    >

      <div
        className="
          mb-8

          flex
          items-center
          justify-between
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Team Performance
          </h2>

          <p
            className="
              mt-1
              text-slate-400
            "
          >
            Sales employee rankings
          </p>

        </div>

        {topPerformer && (

          <div
            className="
              rounded-2xl

              bg-violet-600/20

              px-5
              py-3
            "
          >

            <p
              className="
                text-sm
                text-slate-300
              "
            >
              Top Performer
            </p>

            <h3
              className="
                text-lg
                font-bold
                text-violet-300
              "
            >
              {
                topPerformer.name
              }
            </h3>

          </div>

        )}

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr
              className="
                border-b
                border-slate-800
              "
            >

              <th className="pb-4 text-left">
                Employee
              </th>

              <th className="pb-4 text-left">
                Assigned
              </th>

              <th className="pb-4 text-left">
                Qualified
              </th>

              <th className="pb-4 text-left">
                Lost
              </th>

              <th className="pb-4 text-left">
                Conversion %
              </th>

            </tr>

          </thead>

          <tbody>

            {performance.map(
              (employee) => (

                <tr
                  key={
                    employee.name
                  }

                  className="
                    border-b
                    border-slate-800/50
                  "
                >

                  <td className="py-5 font-medium">
                    {
                      employee.name
                    }
                  </td>

                  <td className="py-5">
                    {
                      employee.assigned
                    }
                  </td>

                  <td className="py-5 text-emerald-400">
                    {
                      employee.qualified
                    }
                  </td>

                  <td className="py-5 text-red-400">
                    {
                      employee.lost
                    }
                  </td>

                  <td className="py-5">

                    <span
                      className="
                        rounded-full

                        bg-violet-600/20

                        px-3
                        py-1

                        text-sm
                        text-violet-300
                      "
                    >
                      {
                        employee.conversionRate
                      }%
                    </span>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default TeamPerformance;