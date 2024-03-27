import { useEffect, useState } from "react";
import auth from "../feature/authentication";
import Container from "../components/container/container";
import { Laugh, Paperclip, Send } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCurrentConversation } from "../slice/conversationSlice";
import Conversation from "../components/conversation";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [div1, setDiv1] = useState("hidden");
  const [div2, setDiv2] = useState("grid");
 const dispatch=useDispatch()

  useEffect(() => {
    setLoading(true);
    auth
      .getAllUser()
      .then((response) => {
        setUsers([...response.data]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const clickHandler = (user) => {  
    dispatch(setCurrentConversation(user._id))
    setDiv1("grid");
    setDiv2("hidden");
    setName(user.userName);
    setImage(user.profileImage.url);


  };
  return loading ? (
    <span className="loading loading-infinity loading-lg  text-red-400 absolute top-1/2 left-1/2"></span>
  ) : (
    <Container>
      <div className="w-full lg:w-[800px] mx-auto grid grid-cols-12 pb-3 gap-1 bg-[rgba(47,_163,_177,_0.2)] rounded-[16px] [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1)] backdrop-filter backdrop-blur-[5px] border-[1px] border-[rgba(47,163,177,0.3)] ">
        <div className="grid grid-cols-1 col-span-5 py-1 gap-2 relative">
          <div className="grid grid-cols-1 gap-2 px-3">
            <div>
              <h1 className="text-2xl font-semibold">Chats</h1>
            </div>
            <div>
              <label className="input bg-transparent border-b border-b-cyan-300 rounded-b-none input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
          </div>
          <div className="">
            <ul className="flex flex-col gap-1 px-3 h-[480px] overflow-auto chat-scroll">
              {users.map((user) => (
                <Conversation
                  key={user._id}
                  user={user}
                  clickHandler ={clickHandler}
                />
                  
                
              ))}
            </ul>
          </div>
        </div>
        <div className=" col-span-7 border-l border-cyan-200 ">
          <div className={`${div1} grid-rows-12 `}>
            <div
              className=" row-span-1 h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-tr-[16px]
"
            >
              <div className="w-1/3 flex flex-row gap-2 px-2 py-1 ">
                <img src={image} alt="profile-pic" className="w-10 h-10" />
                <p>{name}</p>
              </div>
            </div>
            <div className="row-span-10 "></div>
            <div className="w-full grid grid-cols-12 px-3 row-span-1 ">
              <div className=" col-span-2 flex items-center place-content-around">
                <Laugh />
                <label htmlFor="file-input">
                  <Paperclip />
                  <input
                    type="file"
                    name=""
                    id="file-input"
                    className="hidden"
                  />
                </label>
              </div>
              <div className=" col-span-9">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-ghost w-full max-w-xs"
                />
              </div>
              <div className=" col-span-1 flex justify-center items-center">
                <Send />
              </div>
            </div>
          </div>
          <div className={`${div2} h-full grid-cols-1 place-items-center`}>
            <div className=" flex flex-col justify-center items-center gap-1 w-4/5 h-1/2">
              <img src="robot.png" alt="" className="h-1/2 w-1/2" />
              <p className="text-l font-semibold">
                Start your conversation here
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Home;
