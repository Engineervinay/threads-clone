import React from "react";

function ThreadInput({ postThread, inputText, setInputText }) {
  return (
    <div>
      <p>vinay</p>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button className="primary" onClick={postThread}>
        Post
      </button>
    </div>
  );
}

export default ThreadInput;
