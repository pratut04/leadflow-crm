import { useParams } from "react-router-dom";

import { toast } from "react-hot-toast";
import {
    useQuery,
} from "@tanstack/react-query";



import {
    useAuthStore,
} from "../../store/useAuthStore";

import {
    useState,
    useEffect,
} from "react";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    addLeadNote,
    assignLead,
    getSalesUsers,
    updateLead,
    deleteLeadNote,
} from "../../services/lead.service";

import {
    Mail,
    User,
    Calendar,
    Activity,
    MessageSquare,
    RefreshCcw,
    Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import StatusBadge from "../../components/ui/StatusBadge";

import {
    getLeadById,
} from "../../services/lead.service";

function LeadDetailsPage() {


    const [
        showAllActivities,
        setShowAllActivities,
    ] = useState(false);

    const { id } =
        useParams();

    const {
        data,
        isLoading,
    } = useQuery({

        queryKey: [
            "lead",
            id,
        ],

        queryFn: () =>
            getLeadById(id || ""),
    });

    const [note, setNote] =
        useState("");

    const [
        followUpDate,
        setFollowUpDate,
    ] = useState("");

    const [
        followUpNote,
        setFollowUpNote,
    ] = useState("");

    const queryClient =
        useQueryClient();

    const salesUsersQuery =
        useQuery({

            queryKey: ["sales-users"],

            queryFn:
                getSalesUsers,
        });

    const assignMutation =
        useMutation({

            mutationFn: ({
                id,
                assignedTo,
            }: any) =>

                assignLead(
                    id,
                    assignedTo
                ),

            onSuccess: () => {

                toast.success(
                    "Lead assigned"
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "lead",
                        id,
                    ],
                });
            },
        });

    const addNoteMutation =
        useMutation({

            mutationFn: (
                text: string
            ) =>
                addLeadNote(
                    id || "",
                    text
                ),

            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey: [
                        "lead",
                        id,
                    ],
                });

                setNote("");
            },
        });

    const followUpMutation =
        useMutation({

            mutationFn: () =>
                updateLead(
                    lead._id,
                    {
                        ...lead,

                        followUpDate,

                        followUpNote,
                    }
                ),

            onSuccess: () => {

                toast.success(
                    "Follow-up saved"
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "lead",
                        id,
                    ],
                });
            },
        });
    const deleteNoteMutation =
        useMutation({

            mutationFn: (
                noteId: string
            ) =>
                deleteLeadNote(
                    lead._id,
                    noteId
                ),

            onSuccess: () => {

                toast.success(
                    "Note deleted"
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "lead",
                        id,
                    ],
                });
            },
        });

    const lead =
        data?.lead;

    const user =
        useAuthStore(
            (state) => state.user
        );

    useEffect(() => {

        if (lead) {

            setFollowUpDate(

                lead.followUpDate
                    ? new Date(
                        lead.followUpDate
                    )
                        .toISOString()
                        .slice(0, 16)

                    : ""
            );

            setFollowUpNote(
                lead.followUpNote || ""
            );
        }

    }, [lead]);

    if (isLoading) {

        return (

            <div
                className="
          flex
          items-center
          justify-center

          py-20
        "
            >

                <div
                    className="
            h-14
            w-14

            rounded-full
            border-4
            border-violet-500
            border-t-transparent

            animate-spin
          "
                />

            </div>
        );
    }

    if (!lead) {

        return (
            <div className="text-red-500">
                Lead not found
            </div>
        );
    }

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
                duration: 0.3,
            }}

            className="space-y-8"
        >

            {/* HEADER */}

            <motion.div

                initial={{
                    scale: 0.98,
                    opacity: 0,
                }}

                animate={{
                    scale: 1,
                    opacity: 1,
                }}

                transition={{
                    duration: 0.25,
                }}

                className="
          max-w-5xl

          rounded-3xl
          border
          border-slate-800

          bg-slate-900/70

          p-8

          backdrop-blur-xl

          transition-all
          duration-300

          hover:border-violet-500/30

          hover:shadow-[0_0_40px_rgba(139,92,246,0.08)]
        "
            >

                <div className="flex items-center gap-5">

                    <div
                        className="
              flex
              h-20
              w-20
              items-center
              justify-center

              rounded-full

              bg-gradient-to-br
              from-violet-500
              to-fuchsia-500

              text-3xl
              font-bold

              shadow-[0_0_40px_rgba(139,92,246,0.35)]
            "
                    >
                        {lead.name[0]}
                    </div>

                    <div>

                        <h1 className="text-4xl font-bold">
                            {lead.name}
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Lead Profile Details
                        </p>

                    </div>

                </div>

            </motion.div>

            {/* INFO GRID */}

            <div className="grid gap-8 lg:grid-cols-3">

                {/* LEFT */}

                <div className="space-y-6 lg:col-span-2">

                    {/* BASIC INFO */}

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
                            delay: 0.1,
                        }}

                        className="
              rounded-3xl
              border
              border-slate-800

              bg-slate-900/70

              p-8

              backdrop-blur-xl

              transition-all
              duration-300

              hover:border-violet-500/30

              hover:shadow-[0_0_40px_rgba(139,92,246,0.08)]
            "
                    >

                        <h2 className="mb-6 text-2xl font-bold">
                            Lead Information
                        </h2>

                        <div className="space-y-6">

                            <div className="flex items-center gap-4">

                                <div
                                    className="
                    rounded-2xl
                    bg-violet-500/10
                    p-3
                  "
                                >
                                    <User className="text-violet-400" />
                                </div>

                                <div>

                                    <p className="text-sm text-slate-400">
                                        Full Name
                                    </p>

                                    <h3 className="font-semibold">
                                        {lead.name}
                                    </h3>

                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <div
                                    className="
                    rounded-2xl
                    bg-violet-500/10
                    p-3
                  "
                                >
                                    <Mail className="text-violet-400" />
                                </div>

                                <div>

                                    <p className="text-sm text-slate-400">
                                        Email Address
                                    </p>

                                    <h3 className="font-semibold">
                                        {lead.email}
                                    </h3>

                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <div
                                    className="
                    rounded-2xl
                    bg-violet-500/10
                    p-3
                  "
                                >
                                    <Activity className="text-violet-400" />
                                </div>

                                <div>

                                    <p className="text-sm text-slate-400">
                                        Status
                                    </p>

                                    <div className="mt-2">
                                        <StatusBadge
                                            status={lead.status}
                                        />
                                    </div>

                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <div
                                    className="
                    rounded-2xl
                    bg-violet-500/10
                    p-3
                  "
                                >
                                    <Calendar className="text-violet-400" />
                                </div>

                                <div>

                                    <p className="text-sm text-slate-400">
                                        Created At
                                    </p>

                                    <h3 className="font-semibold">
                                        {new Date(
                                            lead.createdAt
                                        ).toLocaleDateString()}
                                    </h3>

                                </div>

                            </div>

                        </div>

                    </motion.div>

                    {/* NOTES */}

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
                            delay: 0.2,
                        }}

                        className="
    rounded-3xl
    border
    border-slate-800

    bg-slate-900/70

    p-8

    backdrop-blur-xl

    transition-all
    duration-300

    hover:border-violet-500/30

    hover:shadow-[0_0_40px_rgba(139,92,246,0.08)]
  "
                    >

                        <h2 className="mb-5 text-2xl font-bold">
                            Notes
                        </h2>

                        <textarea
                            rows={8}

                            value={note}

                            onChange={(e) =>
                                setNote(
                                    e.target.value
                                )
                            }

                            placeholder="Add lead notes..."

                            className="
      w-full

      rounded-2xl
      border
      border-slate-700

      bg-slate-950

      p-5

      outline-none

      transition-all
      duration-200

      focus:border-violet-500
    "
                        />

                        <button

                            onClick={() =>
                                addNoteMutation.mutate(
                                    note
                                )
                            }

                            disabled={
                                !note.trim()
                            }

                            className="
      mt-5

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

      disabled:opacity-50
    "
                        >

                            {addNoteMutation.isPending
                                ? "Saving..."
                                : "Save Note"}

                        </button>

                        {/* NOTES HISTORY */}

                        <div className="mt-8 space-y-4">

                            {lead.notes?.map(
                                (
                                    note: any,
                                    index: number
                                ) => (

                                    <div
                                        key={index}

                                        className="
            rounded-2xl
            border
            border-slate-800

            bg-slate-950/60

            p-5
          "
                                    >
                                        {user?.role === "admin" && (

                                            <button
                                                onClick={() =>
                                                    deleteNoteMutation.mutate(
                                                        note._id
                                                    )
                                                }

                                                className="
            mb-3
            text-sm
            text-red-400

            hover:text-red-300
        "
                                            >
                                                Delete
                                            </button>
                                        )}
                                        <p className="text-slate-200">
                                            {note.text}
                                        </p>

                                        <p className="mt-3 text-xs text-slate-500">

                                            {new Date(
                                                note.createdAt
                                            ).toLocaleString()}

                                        </p>

                                    </div>
                                )
                            )}

                        </div>

                    </motion.div>


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
                            delay: 0.3,
                        }}

                        className="
        mt-8

        rounded-3xl
        border
        border-slate-800

        bg-slate-900/70

        p-8

        backdrop-blur-xl
    "
                    >

                        <h2 className="mb-5 text-2xl font-bold">
                            Follow-Up Reminder
                        </h2>

                        <div className="space-y-5">

                            <input
                                type="datetime-local"

                                value={followUpDate}

                                onChange={(e) =>
                                    setFollowUpDate(
                                        e.target.value
                                    )
                                }

                                className="
                w-full

                rounded-2xl
                border
                border-slate-700

                bg-slate-950

                px-4
                py-3
                text-white

                [color-scheme:dark]
                outline-none

                focus:border-violet-500
            "
                            />

                            <textarea
                                rows={4}

                                value={followUpNote}

                                onChange={(e) =>
                                    setFollowUpNote(
                                        e.target.value
                                    )
                                }

                                placeholder="
                Reminder note...
            "

                                className="
                w-full

                rounded-2xl
                border
                border-slate-700

                bg-slate-950

                px-4
                py-3

                outline-none

                focus:border-violet-500
            "
                            />

                            <button

                                onClick={() =>
                                    followUpMutation.mutate()
                                }

                                className="
                rounded-2xl

                bg-violet-600

                px-6
                py-3

                font-semibold

                transition-all

                hover:bg-violet-500
            "
                            >
                                Save Follow-Up
                            </button>

                        </div>

                    </motion.div>
                </div>


                {/* RIGHT */}

                <div className="space-y-6">

                    {/* ASSIGN LEAD */}

                    {
                        user?.role === "admin" && (
                            <div
                                className="
                                rounded-3xl
                                border
                                border-slate-800

                                bg-slate-900/60

                                p-6
                            "
                            >

                                <h3
                                    className="
                                    mb-4
                                    text-lg
                                    font-semibold
                                    "
                                >
                                    Assign Lead
                                </h3>

                                <select

                                    onChange={(e) =>
                                        assignMutation.mutate({

                                            id: lead._id,

                                            assignedTo:
                                                e.target.value,
                                        })
                                    }

                                    defaultValue={
                                        lead.assignedTo?._id || ""
                                    }

                                    className="
                                        w-full

                                        rounded-2xl
                                        border
                                        border-slate-700

                                        bg-slate-950

                                        px-4
                                        py-3

                                        outline-none

                                        focus:border-violet-500
                                        "
                                >

                                    <option value="">
                                        Unassigned
                                    </option>

                                    {salesUsersQuery.data?.users?.map(
                                        (user: any) => (

                                            <option
                                                key={user._id}
                                                value={user._id}
                                            >
                                                {user.name}
                                            </option>
                                        )
                                    )}

                                </select>

                            </div>
                        )
                    }

                    {/* ANALYTICS */}

                    <motion.div

                        initial={{
                            opacity: 0,
                            x: 20,
                        }}

                        animate={{
                            opacity: 1,
                            x: 0,
                        }}

                        transition={{
                            delay: 0.15,
                        }}

                        className="
              rounded-3xl
              border
              border-slate-800

              bg-slate-900/70

              p-8

              backdrop-blur-xl

              transition-all
              duration-300

              hover:border-violet-500/30

              hover:shadow-[0_0_40px_rgba(139,92,246,0.08)]
            "
                    >

                        <h2 className="mb-6 text-2xl font-bold">
                            Lead Analytics
                        </h2>

                        <div className="space-y-4">

                            <div
                                className="
                  rounded-2xl

                  bg-violet-500/10

                  p-5

                  transition-all
                  duration-300

                  hover:bg-violet-500/20
                "
                            >

                                <p className="text-sm text-slate-400">
                                    Lead Source
                                </p>

                                <h3 className="mt-2 text-xl font-bold">
                                    {lead.source}
                                </h3>

                            </div>

                            <div
                                className="
                  rounded-2xl

                  bg-emerald-500/10

                  p-5

                  transition-all
                  duration-300

                  hover:bg-emerald-500/20
                "
                            >

                                <p className="text-sm text-slate-400">
                                    Current Status
                                </p>

                                <div className="mt-3">
                                    <StatusBadge
                                        status={lead.status}
                                    />
                                </div>

                            </div>

                        </div>

                    </motion.div>

                    {/* ACTIVITY */}

                    <motion.div

                        initial={{
                            opacity: 0,
                            x: 20,
                        }}

                        animate={{
                            opacity: 1,
                            x: 0,
                        }}

                        transition={{
                            delay: 0.25,
                        }}

                        className="
              rounded-3xl
              border
              border-slate-800

              bg-slate-900/70

              p-8

              backdrop-blur-xl

              transition-all
              duration-300

              hover:border-violet-500/30

              hover:shadow-[0_0_40px_rgba(139,92,246,0.08)]
            "
                    >

                        <h2 className="mb-6 text-2xl font-bold">
                            Activity Timeline
                        </h2>
                        <div className="relative">

                            {/* VERTICAL LINE */}

                            <div
                                className="
      absolute
      left-5
      top-0

      h-full
      w-px

      bg-gradient-to-b
      from-violet-500
      via-slate-700
      to-transparent
    "
                            />

                            <div className="space-y-8">

                                {lead.activities
                                    ?.slice()
                                    .slice(
                                        0,
                                        showAllActivities
                                            ? lead.activities.length
                                            : 5
                                    )
                                    .map(
                                        (
                                            activity: any,
                                            index: number
                                        ) => {

                                            let Icon =
                                                Activity;

                                            let glow =
                                                "shadow-violet-500/20";

                                            let bg =
                                                "bg-violet-500";

                                            // TYPES

                                            if (
                                                activity.type ===
                                                "note"
                                            ) {

                                                Icon =
                                                    MessageSquare;

                                                bg =
                                                    "bg-blue-500";

                                                glow =
                                                    "shadow-blue-500/20";
                                            }

                                            if (
                                                activity.type ===
                                                "status"
                                            ) {

                                                Icon =
                                                    RefreshCcw;

                                                bg =
                                                    "bg-emerald-500";

                                                glow =
                                                    "shadow-emerald-500/20";
                                            }

                                            if (
                                                activity.type ===
                                                "source"
                                            ) {

                                                Icon =
                                                    Sparkles;

                                                bg =
                                                    "bg-yellow-500";

                                                glow =
                                                    "shadow-yellow-500/20";
                                            }

                                            return (

                                                <motion.div

                                                    key={index}

                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                    }}

                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}

                                                    transition={{
                                                        delay:
                                                            index * 0.08,
                                                    }}

                                                    className="
                relative

                flex
                gap-5
              "
                                                >

                                                    {/* ICON */}

                                                    <div
                                                        className={`
                  relative
                  z-10

                  flex
                  h-10
                  w-10

                  items-center
                  justify-center

                  rounded-full

                  ${bg}

                  shadow-lg
                  ${glow}
                `}
                                                    >

                                                        <Icon
                                                            size={18}
                                                            className="text-white"
                                                        />

                                                    </div>

                                                    {/* CARD */}

                                                    <div
                                                        className="
                  flex-1

                  rounded-2xl
                  border
                  border-slate-800

                  bg-slate-950/60

                  p-5

                  transition-all
                  duration-300

                  hover:border-violet-500/30
                  hover:bg-slate-900
                "
                                                    >

                                                        <p
                                                            className="
                    text-base
                    font-medium
                    text-slate-100
                  "
                                                        >
                                                            {activity.message}
                                                        </p>

                                                        <p
                                                            className="
                    mt-2
                    text-sm
                    text-slate-500
                  "
                                                        >

                                                            {new Date(
                                                                activity.createdAt
                                                            ).toLocaleString()}

                                                        </p>

                                                    </div>

                                                </motion.div>
                                            );
                                        }
                                    )}

                            </div>

                        </div>

                        {lead.activities?.length > 5 && (

                            <button
                                onClick={() =>
                                    setShowAllActivities(
                                        !showAllActivities
                                    )
                                }

                                className="
                                    mt-6

                                    text-sm
                                    font-medium

                                    text-violet-400

                                    transition
                                    duration-200

                                    hover:text-violet-300
                                "
                            >

                                {showAllActivities
                                    ? "Show Less"
                                    : "View All Activities"}

                            </button>
                        )}
                    </motion.div>

                </div>

            </div>

        </motion.div>
    );
}

export default LeadDetailsPage;