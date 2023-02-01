import React, { useState } from "react";
import ListUsers from "./ListUsers";
import FormUser from "./FormUser";
const Films = () => {
  const [showUser, setShowUser] = useState(false);
  const [activeId, setActiveId] = useState("");

  const handleClick = (id) => {
    setActiveId(id);
  };
  return (
    <>
      {showUser ? (
        <FormUser openFormUser={() => setShowUser(false)} activeId={activeId} />
      ) : null}
      <ListUsers openFormUser={() => setShowUser(true)} getId={handleClick} />
    </>
  );
};

export default Films;
