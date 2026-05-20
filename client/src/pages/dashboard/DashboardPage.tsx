import { useState } from "react";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  useAuthStore,
} from "../../store/useAuthStore";

import {
  useFollowUpNotifications,
} from "../../hooks/useFollowUpNotifications";

import TeamPerformance from "../../components/dashboard/TeamPerformance";

import FollowUpCalendar from "../../components/dashboard/FollowUpCalendar";

import FilterBar from "../../components/dashboard/FilterBar";

import LeadsTable from "../../components/dashboard/LeadsTable";

import Pagination from "../../components/dashboard/Pagination";

import CreateLeadModal from "../../components/dashboard/CreateLeadModal";

import StatsCards from "../../components/dashboard/StatsCards";

import LeadStatusChart from "../../components/dashboard/LeadStatusChart";

import EmptyState from "../../components/ui/EmptyState";

import TableSkeleton from "../../components/ui/TableSkeleton";

import useDebounce from "../../hooks/useDebounce";

import LeadSourceChart from "../../components/dashboard/LeadSourceChart";

import RecentActivity from "../../components/dashboard/RecentActivity";

import ExportButton from "../../components/dashboard/ExportButton";

import {
  getLeads,
} from "../../services/lead.service";

import {
  getAnalytics,
} from "../../services/analytics.service";

