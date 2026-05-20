import {
    useState,
} from "react";

import { motion } from "framer-motion";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
    createLead,
} from "../../services/lead.service";

interface Props {
    open: boolean;
    onClose: () => void;
}

function CreateLeadModal({
    open,
    onClose,
}: Props) {
    const queryClient =
        useQueryClient();

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            status: "New",
            source: "Website",
            priority: "Medium",
        });

    const mutation = useMutation({
        mutationFn: createLead,

        onSuccess: () => {
            toast.success(
                "Lead created successfully"
            );

            queryClient.invalidateQueries({
                queryKey: ["leads"],
            });

            onClose();

            setFormData({
                name: "",
                email: "",
                status: "New",
                source: "Website",
                priority: "Medium",
            });
        },

        onError: () => {
            toast.error(
                "Failed to create lead"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">

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
                        max-w-lg
                        rounded-3xl
                        border
                        border-slate-800

                        bg-slate-900
                        p-8

                        shadow-[0_0_60px_rgba(139,92,246,0.18)]
                    "
            >

                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">
                        Create Lead
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        mutation.mutate(
                            formData
                        );
                    }}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        placeholder="Lead name"

                        value={formData.name}

                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name:
                                    e.target.value,
                            })
                        }

                        className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
                    />

                    <input
                        type="email"
                        placeholder="Lead email"

                        value={formData.email}

                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email:
                                    e.target.value,
                            })
                        }

                        className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
                    />

                    <select
                        value={formData.status}

                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                status:
                                    e.target.value,
                            })
                        }

                        className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
                    >
                        <option>
                            New
                        </option>

                        <option>
                            Qualified
                        </option>

                        <option>
                            Contacted
                        </option>

                        <option>
                            Lost
                        </option>
                    </select>

                    <select
                        value={formData.source}

                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                source:
                                    e.target.value,
                            })
                        }

                        className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
                    >
                        <option>
                            Website
                        </option>

                        <option>
                            Instagram
                        </option>

                        <option>
                            Referral
                        </option>

                        <option>
                            Facebook
                        </option>
                    </select>


                    <select
                        value={formData.priority}

                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                priority:
                                    e.target.value,
                            })
                        }

                        className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-700
                        bg-slate-800
                        px-4
                        py-3
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
                        type="submit"

                        disabled={
                            mutation.isPending
                        }

                        className="w-full rounded-2xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-500"
                    >
                        {mutation.isPending
                            ? "Creating..."
                            : "Create Lead"}
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );

}

export default CreateLeadModal;