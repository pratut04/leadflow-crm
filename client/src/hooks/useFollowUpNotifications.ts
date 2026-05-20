import { useEffect } from "react";

export const useFollowUpNotifications =
  (leads: any[]) => {

    useEffect(() => {

      if (
        Notification.permission !==
        "granted"
      ) {

        Notification.requestPermission();
      }

      const interval =
        setInterval(() => {

          leads.forEach(
            (lead: any) => {

              if (
                !lead.followUpDate
              )
                return;

              const followUp =
                new Date(
                  lead.followUpDate
                );

              const now =
                new Date();

              const diffMinutes =
                Math.abs(
                  now.getTime() -
                    followUp.getTime()
                ) /
                1000 /
                60;

              if (
                diffMinutes <= 1
              ) {

                new Notification(
                  "Follow-Up Reminder",
                  {
                    body:
                      `${lead.name}: ${lead.followUpNote}`,
                  }
                );
              }
            }
          );

        }, 30000);

      return () =>
        clearInterval(
          interval
        );

    }, [leads]);
  };