function DashboardPage() {

  const [openModal, setOpenModal] =
    useState(false);

  const [page, setPage] =
    useState(1);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [source, setSource] =
    useState("");



  const debouncedSearch =
    useDebounce(search);


  const user =
    useAuthStore(
      (state) => state.user
    );


  // LEADS QUERY

  const {
    data,
    isLoading,
    error,
  } = useQuery({

    queryKey: [
      "leads",
      page,
      debouncedSearch,
      status,
      source,
      user?.role === "sales"
        ? (user as any)?.id ||
        user?._id
        : ""
    ],

    queryFn: () =>
      getLeads(
        page,
        debouncedSearch,
        status,
        source,
        user?.role === "sales"
          ? (user as any)?.id ||
          user?._id
          : ""

      ),
  });

  // ANALYTICS QUERY

  const analyticsQuery =
    useQuery({

      queryKey: ["analytics"],

      queryFn:
        getAnalytics,
    });

  const filteredLeads =
    data?.leads || [];
  if (error) {

    return (
      <div className="text-red-500">
        Failed to load leads
      </div>
    );
  }

  const now =
    new Date();

  const todayFollowUps =
    (filteredLeads || []).filter(
      (lead: any) => {

        if (
          !lead.followUpDate
        ) {
          return false;
        }

        const followUp =
          new Date(
            lead.followUpDate
          );

        return (
          followUp.toDateString() ===
          now.toDateString()
        );
      }
    );

  const overdueFollowUps =
    (filteredLeads || []).filter(
      (lead: any) => {

        if (
          !lead.followUpDate
        ) {
          return false;
        }

        return (
          new Date(
            lead.followUpDate
          ) < now
        );
      }
    );

  useFollowUpNotifications(
    filteredLeads || []
  );
  return (
    <div>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Leads Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Manage and monitor your sales leads
        </p>

      </div>


      {/* STATS CARDS */}

      {user?.role === "admin" &&
        analyticsQuery.data?.stats && (

          <StatsCards
            stats={
              analyticsQuery
                .data.stats
            }
          />
        )}

      {/* ACTION BUTTONS */}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div
          className="
            flex
            w-full
            flex-col
            gap-3

            sm:w-auto
            sm:flex-row
          "
        >

          <ExportButton
            leads={filteredLeads || []}
          />

          <button
            onClick={() =>
              setOpenModal(true)
            }

            className="
            rounded-2xl
            bg-violet-600

            px-6
            py-3

            font-semibold
            text-white

            transition-all
            duration-200

            hover:scale-[1.02]
            hover:bg-violet-500

            active:scale-[0.98]
            "
          >
            + Create Lead
          </button>

        </div>

      </div>
      {/* FOLLOW-UP ALERTS */}

      <div
        className="
    mb-8

    grid
    gap-6

    grid-cols-1
    xl:grid-cols-2
  "
      >

        {/* TODAY */}

        <div
          className="
      rounded-3xl
      border
      border-amber-500/20

      bg-amber-500/10

      p-6
    "
        >

          <div
            className="
        mb-4

        flex
        items-center
        justify-between
      "
          >

            <h2
              className="
          text-xl
          font-bold
          text-amber-300
        "
            >
              Due Today
            </h2>

            <span
              className="
          rounded-full

          bg-amber-500/20

          px-3
          py-1

          text-sm
        "
            >
              {
                todayFollowUps.length
              }
            </span>

          </div>

          <div className="space-y-3">

            {todayFollowUps.length === 0 && (

              <p className="text-slate-400">
                No follow-ups today
              </p>

            )}

            {todayFollowUps.map(
              (lead: any) => (

                <div
                  key={lead._id}

                  className="
              rounded-2xl

              bg-slate-950/50

              p-4
            "
                >

                  <h3 className="font-semibold">
                    {lead.name}
                  </h3>

                  <p
                    className="
                mt-1
                text-sm
                text-slate-400
              "
                  >
                    {
                      lead.followUpNote
                    }
                  </p>

                </div>
              )
            )}

          </div>

        </div>

        {/* OVERDUE */}

        <div
          className="
      rounded-3xl
      border
      border-red-500/20

      bg-red-500/10

      p-6
    "
        >

          <div
            className="
        mb-4

        flex
        items-center
        justify-between
      "
          >

            <h2
              className="
          text-xl
          font-bold
          text-red-300
        "
            >
              Overdue Follow-Ups
            </h2>

            <span
              className="
          rounded-full

          bg-red-500/20

          px-3
          py-1

          text-sm
        "
            >
              {
                overdueFollowUps.length
              }
            </span>

          </div>

          <div className="space-y-3">

            {overdueFollowUps.length === 0 && (

              <p className="text-slate-400">
                No overdue reminders
              </p>

            )}

            {overdueFollowUps.map(
              (lead: any) => (

                <div
                  key={lead._id}

                  className="
              rounded-2xl

              bg-slate-950/50

              p-4
            "
                >

                  <h3 className="font-semibold">
                    {lead.name}
                  </h3>

                  <p
                    className="
                mt-1
                text-sm
                text-slate-400
              "
                  >
                    {
                      lead.followUpNote
                    }
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </div>

      {/* FILTERS */}

      <FilterBar
        search={search}
        setSearch={setSearch}

        status={status}
        setStatus={setStatus}

        source={source}
        setSource={setSource}
      />

      {/* TABLE */}

      {isLoading ? (

        <TableSkeleton />

      ) : filteredLeads?.length === 0 ? (

        <EmptyState />

      ) : (

        <>

          <LeadsTable
            leads={filteredLeads || []}
          />

          <Pagination
            currentPage={
              data?.currentPage || 1
            }

            totalPages={
              data?.totalPages || 1
            }

            onPageChange={
              setPage
            }
          />

          {/* CHART */}

          {user?.role === "admin" && (

            <div className="mt-10">

              {analyticsQuery.data?.stats && (

                <LeadStatusChart
                  stats={
                    analyticsQuery
                      .data.stats
                  }
                />
              )}

            </div>

          )}

          {/* EXTRA ANALYTICS */}

          {user?.role === "admin" && (

            <div className="mt-10 grid gap-8 xl:grid-cols-2">

              <LeadSourceChart
                leads={
                  filteredLeads || []
                }
              />

              <RecentActivity
                leads={
                  analyticsQuery
                    .data
                    ?.recentLeads || []
                }
              />

            </div>

          )}

          {/* TEAM PERFORMANCE */}

          {
            user?.role === "admin" &&

            analyticsQuery.data
              ?.performance && (

              <div className="mt-10">

                <TeamPerformance
                  performance={
                    analyticsQuery
                      .data
                      .performance
                  }
                />

              </div>
            )
          }


          

          {/* FOLLOW-UP CALENDAR */}

          <div
            className="
              mt-10
              overflow-x-auto
            "
          >

            <div className="min-w-[900px]">

              <FollowUpCalendar
                leads={
                  filteredLeads || []
                }
              />

            </div>

          </div>

        </>

      )}

      {/* MODAL */}

      <CreateLeadModal
        open={openModal}

        onClose={() =>
          setOpenModal(false)
        }
      />

    </div>
  );
}

export default DashboardPage;