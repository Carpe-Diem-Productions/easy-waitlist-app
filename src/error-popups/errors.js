import React from "react";

const ErrorNotImplemented = () => {
  return <h1>Not implemented yet.</h1>;
};

const ErrorSomethingWentWrong = (props) => {
  return (
    <div>
      <h1>Sorry something went wrong.</h1>
      <pre>{props.dump}</pre>
    </div>
  );
};

export { ErrorNotImplemented, ErrorSomethingWentWrong };
