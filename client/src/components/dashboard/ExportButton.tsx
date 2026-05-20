import { CSVLink } from "react-csv"; 

interface Props {
  leads: any[];
}

function ExportButton({
  leads,
}: Props) {

  return (

    <CSVLink
      data={leads}

      filename="leadflow-leads.csv"

      className="
        rounded-2xl
        bg-violet-600

        px-6
        py-3

        font-semibold
        text-white

        transition-all
        duration-200

        hover:scale-[1.02]
        hover:bg-violet-500

        active:scale-[0.98]
        "
    >
      Export CSV
    </CSVLink>
  );
}

export default ExportButton;