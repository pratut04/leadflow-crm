import mongoose, {
  Schema,
} from "mongoose";

import {
  ILead,
} from "../interfaces/lead.interface";

const leadSchema =
  new Schema<ILead>(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      status: {
        type: String,

        enum: [
          "New",
          "Contacted",
          "Qualified",
          "Lost",
        ],

        default: "New",
      },

      priority: {
        type: String,

        enum: [
          "Low",
          "Medium",
          "High",
          "Hot",
        ],

        default: "Medium",
      },

      followUpDate: {
        type: Date,
      },

      followUpNote: {
        type: String,
      },

      source: {
        type: String,

        enum: [
          "Website",
          "Instagram",
          "Referral",
          "Facebook",
        ],

        required: true,
      },

      notes: [
        {
          text: {
            type: String,
          },

          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],

      activities: [
        {
          type: {
            type: String,

            enum: [
              "created",
              "updated",
              "note",
              "status",
              "source",
              "assignment",
            ],
          },

          message: {
            type: String,
          },

          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],

      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    },



    {
      timestamps: true,
    }
  );

const Lead = mongoose.model<ILead>(
  "Lead",
  leadSchema
);

export default Lead;