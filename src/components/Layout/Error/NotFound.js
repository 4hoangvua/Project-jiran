import React from "react";

const NotFound = () => {
  return (
    <div className="container text-center w-50 mt-5">
      <h5 className="text-dark">Malformed URL</h5>
      <p className="text-secondary">
        The link you entered does not look like a valid Anshin. If someone gave
        you this link, you may need to ask them to check that it's correct.
      </p>
    </div>
  );
};

export default NotFound;
