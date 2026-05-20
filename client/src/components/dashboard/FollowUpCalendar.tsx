import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

type Props = {
  leads: any[];
};

function FollowUpCalendar({
  leads,
}: Props) {

  const getLeadsByDate =
    (date: Date) => {

      return leads.filter(
        (lead: any) => {

          if (
            !lead.followUpDate
          ) {
            return false;
          }

          const followUp =
            new Date(
              lead.followUpDate
            );

          return (
            followUp.toDateString() ===
            date.toDateString()
          );
        }
      );
    };

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

      <div className="mb-6">

        <h2
          className="
            text-2xl
            font-bold
          "
        >
          Follow-Up Calendar
        </h2>

        <p
          className="
            mt-1
            text-slate-400
          "
        >
          Visual reminder scheduling
        </p>

      </div>

      <Calendar

        tileContent={({
          date,
          view,
        }) => {

          if (
            view !== "month"
          ) {
            return null;
          }

          const dayLeads =
            getLeadsByDate(
              date
            );

          if (
            dayLeads.length === 0
          ) {
            return null;
          }

          return (

            <div
              className="
                mt-1

                flex
                justify-center
              "
            >

              <div
                className="
                  h-2
                  w-2

                  rounded-full

                  bg-violet-500
                "
              />

            </div>
          );
        }}
      />

      <div className="mt-8 space-y-4">

        {leads
          .filter(
            (lead: any) =>
              lead.followUpDate
          )
          .slice(0, 5)
          .map((lead: any) => (

            <div
              key={lead._id}

              className="
                rounded-2xl

                border
                border-slate-800

                bg-slate-950/50

                p-4
              "
            >

              <h3 className="font-semibold">
                {lead.name}
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-400
                "
              >
                {
                  lead.followUpNote
                }
              </p>

              <p
                className="
                  mt-2
                  text-xs
                  text-violet-400
                "
              >
                {new Date(
                  lead.followUpDate
                ).toLocaleString()}
              </p>

            </div>
          ))}

      </div>

    </div>
  );
}

export default FollowUpCalendar;