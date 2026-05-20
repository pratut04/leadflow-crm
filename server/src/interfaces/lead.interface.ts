import { Document } from "mongoose";

export interface ILead
  extends Document {

  name: string;

  email: string;

  status: string;

  source: string;

  priority: string;

  followUpDate?: Date;

  followUpNote?: string;

  assignedTo?: string;

  notes: {
    text: string;

    createdAt: Date;
  }[];

  activities: {
    type:
    | "created"
    | "updated"
    | "note"
    | "status"
    | "source"
    | "assignment";

    message: string;

    createdAt: Date;
  }[];
}