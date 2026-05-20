import api from "./api";

export const createLead = async (
  leadData: {
    name: string;
    email: string;
    status: string;
    source: string;
  }
) => {
  const response = await api.post(
    "/leads",
    leadData
  );

  return response.data;
};

export const deleteLead = async (
  id: string
) => {

  const response =
    await api.delete(
      `/leads/${id}`
    );

  return response.data;
};

export const getLeads = async (
  page = 1,
  search = "",
  status = "",
  source = "",
  assignedTo = ""
) => {

  const response =
    await api.get(

      `/leads?page=${page}&search=${search}&status=${status}&source=${source}&assignedTo=${assignedTo}`

    );

  return response.data;
};

export const getLeadById = async (
  id: string
) => {

  const response =
    await api.get(
      `/leads/${id}`
    );

  return response.data;
};
export const updateLead = async (
  leadId: string,
  leadData: {
    name: string;
    email: string;
    status: string;
    source: string;
    priority: string;
  }
) => {

  const response =
    await api.put(
      `/leads/${leadId}`,
      leadData
    );

  return response.data;
};

export const addLeadNote =
  async (
    id: string,
    text: string
  ) => {

    const response =
      await api.post(
        `/leads/${id}/notes`,
        { text }
      );

    return response.data;
  };

export const deleteLeadNote =
  async (
    leadId: string,
    noteId: string
  ) => {

    const response =
      await api.delete(
        `/leads/${leadId}/notes/${noteId}`
      );

    return response.data;
  };

export const updateLeadStatus =
  async (
    id: string,
    status: string
  ) => {

    const response =
      await api.put(
        `/leads/${id}`,
        { status }
      );

    return response.data;
  };

export const getSalesUsers =
  async () => {

    const response =
      await api.get(
        "/users/sales"
      );

    return response.data;
  };

export const assignLead =
  async (
    id: string,
    assignedTo: string
  ) => {

    const response =
      await api.put(
        `/leads/assign/${id}`,
        {
          assignedTo,
        }
      );

    return response.data;
  };