import axios from "axios";
export default function reducer(state, action) {
  const { id, chat, userMesseges, users, replay, forward } = state;

  switch (action.type) {
    case "SET_USERS":
      const copyUsers = [...users.allUsers];
      const userFinde = { ...users.allUsers.find((item) => item.id === id) };
      const userIndex = users.allUsers.findIndex((item) => item.id === id);
      userFinde.chats = [];
      userFinde.chatsLength = 0
      copyUsers[userIndex] = userFinde;
      return {
        ...state,
        users: {
          allUsers: users.allUsers,
          filteredUsers: copyUsers,
        },
      };
    case "SET_USER_MESSAGES":
      const copyUserMesseges = { ...userMesseges };
      copyUserMesseges.chats = [];
      return {
        ...state,
        userMesseges: copyUserMesseges,
      };
    case "SET_DELETE_USERS":
      const copyUsersDelete = [...users.filteredUsers];
      const usersFiltere = copyUsersDelete.filter((item) => item.id !== id);
      return {
        ...state,
        users: {
          allUsers: users.allUsers,
          filteredUsers: usersFiltere,
        },
      };
    case "DELETE_MESSAGES":
      return {
        ...state,
        userMesseges: {},
      };
    case "DEL_MESSAGE":
      const copyUserMessegesDel = { ...userMesseges };
      const messegeFinder = {
        ...copyUserMessegesDel.chats.find(
          (item) => item.id === action.payload.messegeId
        ),
      };
      const copyMesseges = [...copyUserMessegesDel.chats];
      let copyItem = {};
      copyMesseges.forEach((item) => {
        if (
          item.id !== action.payload.messegeId &&
          Object.getOwnPropertyNames(item.replay).length > 0
        ) {
          if (item.replay.id === action.payload.messegeId) {
            copyItem = { ...item };
            const copyReplay = { ...item.replay };

            copyReplay.text = action.payload.isOpponent
              ? "This message was deleted"
              : "You delete this message";
            copyItem.replay = copyReplay;
            copyMesseges[item.id - 1] = copyItem;
            copyUserMessegesDel.chats = copyMesseges;
          }
        }
        axios.post("http://localhost:3001/deleteMessege", {
          messegeId: action.payload.messegeId,
          id,
          item: copyItem,
        });
      });

      messegeFinder.messege = action.payload.isOpponent
        ? "This message was deleted"
        : "You delete this message";
      const messegeIndex = copyUserMessegesDel.chats.findIndex(
        (item) => item.id === action.payload.messegeId
      );
      copyUserMessegesDel.chats[messegeIndex] = messegeFinder;
      return {
        ...state,
        userMesseges: copyUserMessegesDel,
      };
    case "USER_FILTER":
      if (action.payload.messegeId === userMesseges.chats.length) {
        const copyUsers = [...users.filteredUsers];
        const messegeFinder = { ...copyUsers.find((item) => item.id === id) };
        const userIndex = copyUsers.findIndex((item) => item.id === id);
        const userMessege = { ...messegeFinder.chats };
        userMessege.messege = action.payload.isOpponent
          ? "This message was deleted"
          : "You delete this message";
        messegeFinder.chats = userMessege;
        copyUsers[userIndex] = messegeFinder;
      }

      return {
        ...state,
        users: {
          allUsers: users.allUsers,
          filteredUsers: copyUsers,
        },
      };
    case "SET_REPLAY":
      return {
        ...state,
        replay: action.payload,
      };
    case "SET_FORWARD":
      return {
        ...state,
        forward: action.payload,
      };
    case "SET_ID":
      return {
        ...state,
        id: action.payload,
      };
    case "SET_FORWARD_ID":
      return {
        ...state,
        id: action.payload,
      };
    case "USERS_FORWARD":
      const copyUsersForward = [...users.filteredUsers];
      const userFinder = {
        ...users.filteredUsers.find((item) => item.id === action.payload),
      };
      const userIndexForward = users.filteredUsers.findIndex(
        (item) => item.id === action.payload
      );
      userFinder.chatsLength = 0;
      copyUsersForward[userIndexForward] = userFinder;
      return {
        ...state,
        users: {
          allUsers: users.allUsers,
          filteredUsers: copyUsersForward,
        },
      };
    case "FETCH_MESSAGES":
      return {
        ...state,
        userMesseges: action.payload,
      };
    case "SEARCH_USERS":
      const copyUsersSearch = [...users.allUsers];
      const finde = copyUsersSearch.filter((items) =>
        items.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        users: {
          ...users,
          filteredUsers: finde,
        },
      };
    case "SET_CHAT":
      let userchat = {...userMesseges.chats[userMesseges.chats.length - 1]};
      const userId = ++userchat.id;
      return {
        ...state,
        chat: {
          id: userId,
          messege: action.payload,
          isOpponent: false,
          messegeTime: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          replay: replay.text ? replay : {},
          isforwarded: forward.text ? { from: forward.from } : {},
        },
      };
    case "SET_REPLAY_CHAT":
      return {
        ...state,
        replay: {},
      };
    case "SET_FETCH_DEMO":
      return {
        ...state,
        users: action.payload,
      };
    case "ADD_USER":
      const userFinderAdd = {
        ...users.filteredUsers.find((item) => item.id === id),
      };
      const userIndexAdd = users.filteredUsers.findIndex(
        (item) => item.id === id
      );
      const newUsers = [...users.filteredUsers];
      userFinderAdd.chats = action.payload;
      newUsers.splice(userIndexAdd, 1);
      newUsers.unshift(userFinderAdd);
      return {
        ...state,
        users: {
          allUsers: users.allUsers,
          filteredUsers: newUsers,
        },
      };
    case "REMOVE_CHAT":
      return {
        ...state,
        chat: {},
      };
    case "USER_MESSEGES_FETCH_ADD":
      const copyUserMessegesAdd = { ...userMesseges };
      const copyChats = [...copyUserMessegesAdd.chats];
      copyChats.push(action.payload)
      copyUserMessegesAdd.chats = copyChats;
      return {
        ...state,
        userMesseges: copyUserMessegesAdd,
      };
    case "USER_MESSEGES_FORWARD_TEXT":
      const copyUserMessegesTXT = { ...userMesseges };
      const copyChatsTXT = [...copyUserMessegesTXT.chats];
      copyChatsTXT.push(chat);
      copyUserMessegesTXT.chats = copyChatsTXT;
      return {
        ...state,
        userMesseges: copyUserMessegesTXT,
      };
    case "SET_FORWARD_TEXT":
      return {
        ...state,
        forward: action.payload,
      };
    case "SET_FORWARD_LIST_USERS":
      return {
        ...state,
        forward: action.payload,
      };
    case "SET_REPLY_CHAT":
      return {
        ...state,
        reply: action.payload,
      };
    case "SET_REPLY_MESSEGE":
      return {
        ...state,
        reply: action.payload,
      };
    case "DELETE_REPLY":
      return {
        ...state,
        reply: action.payload,
      };
    case "SEARCH_MESSEGE":
      return {
        ...state,
        searchMesseges: action.payload,
      };
    case "SET_COLLAPSE":
      return {
        ...state,
        isCollapse: true,
      };
    case "MOUSE_OVER":
      return {
        ...state,
        showMessegeMenu: true,
      };
    case "MOUSE_OUT":
      return {
        ...state,
        showMessegeMenu: false,
      };
    default:
      return state;
  }
}
