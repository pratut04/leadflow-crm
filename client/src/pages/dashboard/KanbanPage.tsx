import {
    DragDropContext,
    Droppable,
    Draggable,
} from "@hello-pangea/dnd";

import {
    useAuthStore,
} from "../../store/useAuthStore";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    updateLeadStatus,
} from "../../services/lead.service";

import toast from "react-hot-toast";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    getLeads,
} from "../../services/lead.service";

const columns = [
    "New",
    "Contacted",
    "Qualified",
    "Lost",
];

function KanbanPage() {

    const queryClient =
        useQueryClient();

    const user =
        useAuthStore(
            (state) => state.user
        );

    const { data } =
        useQuery({

            queryKey: [
                "leads",
                user?.role === "sales"
                    ? (user as any)?.id ||
                    user?._id
                    : ""
            ],

            queryFn: () =>
                getLeads(
                    1,
                    "",
                    "",
                    "",
                    user?.role === "sales"
                        ? (user as any)?.id ||
                        user?._id
                        : ""
                ),
        });

    const leads =
        data?.leads || [];

    const mutation =
        useMutation({

            mutationFn: ({
                id,
                status,
            }: {
                id: string;
                status: string;
            }) =>
                updateLeadStatus(
                    id,
                    status
                ),

            onSuccess: () => {

                toast.success(
                    "Lead moved successfully"
                );
            },

            onSettled: () => {

                setTimeout(() => {

                    queryClient.invalidateQueries({
                        queryKey: ["leads"],
                    });

                }, 300);
            },
            onMutate: async ({
                id,
                status,
            }) => {

                const queryKey = [
                    "leads",
                    user?.role === "sales"
                        ? (user as any)?.id ||
                        user?._id
                        : ""
                ];

                await queryClient.cancelQueries({
                    queryKey,
                });

                const previousLeads =
                    queryClient.getQueryData(
                        queryKey
                    );

                queryClient.setQueryData(
                    queryKey,
                    (old: any) => {

                        if (!old) return old;

                        return {

                            ...old,

                            leads:
                                old.leads.map(
                                    (lead: any) =>

                                        lead._id === id
                                            ? {
                                                ...lead,
                                                status,
                                            }
                                            : lead
                                ),
                        };
                    }
                );

                return {
                    previousLeads,
                };
            },

            onError: (
                _,
                __,
                context
            ) => {
                const queryKey = [
                    "leads",
                    user?.role === "sales"
                        ? (user as any)?.id ||
                        user?._id
                        : ""
                ];

                queryClient.setQueryData(
                    queryKey,
                    context?.previousLeads
                );

                toast.error(
                    "Failed to move lead"
                );
            },
        });



    return (

        <div>

            <div className="mb-10">

                <h1 className="text-4xl font-bold">
                    Sales Pipeline
                </h1>

                <p className="mt-2 text-slate-400">
                    Drag and manage leads visually
                </p>

            </div>

            <DragDropContext
                onDragEnd={(result) => {

                    if (
                        !result.destination
                    ) return;

                    const lead =
                        leads.find(
                            (l: any) =>
                                l._id ===
                                result.draggableId
                        );

                    if (!lead) return;

                    const newStatus =
                        result.destination
                            .droppableId;

                    if (
                        lead.status ===
                        newStatus
                    ) return;

                    mutation.mutate({

                        id: lead._id,

                        status: newStatus,
                    });
                }}
            >

                <div className="overflow-x-auto">

                    <div
                        className="
                        grid
                        min-w-[1200px]
                        gap-6

                        lg:grid-cols-4
                        "
                    >

                        {columns.map(
                            (column) => {

                                let borderColor =
                                    "border-slate-800";

                                let glow =
                                    "";

                                if (
                                    column === "New"
                                ) {

                                    borderColor =
                                        "border-violet-500/30";

                                    glow =
                                        "shadow-violet-500/10";
                                }

                                if (
                                    column === "Contacted"
                                ) {

                                    borderColor =
                                        "border-blue-500/30";

                                    glow =
                                        "shadow-blue-500/10";
                                }

                                if (
                                    column === "Qualified"
                                ) {

                                    borderColor =
                                        "border-emerald-500/30";

                                    glow =
                                        "shadow-emerald-500/10";
                                }

                                if (
                                    column === "Lost"
                                ) {

                                    borderColor =
                                        "border-red-500/30";

                                    glow =
                                        "shadow-red-500/10";
                                }

                                return (

                                    <Droppable
                                        droppableId={column}
                                        key={column}
                                    >

                                        {(
                                            provided,
                                            snapshot
                                        ) => (

                                            <div
                                                ref={
                                                    provided.innerRef
                                                }

                                                {...provided.droppableProps}

                                                className={`
                                                min-h-[500px]
                                                lg:min-h-[700px]
                                                overflow-visible

                                                rounded-3xl
                                                border

                                                ${borderColor}

                                                bg-slate-900/60

                                                p-5
                                                
                                                ${glow}

                                                transition-all
                                                duration-300
                                                `}
                                            >

                                                <div
                                                    className="
                                                        mb-5
                                                        flex
                                                        items-center
                                                        justify-between
                                                    "
                                                >

                                                    <h2
                                                        className="
                                                        text-xl
                                                        font-bold
                                                        "
                                                    >
                                                        {column}
                                                    </h2>

                                                    <div
                                                        className="
                                                        rounded-full

                                                        bg-violet-500/20

                                                        px-3
                                                        py-1

                                                        text-sm
                                                        text-violet-300
                                                        "
                                                    >

                                                        {
                                                            leads.filter(
                                                                (
                                                                    lead: any
                                                                ) =>
                                                                    lead.status ===
                                                                    column
                                                            ).length
                                                        }

                                                    </div>

                                                </div>

                                                <div className="space-y-4">

                                                    {leads
                                                        .filter(
                                                            (
                                                                lead: any
                                                            ) =>
                                                                lead.status ===
                                                                column
                                                        )
                                                        .map(
                                                            (
                                                                lead: any,
                                                                index: number
                                                            ) => (

                                                                <Draggable
                                                                    key={lead._id}

                                                                    draggableId={
                                                                        lead._id
                                                                    }

                                                                    index={
                                                                        index
                                                                    }
                                                                >

                                                                    {(
                                                                        provided,
                                                                        snapshot
                                                                    ) => (

                                                                        <div
                                                                            ref={
                                                                                provided.innerRef
                                                                            }

                                                                            {...provided.draggableProps}

                                                                            {...provided.dragHandleProps}

                                                                            style={{
                                                                                ...provided.draggableProps.style,

                                                                                zIndex:
                                                                                    snapshot.isDragging
                                                                                        ? 99999
                                                                                        : "auto",


                                                                            }}

                                                                            className={`
                                                                           
                                                                            relative
                                                                            cursor-grab

                                                                            active:cursor-grabbing

                                                                            rounded-2xl
                                                                            border
                                                                            border-slate-800

                                                                            p-5

                                                                            transition-all
                                                                            duration-300

                                                                            ${snapshot.isDragging
                                                                                    ? `
                                                                                    
                                                                                    border-violet-500
                                                                                    bg-slate-900
                                                                                    shadow-[0_20px_80px_rgba(139,92,246,0.35)]
                                                                                `
                                                                                    : `
                                                                                    bg-slate-950/90
                                                                                    
                                                                                    hover:border-violet-500/30
                                                                                    hover:bg-slate-900
                                                                                    hover:shadow-[0_10px_40px_rgba(139,92,246,0.15)]
                                                                                `
                                                                                }
                                                                            `}
                                                                        >

                                                                            <h3
                                                                                className="
                                                                            font-semibold
                                                                            text-white
                                                                            "
                                                                            >
                                                                                {lead.name}
                                                                            </h3>

                                                                            <p
                                                                                className="
                                                                            mt-2
                                                                            text-sm
                                                                            text-slate-400
                                                                            "
                                                                            >
                                                                                {lead.email}
                                                                            </p>

                                                                            <div
                                                                                className="
                                                                                mt-4

                                                                                inline-flex

                                                                                rounded-full

                                                                                bg-violet-500/20

                                                                                px-3
                                                                                py-1

                                                                                text-xs
                                                                                text-violet-300
                                                                                "
                                                                            >

                                                                                {
                                                                                    lead.source
                                                                                }

                                                                            </div>

                                                                            <div className="mt-3 flex gap-2">

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

                                                                            </div>

                                                                        </div>
                                                                    )}

                                                                </Draggable>
                                                            )
                                                        )}

                                                    {
                                                        provided.placeholder
                                                    }

                                                </div>

                                            </div>
                                        )}

                                    </Droppable>

                                );
                            }
                        )}

                    </div>

                </div>

            </DragDropContext>

        </div>
    );
}

export default KanbanPage;