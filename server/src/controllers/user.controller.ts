import {
  Request,
  Response,
} from "express";

import User from "../models/user.model";

import Lead from "../models/lead.model";

export const getSalesUsers =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const users =
        await User.find({
          role: "sales",
        }).select(
          "name email role"
        );

      const usersWithCounts =
        await Promise.all(

          users.map(
            async (user) => {

              const leadCount =
                await Lead.countDocuments({
                  assignedTo:
                    (user as any)._id,
                });

              return {
                ...user.toObject(),
                leadCount,
              };
            }
          )
        );

      res.status(200).json({

        success: true,

        users:
          usersWithCounts,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          "Server Error",
      });
    }
  };