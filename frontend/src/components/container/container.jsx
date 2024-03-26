import React from "react";

function Container({ children, className = "" }) {
  return <div className={`w-full max-w-7xl m-auto p-4 ${className}`}>{children}</div>;
}

export default Container;
