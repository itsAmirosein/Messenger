import React, { createRef, useEffect, useState } from "react";
import {
  Avatar,
  ChatHeaderToolWrapper,
  ChatPage,
  ChatTitle,
  MessegeViewHeader,
  MessegeViewWrapper,
  ViewUserTitle,
  ManageMenuWrapper
} from "./StyledComponents";
import * as fa from "react-icons/fa";
import Messege from "./Messege";
import SideMenu from "./SideMenu";



export default function MessegeView({
  title,
  chats,
  clearHistory,
  deleteContact,
  SearchMesseges,
  deleteMessege,
  replyMessege,
  forwardMessege,
  isOpen,
  gender
}) {
  const chatRef = createRef();
  const [chatMenu, setChatMenu] = useState(false);
  const [menuFinder, setMenuFinder] = useState(0)
  useEffect(() => {
    chatRef.current.scrollTo(250, chatRef.current.scrollHeight);
  }, [chatRef]);

  useEffect(
    () =>
      window.addEventListener("click", () => {
        if (chatMenu) {
          setChatMenu(false);
        }
      }),
    [chatMenu]
  );


  return (
    <MessegeViewWrapper>
      <MessegeViewHeader>
        <ViewUserTitle>
          <Avatar gender={gender} />
          <ChatTitle>{title}</ChatTitle>
        </ViewUserTitle>
        <ChatHeaderToolWrapper>
          <fa.FaSearch onClick={SearchMesseges} />
          <fa.FaEllipsisV
            onClick={(eve) => {
              setChatMenu(!chatMenu);
              eve.stopPropagation();
            }}
          />
        </ChatHeaderToolWrapper>
        {chatMenu && (
          <ManageMenuWrapper>
            <span onClick={clearHistory}>Clear chat history</span>
            <span onClick={deleteContact}>Delete this contact</span>
          </ManageMenuWrapper>
        )}
      </MessegeViewHeader>
      <ChatPage ref={chatRef}>
        {chats.length > 0 &&
          chats.map((chat) => {
            return (
              <>
                <Messege
                  key={chat.id}
                  chatName={title}
                  message={chat.messege}
                  messegeTime={chat.messegeTime}
                  isOpponent={chat.isOpponent}
                  messegeId={chat.id}
                  messegeMenuId={menuFinder}
                  replay={chat.replay}
                  menuFinder={(val) => setMenuFinder(val)}
                  isforwarded={chat.isforwarded}
                  deleteMessege={() => deleteMessege(chat.id, chat.isOpponent)}
                  replyMessege={() => replyMessege(chat)}
                  forwardMessege={() => {
                    const forwardTitle = chat.isOpponent ? "You" : title;
                    forwardMessege(forwardTitle, chat.messege);
                  }}
                />
              </>
            );
          })}
      </ChatPage>
      <SideMenu
        messegeSearchMode={SearchMesseges}
        isOpen={isOpen}
        title={title}
        chats={chats}
      />
    </MessegeViewWrapper>
  );
}
