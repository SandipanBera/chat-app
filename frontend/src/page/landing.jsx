import auth from "../feature/authentication";

function Landing() {
  const handleClick = () => {
    auth.registerUser("test3", "test3", "test3@gmail.com",'female', "123456","123456").then(response=>console.log(response)).catch(error=>console.log(error))
    // auth.signIn("sand",'123456').then(response=>console.log(response)).catch(error=>console.log(error))
  };
  return (
    <>
      <button className="btn glass text-violet-500 ml-5" onClick={handleClick}>
      Api Call
      </button>  
    </>
  );
}

export default Landing;
