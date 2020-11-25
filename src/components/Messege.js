import React, { useEffect, useState } from "react";
import {
  MessegeWrapper,
  MessegeMenu,
  ForwardLabel,
  ForwardFrom,
  ReadMore,
  MessegeMenuList,
  Item,
  MessegeboxWrapper,
  Replay,
  ReplayName,
  ReplText,
  Forward,
  ForwardText,
  MessegeTimer,
} from "./StyledComponents";
import * as fa from "react-icons/fa";

function Messege({
  message,
  isOpponent,
  deleteMessege,
  replyMessege,
  replay,
  chatName,
  forwardMessege,
  isforwarded,
  messegeTime,
  menuFinder,
  messegeId,
  messegeMenuId
}) {
  const [messegeMenu, setMessegeMenu] = useState(false);
  const [showMessegeMenu, setShowMessegeMenu] = useState(false);
  const [isCollapse, setIsCollapse] = useState(false);
  useEffect(() => {
    window.addEventListener("click", () => {
    if(messegeMenuId>0){
        menuFinder(0)
    }
      
    });
  });

  const handelMessegeMenu = (eve) => {
    if(messegeMenuId !== messegeId){
    menuFinder(messegeId)
    }
    else{
      menuFinder(0)
    }
    eve.stopPropagation();
  };
  const handleCollapse = () => {
    setIsCollapse(true);
  };
  return (
    <>
      <MessegeboxWrapper
        isOpponent={isOpponent}
        onMouseOver={() => setShowMessegeMenu(true)}
        onMouseOut={() => setShowMessegeMenu(false)}
      >
        {Object.getOwnPropertyNames(replay).length > 0 && (
          <Replay isOpponent={isOpponent} rep={replay.isOpponent}>
            <ReplayName rep={replay.isOpponent}>
              {replay.isOpponent ? "You" : chatName}
            </ReplayName>
            <ReplText>
              {replay.text.length > 290
                ? `${replay.text.substring(0, 290)}...`
                : replay.text}
            </ReplText>
          </Replay>
        )}
        {Object.getOwnPropertyNames(isforwarded).length > 0 && (
          <Forward>
            <ForwardText>
              <ForwardLabel>forwarded from </ForwardLabel>
              <ForwardFrom>{isforwarded.from}</ForwardFrom>
            </ForwardText>
          </Forward>
        )}
        <MessegeWrapper isOpponent={isOpponent}>
          <div>
            {!isCollapse ? (
              message.length > 600 ? (
                <div>
                  {message.substring(0, 600)}...
                  <ReadMore onClick={handleCollapse}>Read more</ReadMore>
                </div>
              ) : (
                  message
                )
            ) : (
                message
              )}
          </div>
          <MessegeTimer>{messegeTime}</MessegeTimer>
          <MessegeMenu mode={isOpponent} show={showMessegeMenu}>
            <fa.FaChevronDown onClick={handelMessegeMenu} />
          </MessegeMenu>
          {/* {console.log(messageId,messegeMenuId,)} */}
          {messegeMenuId === messegeId && (
            <MessegeMenuList out={messegeMenuId === messegeId} mode={isOpponent}>
              <Item onClick={deleteMessege}>Delete message</Item>
              <Item onClick={replyMessege}>Reply message</Item>
              <Item onClick={forwardMessege}>Forward message</Item>
            </MessegeMenuList>
          )}
        </MessegeWrapper>
      </MessegeboxWrapper>
    </>
  );
}

export default Messege;
