import { useEffect } from "react";

export const useFollowUpNotifications =
  (leads: any[]) => {

    useEffect(() => {

      // SAFETY CHECK

      if (
        typeof window === "undefined"
      ) {
        return;
      }

      // MOBILE SAFARI FIX

      if (
        !("Notification" in window)
      ) {
        return;
      }

      // REQUEST PERMISSION

      if (
        Notification.permission !==
        "granted"
      ) {

        Notification.requestPermission();

        return;
      }

      const interval =
        setInterval(() => {

          leads.forEach(
            (lead: any) => {

              if (
                !lead.followUpDate
              ) {
                return;
              }

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
