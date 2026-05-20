import {
    Request,
    Response,
} from "express";

import Lead from "../models/lead.model";

export const createLead = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            name,
            email,
            status,
            source,
            assignedTo,
            priority,
            followUpDate,
            followUpNote,
        } = req.body;

        const lead =
            await Lead.create({

                name,
                email,
                status,
                source,
                assignedTo,

                priority,
                followUpDate,
                followUpNote,


                activities: [
                    {
                        type: "created",

                        message:
                            "Lead created",
                    },
                ],
            });

        res.status(201).json({
            success: true,
            lead,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const getLeads = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            page = "1",
            limit = "5",
            search = "",
            status = "",
            source = "",
            assignedTo = "",
        } = req.query;

        const query: any = {};

        if (assignedTo) {

            query.assignedTo =
                assignedTo;
        }

        // SEARCH

        if (search) {

            query.$or = [

                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        // FILTER STATUS

        if (status) {

            query.status = status;
        }

        // FILTER SOURCE

        if (source) {

            query.source = source;
        }

        const pageNumber =
            Number(page);

        const limitNumber =
            Number(limit);

        const skip =
            (pageNumber - 1) *
            limitNumber;

        const total =
            await Lead.countDocuments(
                query
            );

        const leads =
            await Lead.find(query)

                .populate(
                    "assignedTo",
                    "name email role"
                )

                .sort({
                    createdAt: -1,
                })

                .skip(skip)

                .limit(limitNumber);

        res.status(200).json({

            success: true,

            leads,

            total,

            currentPage:
                pageNumber,

            totalPages:
                Math.ceil(
                    total / limitNumber
                ),
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const getLeadById =
    async (
        req: Request,
        res: Response
    ) => {
        try {
            const lead =
                await Lead.findById(
                    req.params.id
                ).populate(
                    "assignedTo",
                    "name email role"
                );

            if (!lead) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Lead not found",
                });
            }

            res.status(200).json({
                success: true,
                lead,
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Server Error",
            });
        }
    };

export const updateLead =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const lead =
                await Lead.findById(
                    req.params.id
                );

            if (!lead) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Lead not found",
                });
            }

            const {
                name,
                email,
                status,
                source,
                assignedTo,
                priority,
                followUpDate,
                followUpNote,
            } = req.body;

            // STATUS TRACKING

            if (
                status &&
                status !== lead.status
            ) {

                lead.activities = [
                    {
                        type: "status",

                        message:
                            `Status changed from ${lead.status} to ${status}`,

                        createdAt:
                            new Date(),
                    },

                    ...lead.activities,
                ];

                lead.status = status;
            }

            // SOURCE TRACKING

            if (
                source &&
                source !== lead.source
            ) {

                lead.activities = [
                    {
                        type: "source",

                        message:
                            `Lead source changed to ${source}`,

                        createdAt:
                            new Date(),
                    },

                    ...lead.activities,
                ];

                lead.source = source;
            }

            // BASIC UPDATES

            lead.name =
                name || lead.name;

            lead.email =
                email || lead.email;

            lead.assignedTo =
                assignedTo ||
                lead.assignedTo;

            lead.priority =
                priority ||
                lead.priority;

            lead.followUpDate =
                followUpDate ||
                lead.followUpDate;

            lead.followUpNote =
                followUpNote ||
                lead.followUpNote;

            await lead.save();

            res.status(200).json({
                success: true,
                lead,
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: "Server Error",
            });
        }
    };
export const deleteLead =
    async (
        req: Request,
        res: Response
    ) => {
        try {
            const lead =
                await Lead.findByIdAndDelete(
                    req.params.id
                );

            if (!lead) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Lead not found",
                });
            }

            res.status(200).json({
                success: true,
                message:
                    "Lead deleted",
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Server Error",
            });
        }
    };

export const addLeadNote =
    async (
        req: Request,
        res: Response
    ) => {

        const { id } =
            req.params;

        const { text } =
            req.body;

        const lead =
            await Lead.findById(id);

        if (!lead) {

            return res
                .status(404)
                .json({
                    message:
                        "Lead not found",
                });
        }

        lead.notes.unshift({
            text,
            createdAt:
                new Date(),
        });

        lead.activities = [
            {
                type: "note",

                message:
                    "New note added",

                createdAt:
                    new Date(),
            },

            ...lead.activities,
        ];
        await lead.save();

        res.json({
            success: true,
            notes:
                lead.notes,
        });
    };

export const assignLead =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const {
                id,
            } = req.params;

            const {
                assignedTo,
            } = req.body;

            const lead =
                await Lead.findById(id);

            if (!lead) {

                return res.status(404).json({
                    success: false,
                    message: "Lead not found",
                });
            }

            lead.assignedTo =
                assignedTo;

            // ACTIVITY TRACKING

            lead.activities.push({

                type: "assignment",

                message:
                    "Lead assigned to sales employee",

                createdAt:
                    new Date(),
            });

            await lead.save();

            res.status(200).json({
                success: true,
                message:
                    "Lead assigned successfully",
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: "Server Error",
            });
        }
    };

    export const deleteLeadNote =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const lead =
                await Lead.findById(
                    req.params.id
                );

            if (!lead) {

                return res.status(404).json({
                    success: false,
                    message: "Lead not found",
                });
            }

            lead.notes =
                lead.notes.filter(
                    (note: any) =>

                        note._id.toString() !==
                        req.params.noteId
                );

            await lead.save();

            res.status(200).json({
                success: true,
                message: "Note deleted",
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: "Server Error",
            });
        }
    };