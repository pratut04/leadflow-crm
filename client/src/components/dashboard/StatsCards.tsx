import { motion } from "framer-motion";

interface Props {
  stats: {
    totalLeads: number;
    qualifiedLeads: number;
    lostLeads: number;
    contactedLeads: number;
    newLeads: number;
    conversionRate: string;
  };
}

function StatsCards({
  stats,
}: Props) {

  const cards = [

    {
      title: "Total Leads",
      value: stats.totalLeads,
    },

    {
      title: "Qualified",
      value:
        stats.qualifiedLeads,
    },

    {
      title: "Contacted",
      value:
        stats.contactedLeads,
    },

    {
      title: "Lost",
      value: stats.lostLeads,
    },

    {
      title: "Conversion",
      value:
        `${stats.conversionRate}%`,
    },
  ];

  return (

    <div
      className="
        mb-8
        grid
        gap-5

        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-5
      "
    >

      {cards.map((card, index) => (

        <motion.div
          key={card.title}

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
            delay: index * 0.08,
          }}

          whileHover={{
            y: -6,
            scale: 1.02,
          }}

          className="
            rounded-3xl
            border
            border-slate-800/80
            bg-slate-900/70
            p-6
            backdrop-blur-xl

            shadow-[0_0_40px_rgba(139,92,246,0.08)]

            hover:border-violet-500/40
            hover:shadow-[0_0_60px_rgba(139,92,246,0.18)]

            transition-all
            duration-300
          "
        >

          <p className="text-sm text-slate-400">
            {card.title}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            {card.value}
          </h2>

        </motion.div>
      ))}

    </div>
  );
}

export default StatsCards;