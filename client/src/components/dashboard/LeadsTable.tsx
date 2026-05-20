import { useState } from "react";
import StatusBadge from "../ui/StatusBadge";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import EditLeadModal from "./EditLeadModal";

import {
  useNavigate,
} from "react-router-dom";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteLead,
} from "../../services/lead.service";

interface Lead {
  _id: string;

  name: string;

  email: string;

  status: string;

  priority: string;

  source: string;

  createdAt: string;

  assignedTo?: {
    _id: string;
    name: string;
  };
}

interface Props {
  leads: Lead[];
}

function LeadsTable({
  leads,
}: Props) {

  const [openEdit, setOpenEdit] =
    useState(false);

  const [selectedLead, setSelectedLead] =
    useState<any>(null);

  const queryClient =
    useQueryClient();

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    );

  const mutation =
    useMutation({

      mutationFn: deleteLead,

      onSuccess: () => {

        toast.success(
          "Lead deleted"
        );

        queryClient.invalidateQueries({
          queryKey: ["leads"],
        });
      },

      onError: () => {

        toast.error(
          "Failed to delete lead"
        );
      },
    });

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
      overflow-visible
      rounded-3xl
      border
      border-slate-800
      bg-slate-900/70
      backdrop-blur-xl

      shadow-[0_0_50px_rgba(15,23,42,0.4)]
      "
    >

      <div
        className="
          overflow-x-auto

          rounded-3xl
        "
      >

        <table
        className="
          min-w-[1100px]
          w-full
        "
      >

          <thead className="border-b border-slate-800 bg-slate-900">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">
                Priority
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">
                Source
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">
                Assigned To
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">
                Created
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {leads.map((lead, index) => (

              <motion.tr

                initial={{
                  opacity: 0,
                  y: 10,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  duration: 0.25,
                  delay: index * 0.05,
                }}

                key={lead._id}

                onClick={() =>
                  navigate(
                    `/dashboard/leads/${lead._id}`
                  )
                }

                className="
                cursor-pointer

                border-b
                border-slate-800

                transition-all
                duration-300

                hover:bg-slate-800/40
                hover:shadow-[inset_0_0_40px_rgba(139,92,246,0.08)]

                hover:scale-[1.002]
              "
              >

                <td className="px-6 py-5 font-medium">
                  {lead.name}
                </td>

                <td className="px-6 py-5 text-slate-400">
                  {lead.email}
                </td>

                <td className="px-6 py-5">
                  <StatusBadge
                    status={lead.status}
                  />
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold

                        ${lead.priority === "Low"
                        ? "bg-slate-700 text-slate-200"

                        : lead.priority === "Medium"
                          ? "bg-blue-500/20 text-blue-300"

                          : lead.priority === "High"
                            ? "bg-orange-500/20 text-orange-300"

                            : "bg-red-500/20 text-red-300"}
                  `}
                  >

                    {lead.priority}

                  </span>

                </td>

                <td className="px-6 py-5 text-slate-300">
                  {lead.source}
                </td>



                <td className="px-6 py-5 text-slate-300">

                  {lead.assignedTo?.name ||
                    "Unassigned"}

                </td>

                <td className="px-6 py-5 text-slate-400">

                  {new Date(
                    lead.createdAt
                  ).toLocaleDateString()}

                </td>

                <td className="px-6 py-5">

                  <div className="flex gap-3">

                    <button
                      onClick={(e) => {

                        e.stopPropagation();

                        setSelectedLead(
                          lead
                        );

                        setOpenEdit(true);
                      }}

                      className="
                        rounded-xl
                        bg-blue-600/90
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-white

                        transition-all
                        duration-300

                        hover:scale-105
                        hover:bg-blue-500

                        active:scale-[0.98]
                        "
                    >
                      Edit
                    </button>

                    {user.role === "admin" && (

                      <button
                        onClick={(e) => {

                          e.stopPropagation();

                          const confirmed =
                            window.confirm(
                              "Delete this lead?"
                            );

                          if (confirmed) {

                            mutation.mutate(
                              lead._id
                            );
                          }
                        }}

                        className="
                          rounded-xl
                          bg-red-600/90

                          px-4
                          py-2

                          text-sm
                          font-medium
                          text-white

                          transition-all
                          duration-300

                          hover:scale-105
                          hover:bg-red-500

                          active:scale-[0.98]
                        "
                      >

                        Delete

                      </button>

                    )}

                  </div>

                </td>

              </motion.tr>

            ))}

          </tbody>

        </table>

      </div>
      <EditLeadModal
        open={openEdit}

        onClose={() =>
          setOpenEdit(false)
        }

        lead={selectedLead}
      />
    </motion.div>
  );
}

export default LeadsTable;