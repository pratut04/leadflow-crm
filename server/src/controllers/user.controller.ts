import {
  Request,
  Response,
} from "express";

import User from "../models/user.model";

import Lead from "../models/lead.model";
import bcrypt from "bcryptjs";

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

  export const changePassword =
  async (req: any, res: any) => {

    try {

      const { password } = req.body;

      const user =
        await User.findById(
          req.user.userId
        );

      if (!user) {

        return res.status(404).json({
          message: "User not found",
        });
      }

      const hashedPassword =
        await bcrypt.hash(password, 10);

      user.password =
        hashedPassword;

      await user.save();

      res.json({
        success: true,
        message:
          "Password updated",
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error",
      });
    }
};
export const updateProfile =
  async (req: any, res: any) => {

    try {

      const { name } = req.body;

      const user =
        await User.findById(
          req.user.userId
        );

      if (!user) {

        return res.status(404).json({
          message: "User not found",
        });
      }

      user.name = name;

      await user.save();

      res.json({
        success: true,
        user,
      });

    } catch (error) {

      res.status(500).json({
        message: "Server Error",
      });
    }
};
