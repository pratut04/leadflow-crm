import {
    useState,
} from "react";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    getAllUsers,
} from "../../services/user.service";

import CreateUserModal from "../../components/dashboard/CreateUserModal";

function UsersPage() {
    const [
        openModal,
        setOpenModal,
    ] = useState(false);


    const {
        data,
        isLoading,
        refetch,
    } = useQuery({

        queryKey: ["users"],

        queryFn:
            getAllUsers,
    });

    if (isLoading) {

        return (
            <div>
                Loading users...
            </div>
        );
    }

    return (

        <div>

            <div
                className="
                    mb-8
                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <h1 className="text-4xl font-bold">
                        Team Management
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Manage sales employees
                    </p>

                </div>

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

                        hover:bg-violet-700
                        "
                >
                    + Add User
                </button>

            </div>

            <div
                className="
          grid
          gap-6

          md:grid-cols-2
          xl:grid-cols-3
        "
            >

                {data?.users?.map(
                    (user: any) => (

                        <div
                            key={user._id}

                            className="
                rounded-3xl
                border
                border-slate-800

                bg-slate-900/50

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

                                <div
                                    className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center

                    rounded-full

                    bg-violet-600

                    text-xl
                    font-bold
                  "
                                >
                                    {user.name.charAt(0)}
                                </div>

                                <span
                                    className="
                    rounded-full

                    bg-violet-500/20

                    px-3
                    py-1

                    text-sm
                    font-semibold

                    text-violet-300
                  "
                                >
                                    {user.role}
                                </span>

                            </div>

                            <h2 className="text-2xl font-bold">
                                {user.name}
                            </h2>

                            <p className="mt-1 text-slate-400">
                                {user.email}
                            </p>

                            <div
                                className="
                  mt-6
                  rounded-2xl

                  bg-slate-950/60

                  p-4
                "
                            >

                                <p className="text-slate-400">
                                    Assigned Leads
                                </p>

                                <h3 className="mt-1 text-3xl font-bold text-violet-400">
                                    {user.leadCount}
                                </h3>

                            </div>

                        </div>
                    )
                )}

            </div>

            <CreateUserModal
                open={openModal}

                onClose={() =>
                    setOpenModal(false)
                }

                refetch={refetch}
            />

        </div>
    );
}

export default UsersPage;