import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useDebouncedCallback } from "use-debounce";

export default function Search(props: React.ComponentPropsWithoutRef<"input">) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, 300);

  return (
    <label className="flex flex-1 flex-shrink-0">
      <input
        title="search"
        type="text"
        name="search"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query") || ""}
        {...props}
      />
    </label>
  );
}
