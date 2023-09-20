import { useState, createContext, useContext } from "react";

const UserConText = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currrentUser"));

    return user || null;
  });

  const handleSignin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <UserConText.Provider value={{ currentUser, handleSignin, handleSignOut }}>
      {children}
    </UserConText.Provider>
  );
};

export const useUserContext = () => {
  const value = useContext(UserConText);
  return value;
};

export default UserProvider;
