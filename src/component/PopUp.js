import PopUpThread from "./PopUpThread";
import ThreadInput from "./ThreadInput";
function PopUp({
  postThread,
  setOpenPopup,
  popupFeedThreads,
  inputText,
  setInputText,
}) {
  console.log(popupFeedThreads);
  return (
    <div className="popup">
      <p className="close-popup" onClick={() => setOpenPopup(false)}>
        X
      </p>

      {popupFeedThreads?.map((popupFeedThread) => (
        <PopUpThread
          key={popupFeedThread.id}
          popupFeedThread={popupFeedThread}
        />
      ))}

      <ThreadInput
        inputText={inputText}
        setInputText={setInputText}
        postThread={postThread}
      />
    </div>
  );
}

export default PopUp;
