import { useMemo } from "react";

import { useLeadStore } from "../store/useLeadStore";
import useDebounce from "./useDebounce";

function useFilteredLeads() {
  const {
    leads,
    search,
    status,
    source,
    sort,
  } = useLeadStore();

  const debouncedSearch = useDebounce(search);

  const filteredLeads = useMemo(() => {
    let filtered = [...leads];

    // SEARCH
    if (debouncedSearch) {
      filtered = filtered.filter((lead) =>
        lead.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        lead.email.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // STATUS
    if (status) {
      filtered = filtered.filter(
        (lead) => lead.status === status
      );
    }

    // SOURCE
    if (source) {
      filtered = filtered.filter(
        (lead) => lead.source === source
      );
    }

    // SORT
    filtered.sort((a, b) => {
      if (sort === "latest") {
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );
      }

      return (
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()
      );
    });

    return filtered;
  }, [
    leads,
    debouncedSearch,
    status,
    source,
    sort,
  ]);

  return filteredLeads;
}

export default useFilteredLeads;