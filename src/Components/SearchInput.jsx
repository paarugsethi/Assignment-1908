import { useState } from "react";

export default function SearchInput({ handleSearch }) {
  const [search, setSearch] = useState("");

  const onSearch = () => {
    if (search === "") {
      alert("Please enter an input");
      return;
    }

    handleSearch(search);
    setSearch("");
  };

  return (
    <div>
      <h2>Search users on GitHub</h2>
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        name="users"
        placeholder="Enter user"
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}
