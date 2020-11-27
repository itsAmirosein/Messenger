import React, { useState } from "react";
import Chat from "./Chat";
import SideMenu from "./SideMenu";
import SidePanelSearchBar from "./SidePanelSearchBar";
import { SideWrapper } from "./StyledComponents";

import MenuContext from "./Context";

export default function SidePanel({ onClick, usersData, handelSearch }) {
  const [SideMenuShow, setSideMenuShow] = useState(false);

  const handleClick = () => {
    setSideMenuShow(true);
  };

  const handleShow = () => {
    setSideMenuShow(false);
  };

  return (
    <MenuContext.Provider value={SideMenuShow}>
      <SideWrapper>
        <SidePanelSearchBar
          onClick={handleClick}
          handelOnChange={handelSearch}
        />
        {usersData.map((dataInfo) => {
          return (
            usersData && (
              <Chat
                key={dataInfo.id}
                title={dataInfo.name}
                time={dataInfo.chats.messegeTime}
                gender={dataInfo.gender}
                lastMessage={
                  dataInfo.chats.length > 10
                    ? `${dataInfo.chats.substring(0, 10)}...`
                    : dataInfo.chats.messege
                }
                chatNumbers={dataInfo.chatsLength}
                onClick={() => onClick(dataInfo.id)}
              />
            )
          );
        })}
      </SideWrapper>
      <SideMenu onClick={handleShow} />
    </MenuContext.Provider>
  );
}
