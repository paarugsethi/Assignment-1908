import SearchInput from "./SearchInput";
import axios from "axios";
import { useState } from "react";

const UserCard = (user) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "80%",
        height: "200px",
        padding: "1rem",
        border: "2px solid black",
        borderRadius: "6px"
      }}
    >
      <div style={{ height: "140px", width: "20%", overflow: "" }}>
        <img width="100%" src={user.avatar_url} alt="avatar" />
      </div>
      <div style={{ padding: "2rem" }}>
        <h2>Username: {user.login}</h2>
        <h4>Score: {user.score}</h4>
      </div>
    </div>
  );
};

export default function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);

  const getUsers = (q) => {
    return (
      axios
        .get(`https://api.github.com/search/users?q=${q}`)
        // .then((res) => res.json())
        .then((res) => {
          return res.data.items;
        })
        .catch((err) => console.log(err))
    );
  };

  const handleSearch = async (input) => {
    try {
      setIsLoading(true);
      const users = await getUsers(input);
      setUsersList(users);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
        gap: "20px",
        margin: "auto",
        alignItems: "center"
      }}
    >
      <SearchInput handleSearch={handleSearch} />
      {isLoading && <h2>Loading...</h2>}
      {usersList.map((user) => {
        return <UserCard key={user.id} {...user} />;
      })}
    </div>
  );
}
