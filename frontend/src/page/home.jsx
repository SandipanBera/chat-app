import React, { useState } from "react";
import auth from "../feature/authentication";

function Home() {
  const handleClick = () => {
    auth.registerUser("test2", "test2", "test2@gmail.com",'male', "123456","123456").then(response=>console.log(response)).catch(error=>console.log(error))
    // auth.signIn("sand",'123456').then(response=>console.log(response)).catch(error=>console.log(error))
  };
  return (
    <>
      <div className="text-xl text-cyan-400">home</div>
      <button className="btn glass text-violet-500 ml-5" onClick={handleClick}>
      Api Call
      </button>
     
    </>
  );
}

export default Home;
