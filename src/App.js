import { useState, useEffect } from "react";
import Nav from "./component/Nav";
import Header from "./component/Header";
import Feed from "./component/Feed";
import PopUp from "./component/PopUp";
import "./App.css";
import WriteIcon from "./component/WriteIcon";
function App() {
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState(null);
  const [viewThreadsFeed, setViewThreadsFeed] = useState(true);
  const [filteredThreads, setFilteredThreads] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupFeedThreads, setPopupFeedThreads] = useState(null);
  const [selectedReplyThread, setSelectedReplyThread] = useState(null);
  const userId = "e626d981-4318-4188-a640-09dbd13e3241";
  const [inputText, setInputText] = useState("");

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?user_uuid=${userId}`
      );
      const data = await response.json();
      setUser(data[0]);
    } catch (error) {
      console.error(error);
    }
  };
  const getThreads = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/threads?thread_from=${userId}`
      );
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getReplies = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/threads?reply_to=${selectedReplyThread?.id}`
      );
      const data = await response.json();
      setPopupFeedThreads(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postThread = async () => {
    const thread = {
      timestamp: new Date(),
      thread_from: user.user_uuid,
      thread_to: user.user_uuid || null,
      reply_to: selectedReplyThread?.id || null,
      text: inputText,
      likes: [],
    };
    const response = await fetch("http://localhost:3000/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(thread),
    });
    const result = await response.json();
    console.log(result);
    getThreads();
    getReplies();
    setInputText("");
  };
  useEffect(() => {
    getReplies();
  }, [selectedReplyThread]);
  const getThreadsFeed = () => {
    if (viewThreadsFeed) {
      const ownthreads = threads?.filter((thread) => thread.reply_to === null);
      setFilteredThreads(ownthreads);
    }
    if (!viewThreadsFeed) {
      const replyThreads = threads?.filter(
        (thread) => thread.reply_to !== null
      );
      setFilteredThreads(replyThreads);
    }
  };
  useEffect(() => {
    getUser();
    getThreads();
  }, []);

  useEffect(() => {
    getThreadsFeed();
  }, [user, threads, viewThreadsFeed]);
  console.log("replythread", selectedReplyThread);
  console.log("popupthread", popupFeedThreads);
  return (
    <>
      {" "}
      {user && (
        <div className="App">
          <Nav url={user.instagram_url} />
          <Header
            user={user}
            viewThreadsFeed={viewThreadsFeed}
            setViewThreadsFeed={setViewThreadsFeed}
          />
          {filteredThreads && (
            <Feed
              setselectedReplyThread={setSelectedReplyThread}
              threads={filteredThreads}
              setOpenPopup={setOpenPopup}
              getThreads={getThreads}
              user={user}
            />
          )}
          {openPopup && (
            <PopUp
              setOpenPopup={setOpenPopup}
              popupFeedThreads={popupFeedThreads}
              inputText={inputText}
              setInputText={setInputText}
              postThread={postThread}
            />
          )}
          <div onClick={() => setOpenPopup(true)}>
            <WriteIcon />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
