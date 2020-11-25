import { useEffect, useState } from "react";
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

function App() {
  const [id, setId] = useState(null);
  const [chat, setChat] = useState({});
  const [userMesseges, setUserMesseges] = useState({});
  const [users, setUsers] = useState({
    allUsers: [],
    filteredUsers: [],
  });
  const [replay, setReplay] = useState({
    text: "",
    isOpponent: false,
    id: 0,
  });

  const [forward, setForward] = useState({
    forwarded: false,
    text: "",
    from: "",
  });

  const handelClearHistory = () => {
    const copyUserMesseges = { ...userMesseges };
    copyUserMesseges.chats = [];
    const copyUsers = [...users.allUsers];
    const userFinde = { ...users.allUsers.find((item) => item.id === id) };
    const userIndex = users.allUsers.findIndex((item) => item.id === id);
    userFinde.chats = [];
    copyUsers[userIndex] = userFinde;

    setUsers({
      allUsers: users.allUsers,
      filteredUsers: copyUsers,
    });
    setUserMesseges(copyUserMesseges);
    axios.post("http://localhost:3001/clearHistory", {
      id,
    });
  };

  const handelDeleteContact = () => {
    const copyUsers = [...users.filteredUsers];
    const usersFiltere = copyUsers.filter((item) => item.id !== id);
    setUsers({
      allUsers: users.allUsers,
      filteredUsers: usersFiltere,
    });
    setUserMesseges({});
    axios.post("http://localhost:3001/deleteUser", {
      id,
    });
  };

  const handelDeleteMessege = (messegeId, isOpponent) => {
    const copyUserMesseges = { ...userMesseges };
    const messegeFinder = {
      ...copyUserMesseges.chats.find((item) => item.id === messegeId),
    };
    const copyMesseges = [...copyUserMesseges.chats];
    let copyItem = {};
    copyMesseges.forEach((item) => {
      if (
        item.id !== messegeId &&
        Object.getOwnPropertyNames(item.replay).length > 0
      ) {
        if (item.replay.id === messegeId) {
          copyItem = { ...item };
          const copyReplay = { ...item.replay };

          copyReplay.text = isOpponent
            ? "This message was deleted"
            : "You delete this message";
          copyItem.replay = copyReplay;
          copyMesseges[item.id - 1] = copyItem;
          copyUserMesseges.chats = copyMesseges;
        }
      }
    });

    messegeFinder.messege = isOpponent
      ? "This message was deleted"
      : "You delete this message";
    const messegeIndex = copyUserMesseges.chats.findIndex(
      (item) => item.id === messegeId
    );
    copyUserMesseges.chats[messegeIndex] = messegeFinder;
    console.log(copyUserMesseges, "copyusermessege");
    setUserMesseges(copyUserMesseges);
    if (messegeId === userMesseges.chats.length) {
      const copyUsers = [...users.filteredUsers];
      const messegeFinder = { ...copyUsers.find((item) => item.id === id) };
      const userIndex = copyUsers.findIndex((item) => item.id === id);
      const userMessege = { ...messegeFinder.chats };
      userMessege.messege = isOpponent
        ? "This message was deleted"
        : "You delete this message";
      messegeFinder.chats = userMessege;
      copyUsers[userIndex] = messegeFinder;
      setUsers({
        allUsers: users.allUsers,
        filteredUsers: copyUsers,
      });
      console.log(copyUsers, "all users");
    }
    axios.post("http://localhost:3001/deleteMessege", {
      messegeId,
      id,
      item: copyItem,
    });
  };

  const handelReplyMessege = (text, isOpponent, id) => {
    console.log(id, "id");
    setReplay({
      text,
      isOpponent,
      id,
    });
  };

  const handelForward = (from, text) => {
    setForward({
      forwarded: true,
      text,
      from,
    });
  };

  const handelClickForward = (id) => {
    setId(id);
  };

  const onClick = (id) => {
    if (!forward.text) {
      setId(id);
    }
    const copyUsers = [...users.filteredUsers]
    const userFinder = { ...users.filteredUsers.find(item => item.id === id) }
    const userIndex = users.filteredUsers.findIndex(item => item.id === id)
    userFinder.chatsLength = 0
    copyUsers[userIndex] = userFinder
    setUsers({
      allUsers:users.allUsers,
      filteredUsers:copyUsers
    })
    fetch("http://localhost:3001/getInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((res) => {
        setUserMesseges(res);
      });
  };

  const handelSearch = (val) => {
    const copyUsers = [...users.allUsers];
    const finde = copyUsers.filter((items) =>
      items.name.toLowerCase().includes(val.toLowerCase())
    );
    setUsers({
      ...users,
      filteredUsers: finde,
    });
  };

  const handelChat = (value) => {
    let userchat = { ...users.allUsers[id - 1].chats };
    const userId = ++userchat.id;
    setChat({
      id: userId,
      messege: value,
      isOpponent: false,
      messegeTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      replay: replay.text ? replay : {},
      isforwarded: forward.text ? { from: forward.from } : {},
    });
    setReplay({});
    console.log(replay, "replay");
  };

  useEffect(() => {
    if (!id) {
      fetch("http://localhost:3001/getfirstinfo")
        .then((res) => res.json())
        .then((Demo) => {
          if (Demo) {
            setUsers({
              allUsers: Demo,
              filteredUsers: Demo,
            });
            console.log("filtered Users", users.filteredUsers);
          }
        });
    } else if (forward.forwarded) {
      setForward({
        forwarded: false,
        text: forward.text,
        from: forward.from,
      });
      handelChat(forward.text);
    }
  }, [id]);

  useEffect(() => {
    console.log(chat, "this is my pm");
    if (Object.getOwnPropertyNames(chat).length > 0) {
      if (!forward.text) {
        console.log("fucking fetch");
        fetch("http://localhost:3001/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chat, id }),
        })
          .then((res) => res.json())
          .then((res) => console.log("server res ", res));

        console.log(users, "usersBefore");
        const userFinder = { ...users.filteredUsers.find((item) => item.id === id) };
        const userIndex = users.filteredUsers.findIndex((item) => item.id === id);
        const newUsers = [...users.filteredUsers];
        userFinder.chats = chat;
        newUsers.splice(userIndex, 1);
        newUsers.unshift(userFinder)
        setUsers({ allUsers: users.allUsers, filteredUsers: newUsers });
        console.log(users, "users");
        setChat({});
        if (Object.getOwnPropertyNames(chat.isforwarded).length === 0) {
          const copyUserMesseges = { ...userMesseges };
          const copyChats = [...copyUserMesseges.chats];
          copyChats.push(chat);
          copyUserMesseges.chats = copyChats;
          setUserMesseges(copyUserMesseges);
        }
      }
      if (forward.text) {
        onClick(id);
        console.log(id, "frw id");
        console.log(userMesseges, "userfrwd meseg");
      }
    }
  }, [chat, forward]);

  useEffect(() => {
    if (forward.text) {
      const copyUserMesseges = { ...userMesseges };
      const copyChats = [...copyUserMesseges.chats];
      copyChats.push(chat);
      copyUserMesseges.chats = copyChats;
      console.log(copyUserMesseges, "cpuM");
      setUserMesseges(copyUserMesseges);
      setForward({
        forwarded: false,
        text: "",
        from: "",
      });
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
                setForward({
                  forwarded: false,
                  text: "",
                  from: "",
                })
              }
            />
            Chose your Contact ...
          </Title>
          <div>
            {users.allUsers.map((item) => (
              <UserWrapper onClick={() => handelClickForward(item.id)}>
                <Avatar />
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
        />
      </Wrapper>
    </>
  );
}

export default App;
