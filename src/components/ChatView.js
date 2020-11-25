import React, { useState } from "react";

import MessegeInput from "./MessegeInput";
import MessegeView from "./MessegeView";
import { ChatViewWrapper,ReplyMessegeWrapper,ReplyMessege,DeleteReply,ReplyOn,ReplyText } from "./StyledComponents";

import * as fa from "react-icons/fa";


export default function ChatView({
  userMesseges,
  onSendMessege,
  clearHistory,
  deleteContact,
  deleteMessege,
  hadelReply,
  forwardMessege,
}) {
  const [searchMesseges, setSearchMesseges] = useState(false);
  const [reply, setReply] = useState({
    name: "",
    text: "",
  });

  const handelSendMessege = (val) => {
    setReply({
      name: "",
      text: "",
    });
    onSendMessege(val);
  };

  const handelReplyMessege = (text) => {
    hadelReply(text.messege, text.isOpponent, text.id);

    setReply({
      name: text.isOpponent ? "You" : userMesseges.name,
      text: text.messege,
    });
  };

  return (
    <>
      <ChatViewWrapper isOpen={searchMesseges}>
        {Object.getOwnPropertyNames(userMesseges).length > 0 && (
          <MessegeView
            title={userMesseges.name}
            chats={userMesseges.chats}
            clearHistory={clearHistory}
            deleteContact={deleteContact}
            SearchMesseges={() => setSearchMesseges(!searchMesseges)}
            deleteMessege={deleteMessege}
            isOpen={searchMesseges}
            replyMessege={handelReplyMessege}
            forwardMessege={(from, text) => forwardMessege(from, text)}
          />
        )}
        {reply.text && (
          <ReplyMessegeWrapper name={reply.name}>
            <DeleteReply>
              <fa.FaTimes
                size={"20px"}
                onClick={() =>
                  setReply({
                    name: "",
                    text: "",
                  })
                }
              />
            </DeleteReply>

            <ReplyMessege>
              <ReplyOn name={reply.name}>{reply.name}</ReplyOn>
              <ReplyText>{reply.text}</ReplyText>
            </ReplyMessege>
          </ReplyMessegeWrapper>
        )}

        {Object.getOwnPropertyNames(userMesseges).length > 0 && (
          <MessegeInput onSendMessege={handelSendMessege} />
        )}
      </ChatViewWrapper>
    </>
  );
}
