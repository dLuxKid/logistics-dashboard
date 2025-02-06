import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useDebouncedCallback } from "use-debounce";

export default function Search(
  props: { query_name: string } & React.ComponentPropsWithoutRef<"input">
) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(props.query_name, term);
    } else {
      params.delete(props.query_name);
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, 300);

  return (
    <label className="flex">
      <input
        title="search"
        type="text"
        name="search"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get(props.query_name) || ""}
        {...props}
      />
    </label>
  );
}
