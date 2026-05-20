interface Props {
  leads: any[];
}

function RecentActivity({
  leads,
}: Props) {

  return (

    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

      <h2 className="mb-6 text-xl font-bold">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {leads.map(
          (lead: any) => (

            <div
              key={lead._id}

              className="flex items-start gap-4"
            >

              <div className="mt-2 h-3 w-3 rounded-full bg-violet-500" />

              <div>

                <p className="font-medium">
                  {lead.name}
                </p>

                <p className="text-sm text-slate-400">
                  Status updated to{" "}
                  {lead.status}
                </p>

                <p className="mt-1 text-xs text-slate-500">

                  {new Date(
                    lead.createdAt
                  ).toLocaleString()}

                </p>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default RecentActivity;