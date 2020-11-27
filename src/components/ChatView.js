import React, {useReducer} from "react";

import MessegeInput from "./MessegeInput";
import MessegeView from "./MessegeView";
import {
  ChatViewWrapper,
  ReplyMessegeWrapper,
  ReplyMessege,
  DeleteReply,
  ReplyOn,
  ReplyText,
} from "./StyledComponents";
import reducer from "./reducer";
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


  const [{ searchMesseges, reply }, dispatch] = useReducer(reducer, {
    searchMesseges: false,
    reply: {
      name: "",
      text: "",
    },
  });

  const handelSendMessege = (val) => {
    dispatch({
      type: "SET_REPLY_CHAT",
      payload: {
        name: "",
        text: "",
      },
    });
    onSendMessege(val);
  };
  const handelReplyMessege = (text) => {
    hadelReply(text.messege, text.isOpponent, text.id);
    dispatch({
      type: "SET_REPLY_MESSEGE",
      payload: {
        name: text.isOpponent ? "You" : userMesseges.name,
        text: text.messege,
      },
    });
  };
  const handleSearchMessege = () => {
    dispatch({
      type: "SEARCH_MESSEGE",
      payload: !searchMesseges,
    });
  };
  return (
    <>
      <ChatViewWrapper isOpen={searchMesseges}>
        {Object.getOwnPropertyNames(userMesseges).length > 0 && (
          <MessegeView
            title={userMesseges.name}
            chats={userMesseges.chats}
            gender={userMesseges.gender}
            clearHistory={clearHistory}
            deleteContact={deleteContact}
            SearchMesseges={handleSearchMessege}
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
                onClick={
                  () =>
                    dispatch({
                      type: "DELETE_REPLY",
                      payload: {
                        name: "",
                        text: "",
                      },
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
