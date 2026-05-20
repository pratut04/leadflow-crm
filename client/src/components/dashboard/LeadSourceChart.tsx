import {

    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,

} from "recharts";

interface Props {

    leads: any[];
}

function LeadSourceChart({
    leads,
}: Props) {

    const sourceMap: any = {};

    leads.forEach((lead) => {

        sourceMap[
            lead.source
        ] =
            (sourceMap[
                lead.source
            ] || 0) + 1;
    });

    const data =
        Object.keys(sourceMap).map(
            (key) => ({

                source: key,

                count:
                    sourceMap[key],
            })
        );

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

            <h2 className="mb-6 text-xl font-bold">
                Lead Sources
            </h2>

            <div className="h-[320px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={data}
                    >

                        <XAxis
                            dataKey="source"
                        />

                        <YAxis />

                        <Tooltip

                            cursor={{
                                fill:
                                    "rgba(139,92,246,0.08)",
                            }}

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

                        <Bar
                            dataKey="count"
                            radius={[
                                10,
                                10,
                                0,
                                0,
                            ]}
                            fill="#8B5CF6"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default LeadSourceChart;