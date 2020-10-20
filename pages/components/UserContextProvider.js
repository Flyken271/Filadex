import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
export const UserContext = createContext();
const TWITCH_CLIENT_ID = "d7izqp59w3dbk1itwt4axbr4dbku82";
const UserContextProvider = (props) => {
  const [user, setUser] = useState({});
  const storeUser = (user) => {
    setUser(user);
  };
  const logout = () => {
    setUser({});
  };

  useEffect(() => {
    try {
      const access_token = localStorage.getItem("token");
      if (access_token) {
        axios
          .get("https://api.twitch.tv/helix/users", {
            headers: {
              "Client-ID": TWITCH_CLIENT_ID,
              Accept: "application/vnd.twitchtv.v5+json",
              Authorization: "Bearer " + access_token,
            },
          })
          .then((res) => {
            storeUser(res.data.data);
          });
      }
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, storeUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

// Create a hook to use the APIContext, this is a Kent C. Dodds pattern
export function useAPI() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}

export default UserContextProvider;
