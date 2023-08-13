import moment from "moment";
import { useEffect, useState } from "react";
function PopUpThread({ popupFeedThread }) {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?user_uuid=${popupFeedThread.thread_from}`
      );
      const data = await response.json();
      setUser(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const timepassed = moment().startOf("day").fromNow(popupFeedThread.timestamp);
  return (
    <article className="feed-card">
      <div className="text-container">
        <div>
          <div className="img-container">
            <img src={user?.img} alt="profile avatar" />
          </div>
        </div>
        <div>
          <p>
            <strong>{user?.handle}</strong>
          </p>
          <p>{popupFeedThread.text}</p>
        </div>
        <p className="sub-text">{timepassed}</p>
      </div>
    </article>
  );
}

export default PopUpThread;
