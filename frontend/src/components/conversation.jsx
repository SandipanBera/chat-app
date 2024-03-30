
import { useSelector } from "react-redux";
function Conversation({ user, clickHandler }) {
  const conversation = useSelector((state) => state.conversations);
  const selected = user._id === conversation.currentConversation;
  return (
    <li
      className={`py-2 px-1 grid grid-cols-12 gap-1 hover:bg-sky-500 text-slate-50 ${selected && "bg-sky-500"}`}
      onClick={() => clickHandler(user)}
    >
      <div className="col-span-8 grid grid-cols-12 gap-2 ">
        <div className="col-span-4">
          <img src={user.profileImage.url} alt="profile image" className="w-14 h-14 rounded-full"/>
        </div>
        <div className="col-span-8 grid grid-cols-1 gap-1">
          <div>{user.userName}</div>
          <div>message</div>
        </div>
      </div>
      <div className="col-span-4 text-center">date</div>
    </li>
  );
}

export default Conversation;
