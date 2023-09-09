import moment from "moment";
import { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
function Thread({
  thread,
  user,
  setOpenPopup,
  getThreads,
  setselectedReplyThread,
}) {
  const timePassed = moment(thread.timestamp).fromNow();
  const [replyLength, setReplyLength] = useState(null);
  const [likes, setLikes] = useState([]);
  const handleClick = () => {
    setOpenPopup(true);
    setselectedReplyThread(thread);
  };

  const postLike = async () => {
    if (likes.indexOf(user.user_uuid) == -1) {
      const newLike = [...likes, user.user_uuid];
      setLikes(newLike);
    } else {
      likes.pop();
    }

    try {
      const response = await fetch(
        `http://localhost:3000/threads/${thread.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(thread),
        }
      );
      const result = response.json();
      console.log("success", result);
    } catch (error) {
      console.log(error);
    }
    getThreads();
  };
  const getReplyLength = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/threads?reply_to=${thread.id}`
      );
      const data = await response.json();
      console.log("dta legnth", data.length);
      setReplyLength(data.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReplyLength();

    console.log("reply length", replyLength);
  }, [thread]);
  return (
    <article className="feed-card">
      <div className="text-container">
        <div>
          <div className="img-container">
            <img src={user.img} alt="profile avatar" />
          </div>
          <div>
            <p>
              <strong>{user.handle} </strong>
            </p>
            <p>{thread.text}</p>
          </div>
        </div>
        <p className="sub-text">{timePassed}</p>
      </div>
      <div className="icons">
        {likes.includes(user.user_uuid) ? (
          <AiFillHeart
            onClick={postLike}
            style={{ fill: "red" }}
            className="like-heart"
          />
        ) : (
          <AiOutlineHeart onClick={postLike} className="like-heart" />
        )}

        <svg
          onClick={handleClick}
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007m0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 11v4h2.953l1.594 2h-6.547v-6h-2l3-4 3 4h-2zm6 2v-4h-2.922l-1.594-2h6.516v6h2l-3 4-3-4h2z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z" />
        </svg>
      </div>
      <p className="sub-text">
        <span onClick={handleClick}> {replyLength} replies •</span>
        <span> {likes.length} likes </span>
      </p>
    </article>
  );
}

export default Thread;
