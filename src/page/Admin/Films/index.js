import React, { useState } from "react";
import ListFilms from "./ListFilms";
import FormFilm from "./FormFilm";
import ShowTime from "./ShowTime";
const Films = () => {
  const [showFilm, setShowFilm] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [activeId, setActiveId] = useState("");

  const handleClick = (id) => {
    setActiveId(id);
  };
  return (
    <>
      {showFilm ? (
        <FormFilm openFormFilm={() => setShowFilm(false)} activeId={activeId} />
      ) : (
        <>
          {showTime ? (
            <ShowTime
              openFormTime={() => setShowTime(false)}
              activeId={activeId}
            />
          ) : null}
        </>
      )}
      <ListFilms
        openFormFilm={() => setShowFilm(true)}
        openFormTime={() => setShowTime(true)}
        getId={handleClick}
      />
    </>
  );
};

export default Films;
