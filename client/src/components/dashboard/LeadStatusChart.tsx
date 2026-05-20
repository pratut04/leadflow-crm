import {

    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,

} from "recharts";

interface Props {

    stats: {
        newLeads: number;
        contactedLeads: number;
        qualifiedLeads: number;
        lostLeads: number;
    };
}

function LeadStatusChart({
    stats,
}: Props) {

    const data = [

        {
            name: "New",
            value: stats.newLeads,
        },

        {
            name: "Contacted",
            value:
                stats.contactedLeads,
        },

        {
            name: "Qualified",
            value:
                stats.qualifiedLeads,
        },

        {
            name: "Lost",
            value: stats.lostLeads,
        },
    ];

    const COLORS = [
        "#3B82F6",
        "#EAB308",
        "#22C55E",
        "#EF4444",
    ];

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

            <h2 className="mb-6 text-xl font-bold">
                Lead Status Analytics
            </h2>

            <div className="h-[320px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <PieChart>

                        <Pie
                            data={data}

                            dataKey="value"

                            nameKey="name"

                            outerRadius={110}
                        >

                            {data.map(
                                (_, index) => (

                                    <Cell
                                        key={index}

                                        fill={
                                            COLORS[index]
                                        }
                                    />
                                )
                            )}

                        </Pie>

                        <Tooltip

                            contentStyle={{

                                backgroundColor:
                                    "#0f172a",

                                border:
                                    "1px solid #334155",

                                borderRadius: "16px",

                                color: "#fff",

                                boxShadow:
                                    "0 0 30px rgba(0,0,0,0.35)",
                            }}

                            itemStyle={{
                                color: "#fff",
                            }}

                            labelStyle={{
                                color: "#cbd5e1",
                            }}
                        />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default LeadStatusChart;