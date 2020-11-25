import React, { useEffect, useRef, useState } from "react";
import { ChatInput, MessegeInputWrapper } from "./StyledComponents";
import { MdSend, MdMic, MdMicOff } from "react-icons/md";

export default function MessegeInput({ onSendMessege }) {
  const [val, setVal] = useState("");
  const [Record, setRecord] = useState(false);
  const inputRef = useRef();

  function handelKeyPress(eve) {
    if (eve.key === "Enter") {
      onSendMessege(val);
      setVal("");
    }
  }

  function handleChange(eve) {
    setVal(eve.target.value)
  }

  function handleSendMessage() {
    onSendMessege(val);
    setVal("");
  }
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;

  const handleRecord = () => {
    if ("speechSynthesis" in window && SpeechRecognition) {
      if (!Record) {
        setRecord(true);
        recognition.start();
        console.log("voice search started");
      } else {
        setRecord(false);
        recognition.stop();
        console.log("voice search ended");
      }
    }
  };
  const resultOfSpeech = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    if (transcript.length !== 0) {
      setRecord(false);
    }
    setVal(transcript);
  };
  useEffect(() => {
    recognition.addEventListener("result", resultOfSpeech);
  });
  return (
    <MessegeInputWrapper value={val}>
      <ChatInput
        ref={inputRef}
        value={val}
        onChange={handleChange}
        onKeyPress={handelKeyPress}
        placeholder="Type a message.."
      />
      {!val ? (
        !Record ? (
          <MdMic onClick={handleRecord} />
        ) : (
          <MdMicOff onClick={handleRecord} />
        )
      ) : (
        <MdSend onClick={handleSendMessage} />
      )}
    </MessegeInputWrapper>
  );
}
