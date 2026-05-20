import {
  Request,
  Response,
} from "express";

import Lead from "../models/lead.model";

export const getAnalytics =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const totalLeads =
        await Lead.countDocuments();

      const qualifiedLeads =
        await Lead.countDocuments({
          status: "Qualified",
        });

      const lostLeads =
        await Lead.countDocuments({
          status: "Lost",
        });

      const contactedLeads =
        await Lead.countDocuments({
          status: "Contacted",
        });

      const newLeads =
        await Lead.countDocuments({
          status: "New",
        });

      const recentLeads =
        await Lead.find()
          .sort({
            createdAt: -1,
          })
          .limit(5);

      const leads =
        await Lead.find()
          .populate(
            "assignedTo",
            "name"
          );

      const teamStats: any = {};

      leads.forEach(
        (lead: any) => {

          if (
            !lead.assignedTo
          ) {
            return;
          }

          const employee =
            lead.assignedTo.name;

          if (
            !teamStats[
            employee
            ]
          ) {

            teamStats[
              employee
            ] = {

              assigned: 0,

              qualified: 0,

              lost: 0,
            };
          }

          teamStats[
            employee
          ].assigned++;

          if (
            lead.status ===
            "Qualified"
          ) {

            teamStats[
              employee
            ].qualified++;
          }

          if (
            lead.status ===
            "Lost"
          ) {

            teamStats[
              employee
            ].lost++;
          }
        }
      );

      const performance =
        Object.entries(
          teamStats
        ).map(
          ([name, value]: any) => ({

            name,

            ...value,

            conversionRate:
              value.assigned

                ? (
                  (value.qualified /
                    value.assigned) *
                  100
                ).toFixed(1)

                : 0,
          })
        );

      const conversionRate =
        totalLeads === 0
          ? 0
          : (
            (qualifiedLeads /
              totalLeads) *
            100
          ).toFixed(1);

      res.status(200).json({

        success: true,

        stats: {
          totalLeads,
          qualifiedLeads,
          lostLeads,
          contactedLeads,
          newLeads,
          conversionRate,
        },

        recentLeads,
        performance,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };