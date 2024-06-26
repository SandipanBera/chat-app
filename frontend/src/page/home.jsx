import { useEffect, useRef, useState } from "react";
import auth from "../api-call/authentication";
import Container from "../components/container/container";
import { Laugh, Paperclip, Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentConversation,
  setUploadImage,
} from "../slice/conversationSlice";
import Conversation from "../components/conversation";
import useSendMessage from "../hooks/useSendMessage";
import { Userdata } from "../slice/userSlice";
import useGetMessage from "../hooks/useGetMessage";
import MessageSkeleton from "../components/skeletons/messageSkeleton";
import Message from "../components/message";
import EmojiPicker from "emoji-picker-react";
import useHandleEmoji from "../hooks/useHandleEmoji";
import FilePicker from "../components/filePicker";
import { setIsOpen } from "../slice/componentSlice";
import useDebouce from "../hooks/useDebouce";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [visible, setVisible] = useState({
    chat: false,
    emoji: false,
    file: false,
  });
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [image, setImage] = useState("");
  const sendMessage = useSendMessage();
  const getMessages = useGetMessage();
  const setEmoji = useHandleEmoji();
  const searchTerm = useDebouce(query);
  const ref = useRef(null);
  const inputRef = useRef(null);
  // Dispatcher for actions
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.conversations);
  const isOpen = useSelector((state) => state.components.isOpen);
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
  useEffect(() => {
    auth
      .currentUser()
      .then((user) => {
        setLoading(true);
        if (user.statusCode === 200) {
          dispatch(Userdata(user.data));
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const clickHandler = (user) => {
    setLoading(true);
    dispatch(setCurrentConversation(user));
    setVisible({ ...visible, chat: true });
    setUserData(user);
    getMessages(user._id);
    setLoading(false);
  };
  const handleSendMessage = () => {
    sendMessage(message);
    setMessage("");
  };
  const handleEmoji = ({ emoji }) => {
    setEmoji(emoji, setMessage, inputRef.current);
  };
  return loading ? (
    <span className="loading loading-infinity loading-lg  text-red-400 absolute top-1/2 left-1/2" />
  ) : (
    <Container className="relative min-h-screen flex justify-center items-center pt-12 ">
      <FilePicker
        className={`bottom-32 left-1/3 ${!isOpen && "hidden"}`}
        image={image}
        setImage={setImage}
      />

      <div
        className={`fixed bottom-32 left-1/3 z-30 ${!visible.emoji && "hidden"}`}
      >
        <EmojiPicker
          height={300}
          width={400}
          onEmojiClick={handleEmoji}
          emojiStyle="google"
        />
      </div>
      <div className="w-full lg:w-[1000px] mx-auto grid grid-cols-12 pb-3  gap-1 bg-[rgba(47,_163,_177,_0.2)] rounded-[16px] [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1)] backdrop-filter backdrop-blur-[5px] border-[1px] border-[rgba(47,163,177,0.3)] ">
        <div className="grid grid-cols-1 col-span-5 py-1 gap-2 relative">
          <div className="grid grid-cols-1 gap-2 px-3">
            <div>
              <h1 className="text-2xl font-semibold">Chats</h1>
            </div>
            <div>
              <label className="input bg-transparent border-b border-b-cyan-300 rounded-b-none input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" value={query} onChange={(e)=>setQuery(e.target.value)} />
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

          <ul className="flex flex-col gap-2 px-3 h-[480px] overflow-auto chat-scroll">
            {users
              .filter((user) =>
                user.userName
                  .trim()
                  .toLowerCase()
                  .includes(searchTerm.trim().toLowerCase())
              )
              .map((user) => (
                <Conversation
                  key={user._id}
                  user={user}
                  clickHandler={clickHandler}
                />
              ))}
          </ul>
        </div>
        <div className=" col-span-7 border-l border-cyan-200 ">
          <div className={`${visible.chat ? "grid" : "hidden"} grid-rows-12 `}>
            <div
              className=" row-span-1 h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-tr-[16px]
"
            >
              <div className="w-1/3 flex flex-row items-center gap-2 px-2 py-1 ">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={userData?.profileImage?.url} />
                  </div>
                </div>

                <p className="text-lg italic">{userData?.userName}</p>
              </div>
            </div>
            <div className="row-span-10 h-[460px] overflow-auto px-2 chat-scroll ">
              {loading &&
                [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
              {!loading && messages?.conversation?.length === 0 && (
                <p className="text-center">
                  start your conversation by sending message
                </p>
              )}
              {!loading &&
                messages?.conversation?.length !== 0 &&
                messages?.conversation?.map((message) => (
                  <div key={message._id} ref={ref}>
                    <Message message={message} />
                  </div>
                ))}
            </div>
            <div className="w-full grid grid-cols-12 px-3 row-span-1  ">
              <div className=" col-span-2 flex items-center place-content-around ">
                <Laugh
                  onClick={() =>
                    setVisible({ ...visible, emoji: !visible.emoji })
                  }
                />
                <label htmlFor="file-input">
                  <Paperclip />
                  <input
                    type="file"
                    name=""
                    id="file-input"
                    accept="image/png, image/gif, image/jpeg"
                    className="hidden"
                    onChange={(e) => {
                      dispatch(setIsOpen(true));
                      setImage(e.target.files[0]);
                      dispatch(
                        setUploadImage({
                          url: URL.createObjectURL(e.target.files[0]),
                          name: e.target.files[0].name,
                        })
                      );
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
              <div className=" col-span-9">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="input input-ghost w-full max-w-xs"
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className=" col-span-1 flex justify-center items-center">
                <Send onClick={handleSendMessage} />
              </div>
            </div>
          </div>
          <div
            className={`${visible.chat ? "hidden" : "grid"} h-full grid-cols-1 place-items-center`}
          >
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
