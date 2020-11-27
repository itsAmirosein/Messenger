import { useEffect, useReducer } from "react";
import ChatView from "./components/ChatView";
import SidePanel from "./components/SidePanel";
import { Wrapper, Avatar, ChatLabel } from "./components/StyledComponents";
import axios from "axios";
import * as fa from "react-icons/fa";
import {
  ForwardTo,
  UserWrapper,
  UserTitle,
  Title,
} from "./components/StyledComponents";
import reducer from "./components/reducer";

function App() {
  const [
    { id, chat, userMesseges, users, forward },
    dispatch,
  ] = useReducer(reducer, {
    id: null,
    chat: {},
    userMesseges: {},
    users: {
      allUsers: [],
      filteredUsers: [],
    },
    replay: {
      text: "",
      isOpponent: false,
      id: 0,
    },
    forward: {
      forwarded: false,
      text: "",
      from: "",
    },
  });

  const handelClearHistory = () => {
    dispatch({
      type: "SET_USERS",
    });
    dispatch({
      type: "SET_USER_MESSAGES",
    });

    axios.post("http://localhost:3001/clearHistory", {
      id,
    });
  };

  const handelDeleteContact = () => {
    dispatch({
      type: "SET_DELETE_USERS",
    });

    dispatch({
      type: "DELETE_MESSAGES",

    });

    axios.post("http://localhost:3001/deleteUser", {
      id,
    });
  };

  const handelDeleteMessege = (messegeId, isOpponent) => {
    dispatch({
      type: "DEL_MESSAGE",
      payload: { messegeId, isOpponent },
    });
    dispatch({
      type: "USER_FILTER",
      payload: { messegeId, isOpponent },
    });
  };

  const handelReplyMessege = (text, isOpponent, id) => {
    dispatch({
      type: "SET_REPLAY",
      payload: {
        text,
        isOpponent,
        id,
      },
    });
  };

  const handelForward = (from, text) => {
    dispatch({
      type: "SET_FORWARD",
      payload: {
        forwarded: true,
        text,
        from,
      },
    });
  };

  const handelClickForward = (id) => {
    dispatch({
      type: "SET_ID",
      payload: id,
    });
  };

  const onClick = (id) => {
    if (!forward.text) {
      dispatch({
        type: "SET_FORWARD_ID",
        payload: id,
      });
    }

    dispatch({
      type: "USERS_FORWARD",
      payload: id,
    });

    fetch("http://localhost:3001/getInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "FETCH_MESSAGES",
          payload: res,
        });
      });
  };

  const handelSearch = (val) => {
    dispatch({
      type: "SEARCH_USERS",
      payload: val,
    });
  };

  const handelChat = (value) => {
    dispatch({
      type: "SET_CHAT",
      payload: value,
    });
    dispatch({
      type: "SET_REPLAY_CHAT",
    });
  };

  useEffect(() => {
    if (!id) {
      fetch("http://localhost:3001/getfirstinfo")
        .then((res) => res.json())
        .then((Demo) => {
          if (Demo) {
            dispatch({
              type: "SET_FETCH_DEMO",
              payload: {
                allUsers: Demo,
                filteredUsers: Demo,
              },
            });

         
          }
        });
    } else if (forward.forwarded) {
      

      dispatch({
        type: "SET_DEMO_FORWARD",
        payload: {
          forwarded: false,
          text: forward.text,
          from: forward.from,
        },
      });
      onClick(id);
    }
  }, [id]);

  useEffect(() => {
    if (Object.getOwnPropertyNames(chat).length > 0) {
      if (!forward.text) {
        fetch("http://localhost:3001/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chat, id }),
        })
        

        dispatch({
          type: "ADD_USER",
          payload:chat
        });

        dispatch({
          type: "REMOVE_CHAT",
        });

        if (Object.getOwnPropertyNames(chat.isforwarded).length === 0) {
          dispatch({
            type: "USER_MESSEGES_FETCH_ADD",
            payload:chat,
          });
        }
      }
      else {
        dispatch({
          type: "USER_MESSEGES_FORWARD_TEXT",
        });
  
        dispatch({
          type: "SET_FORWARD_TEXT",
          payload: {
            forwarded: false,
            text: "",
            from: "",
          },
        });
      }
    }
  }, [chat, forward]);

  useEffect(() => {
    if (forward.text) {
      handelChat(forward.text);

    }
  }, [userMesseges]);

  return (
    <>
      {forward.forwarded && (
        <ForwardTo>
          <Title>
            {" "}
            <fa.FaTimes
              onClick={() =>
                dispatch({
                  type: "SET_FORWARD_LIST_USERS",
                  payload: {
                    forwarded: false,
                    text: "",
                    from: "",
                  },
                })
              }
            />
            Chose your Contact ...
          </Title>
          <div>
            {users.allUsers.map((item) => (
              <UserWrapper onClick={() => handelClickForward(item.id)}>
                <Avatar gender={item.gender} />
                <ChatLabel>
                  <UserTitle>{item.name}</UserTitle>
                </ChatLabel>
              </UserWrapper>
            ))}
          </div>
        </ForwardTo>
      )}

      <Wrapper>
        {users.allUsers.length > 0 && (
          <SidePanel
            onClick={onClick}
            usersData={users.filteredUsers}
            handelSearch={handelSearch}
          />
        )}
        <ChatView
          userMesseges={userMesseges}
          onSendMessege={handelChat}
          clearHistory={handelClearHistory}
          deleteContact={handelDeleteContact}
          deleteMessege={handelDeleteMessege}
          hadelReply={handelReplyMessege}
          forwardMessege={handelForward}
          usersData={users.filteredUsers}
        />
      </Wrapper>
    </>
  );
}

export default App;
