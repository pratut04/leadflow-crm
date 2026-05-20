import {
    useState,
    useEffect,
} from "react";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    updateLead,
} from "../../services/lead.service";

interface Props {
    open: boolean;

    onClose: () => void;

    lead: any;
}

function EditLeadModal({
    open,
    onClose,
    lead,
}: Props) {

    const queryClient =
        useQueryClient();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [status, setStatus] =
        useState("New");

    const [source, setSource] =
        useState("Website");

    const [priority, setPriority] =
        useState("Medium");

    useEffect(() => {

        if (lead) {

            setName(lead.name);

            setEmail(lead.email);

            setStatus(lead.status);

            setSource(lead.source);

            setPriority(
                lead.priority ||
                "Medium"
            );
        }

    }, [lead]);

    const mutation =
        useMutation({

            mutationFn: () =>
                updateLead(
                    lead._id,
                    {
                        name,
                        email,
                        status,
                        source,
                        priority,
                    }
                ),

            onSuccess: () => {

                toast.success(
                    "Lead updated"
                );

                queryClient.invalidateQueries({
                    queryKey: ["leads"],
                });

                onClose();
            },

            onError: () => {

                toast.error(
                    "Failed to update lead"
                );
            },
        });

    if (!open) return null;

    return (
        <motion.div

            initial={{
                opacity: 0,
            }}

            animate={{
                opacity: 1,
            }}

            exit={{
                opacity: 0,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <motion.div

                initial={{
                    scale: 0.9,
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
                w-full
                max-w-xl
                rounded-3xl
                border
                border-slate-800

                bg-slate-900
                p-8

                shadow-[0_0_60px_rgba(139,92,246,0.18)]
            "
            >

                <div className="mb-8 flex items-center justify-between">

                    <h2 className="text-3xl font-bold text-white">
                        Edit Lead
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-slate-400"
                    >
                        ×
                    </button>

                </div>

                <div className="space-y-5">

                    <input
                        type="text"

                        value={name}

                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }

                        placeholder="Name"

                        className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-4 text-white outline-none"
                    />

                    <input
                        type="email"

                        value={email}

                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }

                        placeholder="Email"

                        className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-4 text-white outline-none"
                    />

                    <select
                        value={status}

                        onChange={(e) =>
                            setStatus(
                                e.target.value
                            )
                        }

                        className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-4 text-white outline-none"
                    >
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Qualified</option>
                        <option>Lost</option>
                    </select>

                    <select
                        value={source}

                        onChange={(e) =>
                            setSource(
                                e.target.value
                            )
                        }

                        className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-4 text-white outline-none"
                    >
                        <option>Website</option>
                        <option>Instagram</option>
                        <option>Referral</option>
                        <option>Facebook</option>
                    </select>


                    <select
                        value={priority}

                        onChange={(e) =>
                            setPriority(
                                e.target.value
                            )
                        }

                        className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-700
                        bg-slate-800
                        px-4
                        py-4
                        text-white
                        outline-none
                    "
                    >

                        <option>
                            Low
                        </option>

                        <option>
                            Medium
                        </option>

                        <option>
                            High
                        </option>

                        <option>
                            Hot
                        </option>

                    </select>
                    <button
                        onClick={() =>
                            mutation.mutate()
                        }

                        className="w-full rounded-2xl bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-500"
                    >
                        Update Lead
                    </button>

                </div>

            </motion.div>

        </motion.div>
    );
}

export default EditLeadModal;