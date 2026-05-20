interface Props {

  search: string;

  setSearch: (
    value: string
  ) => void;

  status: string;

  setStatus: (
    value: string
  ) => void;

  source: string;

  setSource: (
    value: string
  ) => void;
}

function FilterBar({

  search,
  setSearch,

  status,
  setStatus,

  source,
  setSource,

}: Props) {

  return (

    <div className="mb-6 flex flex-col gap-4 lg:flex-row">

      <input
        type="text"

        placeholder="Search leads..."

        value={search}

        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }

        className="flex-1 rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 outline-none"
      />

      <select
        value={status}

        onChange={(e) =>
          setStatus(
            e.target.value
          )
        }

        className="rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4"
      >
        <option value="">
          All Status
        </option>

        <option value="New">
          New
        </option>

        <option value="Contacted">
          Contacted
        </option>

        <option value="Qualified">
          Qualified
        </option>

        <option value="Lost">
          Lost
        </option>

      </select>

      <select
        value={source}

        onChange={(e) =>
          setSource(
            e.target.value
          )
        }

        className="rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4"
      >
        <option value="">
          All Sources
        </option>

        <option value="Website">
          Website
        </option>

        <option value="Instagram">
          Instagram
        </option>

        <option value="Referral">
          Referral
        </option>

        <option value="Facebook">
          Facebook
        </option>

      </select>

    </div>
  );
}

export default FilterBar;