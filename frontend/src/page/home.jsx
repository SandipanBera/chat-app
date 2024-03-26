import { useEffect, useState } from "react";
import auth from "../feature/authentication";
import Container from "../components/container/container";
import { Laugh, Paperclip, Send } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
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

  return loading ? (
    <span className="loading loading-infinity loading-lg  text-red-400 absolute top-1/2 left-1/2"></span>
  ) : (
    <Container>
      <div className="w-full lg:w-[800px] mx-auto grid grid-cols-12 p-3 gap-1 bg-[rgba(47,_163,_177,_0.2)] rounded-[16px] [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1)] backdrop-filter backdrop-blur-[5px] border-[1px] border-[rgba(47,163,177,0.3)] ">
        <div className="grid grid-cols-1 col-span-5 py-2 gap-2 relative">
          <div className="grid grid-cols-1 gap-2">
            <div >
              <h1 className="text-2xl font-semibold">Chats</h1>
            </div>
            <div >
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
            <ul className="flex flex-col gap-2 px-4 h-[480px] overflow-auto" id="chat-scroll">
              {users.map((user) => (
                <li key={user._id} className=" py-2  grid grid-cols-12 gap-1">
                  <div className="col-span-8 grid grid-cols-12 gap-2 ">
                    <div className="col-span-4">
                      <img src={user.profileImage.url} alt="profile image" />
                    </div>
                    <div className="col-span-8 grid grid-cols-1 gap-1">
                      <div>{user.userName}</div>
                      <div>message</div>
                    </div>
                  </div>
                  <div className="col-span-4 text-center">
                    date
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
          <div className=" col-span-7 border-l border-cyan-200 relative">
            <div className="w-full p-1 grid grid-cols-12 h-max absolute bottom-2 left-0">
              <div className=" col-span-2 flex items-center place-content-around">
                <EmojiPicker height={15} width={15}/>
                <Paperclip />
                </div>
              <div className=" col-span-9">
              <input type="text" placeholder="Type here" className="input input-ghost w-full max-w-xs" />
            </div>
              <div className=" col-span-1 flex justify-center items-center">
              <Send />
            </div>
            </div>
          
            
        </div>
      </div>
    </Container>
  );
}

export default Home;
