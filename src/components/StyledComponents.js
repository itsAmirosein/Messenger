import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
export const ChatViewWrapper = styled.div`
  position: relative;
  width: calc(100% - 500px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  background-color: #ece5dd;
  background-image: url("./images/initBg.svg");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: ${(props) => (props.isOpen ? "402px" : "0px")};
  transition: all 0.5s ease-in-out;
`;

export const SideWrapper = styled.div`
  position: relative;
  max-width: 100%;
  width: 500px;
  height: 100%;
  background-color: #ffffff;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f0ebcc;
  }

  &::-webkit-scrollbar-thumb {
    background: #16a191;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #128c7e;
  }
`;

export const MessegeInputWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 70px;
  bottom: 0;
  top: auto;
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  padding: 0 20px;
  > svg {
    font-size: 1.6rem;
    color: #333;
    cursor: pointer;
    margin-right: 5px;
    &:last-child {
      color: ${(props) => (!props.value ? "#333" : "#128c7e")};
    }
  }
`;
export const ChatInput = styled.input`
  flex: 0.95;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 1.05rem;
  padding: 0 8px;
`;

export const SideSearchWrapper = styled.div`
  /* position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 70px;
  background-color: #f5f0ebcc;
  > svg {
    font-size: 1.3rem;
    color: #128c7e;
    cursor: pointer;
  } */
`;

export const ChatWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 90px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 0 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #e9e2dc80;
  }
  &:not(:last-child) {
    border-bottom: none;
  }
`;

export const Avatar = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-image: ${(props) =>
    props.gender === "male"
      ? `url("./images/Avatar.svg")`
      : `url("./images/girl.svg")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const ChatLabel = styled.div`
  height: auto;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 20px;
`;

export const ChatTitle = styled.span`
  width: 100%;
  font-size: 1.1rem;
  font-weight: bold;
  margin: 5px;
  text-align: left;
`;

export const LastMessege = styled.span`
  width: 100%;
  font-size: 0.9rem;
`;

export const MessegeTime = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #bbb;
  font-size: 0.95rem;
`;

export const InputSearch = styled.div`
  flex: 0.8;
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
`;

export const MessegeViewWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 70px 0 0 0;
  height: 100%;
  background-color: #ece5dd;
  background-image: url("./images/bgDoodle.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
`;
export const MessegeViewHeader = styled.div`
  z-index: 2;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #fff;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.2);
  top: 0;
  padding: 0 20px;
`;
export const ChatPage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f0ebcc;
  }

  &::-webkit-scrollbar-thumb {
    background: #16a191;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #128c7e;
  }
`;

export const MessegeWrapper = styled.div`
  padding: 4px 30px 4px 10px;
  border-radius: 5px;
  /* margin-left: ${(props) =>
    props.isOpponent ? "px" : "auto"} !important; */
  background-color: ${(props) => (props.isOpponent ? "#fff" : "#DCF8C6")};
  color: #222;
  display: flex;
  width: 100%;
  max-width: 700px;
  flex-direction: row;
  position: relative;
  > div {
    font-size: 0.95rem;
  }

`;

export const ViewUserTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 200px;
`;

export const ChatHeaderToolWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > svg {
    font-size: 1.3rem;
    margin-left: 30px;
    color: #128c7e;
    cursor: pointer;
  }
`;

export const SideMenuWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 400px;
  max-width: 100%;
  position: fixed;
  border-left: 1px solid #e0e0e0;
  top: 0;
  right: 0;
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
  transition: all 0.5s ease-in-out;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(100%)"};
  span {
    margin-top: 200px;
    color: #aaa;
    font-size: 0.9rem;
  }
`;
export const ChatNumbers = styled.span`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 0.7rem;
  transition: all 0.2s ease;
  background-color: #d6d6d6;
  color: #f2f2f2;
  min-width: 20px;
  min-height: 20px;
  padding: 0px 2px;
  border-radius: 50%;
  display: grid;
  place-items: center;
`;
export const FilterSearch = styled.p`
  width: 90%;
  font-size: 0.9rem;
  text-align: left;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    &:first-child {
      text-align: left;
    }
    &:nth-child(2) {
      margin-left: 5px;
    }
  }
`;
export const SideMenuHeader = styled.div`
  position: absolute;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  color: #aaa;
  align-items: center;

  svg {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.2s ease;
    font-size: 1.3rem;
    color: ${(props) => (props.darkmode ? "#f2f2f2" : "#444")};
    cursor: pointer;
  }
`;
export const SideMenuInput = styled.input`
  width: 90%;
  height: 35px;
  color: ${(props) => (props.darkmode ? "#f2f2f2" : "#222")};
  border: none;
  position: relative;
  outline: none;
  padding: 0 5px;
  margin-top: 100px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  background-color: transparent;
  &::placeholder {
    color: #ccc;
  }
`;

export const Enter = keyframes`
from{
  transform:translateY(100%)

}

to{
  transform:translateY(0)
}
`;

export const ReplyMessegeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: #f0f0f0;
  animation: ${Enter} 0.2s ease;
  font-family: "Roboto", sans-serif !important;
`;
export const ReplyMessege = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 70%;
  margin: 7px 0 0 20px;
  background-color: #dadada;
  border: none;
  border-left: 6px solid #6bcbef;
  border-radius: 7px;
  font-family: "Roboto", sans-serif !important;
`;
export const DeleteReply = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  padding: 10px 30px;
  right: 10px;
  color: #919191;
  svg {
    cursor: pointer;
  }
`;
export const ReplyOn = styled.div`
  padding: 5px;
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => (props === "You" ? "#6BCBEF" : " #416E23")};
`;
export const ReplyText = styled.div`
  padding: 5px;
  font-size: 15px;
  font-family: "Roboto";
`;

export const MessegeMenu = styled.span`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #222;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    cursor: pointer;
  }
`;

export const fadeIn = keyframes`
  from {
   opacity:0;
  }

  to {
    opacity:1;
  }
`;

export const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 0;
  }

  to {
    transform: scale(.25);
    opacity: 1;
  }
`;

export const MessegeMenuList = styled.span`
  border: 1px solid #dce0db;
  outline: none;
  background-color: white;
  width: 140px;
  z-index: 100;
  position: absolute;
  right: 0;
  top: calc(100% + -7px);
  color: #222;
  transition: all 2s linear;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 5px;
  animation: ${(props) => (props.out ? fadeIn : fadeOut)} 0.3s ease;
`;
export const Item = styled.div`
  border-bottom: 1px solid silver;
  padding: 10px 10px;
  font-size: 12px;
  font-weight: 700;
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #ced1cc;
    cursor: pointer;
    &:first-child {
      border-radius: 4px 4px 0px 0px;
    }
    &:last-child {
      border-radius: 0px 0px 4px 4px;
    }
    &:active {
      background-color: #8b8e8a;
    }
  }
`;

export const MessegeboxWrapper = styled.div`
  margin: 40px 30px;
  padding: 4px 10px;
  border-radius: 5px;
  margin-left: ${(props) => (props.isOpponent ? "30px" : "auto")} !important;
  background-color: ${(props) => (props.isOpponent ? "#fff" : "#DCF8C6")};
  color: #222;
  display: flex;
  width: fit-content;
  max-width: 700px;
  flex-direction: column;
  position: relative;
`;
export const Replay = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border-left: ${(props) =>
    props.rep ? " 3px solid #34B7F1" : " 3px solid #d31eca"};
  outline: none;
  border-radius: 4px;
`;
export const ReplayName = styled.div`
  padding: 10px 10px 4px 10px;
  font-size: 13px;
  font-weight: 700;
  color: ${(props) => (props.rep ? "#34B7F1" : "#d31eca")};
`;

export const ReplText = styled.div`
  padding: 4px 10px;
  font-family: sans-serif;
  font-size: 14px;
`;

export const Forward = styled.div`
  background-color: #bee3b4;
  border-left: 3px solid #416e23;
  outline: none;
  border-radius: 4px;
`;

export const ForwardText = styled.div`
  padding: 7px 10px;
  font-family: sans-serif;
  font-size: 14px;
`;
export const ForwardLabel = styled.span`
  color: #416e23;
  font-size: 12px;
  font-weight: 700;
`;
export const ForwardFrom = styled.span`
  font-size: 13px;
  font-weight: 700;
`;
export const ReadMore = styled.span`
  color: #34b7f1;
  cursor: pointer;
  margin-left: 2px;
`;
export const ManageMenuWrapper = styled.div`
  width: auto;

  position: absolute;
  z-index: 999;
  top: 50px;
  right: 30px;
  background-color: #fff;
  transition: all 0.2s ease;
  border-radius: 5px;
  box-shadow: 0px 0px 3px rgba(100, 100, 100, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  span {
    font-size: 0.93rem;
    width: 100%;
    padding: 5px 10px;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
      background-color: #e2e2e2;
    }
  }
`;

export const MenuBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 70px;
  background-color: #f5f0ebcc;
  > svg {
    font-size: 1.3rem;
    color: #128c7e;
    cursor: pointer;
  }
`;

export const SearchBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  transition: 2s ease;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 70px;
  background-color: #f5f0ebcc;
  > svg {
    font-size: 1.3rem;
    color: #128c7e;
    cursor: pointer;
  }
`;
export const SearchInput = styled.input`
  border: none;
  height: 47.2px;
  width: 410.4px;
  outline: none;
  padding: 1px 2px 1px 2px;
  min-height: auto;
  min-width: auto;
  font-size: 0.9rem;
  background-color: #f5f0ebcc;
`;

export const ForwardTo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgb(232, 236, 232, 0.7);
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 99;
  animation: ${fadeIn} 0.2s ease;
`;

export const UserWrapper = styled.div`
  position: relative;
  z-index: 99;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width:500px;
  height: 90px;
  background-color: white;
  border: 1px solid #e0e0e0;
  padding: 0 15rem 0 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #e9e2dc80;
  }
  &:last-child {
    border-radius: 0 0 7px 7px;
  }
  &:not(:last-child) {
    border-bottom: none;
  }
`;
export const UserTitle = styled.div`
  width: 100%;
  font-size: 1.1rem;
  font-weight: bold;
  margin: 5px;
`;
export const Title = styled.div`
  display: flex;
  background-color: #2cbacf;
  padding: 1rem 14.6rem 1rem 1.5rem;
  border-radius: 7px 7px 0 0;
  color: #0f393f;
  align-items:center;
  width:500px;
  svg{
    margin-right:10px;
    cursor:pointer;
  }
`;

export const MessegeTimer = styled.span`
  color: #bbb;
  font-size: 0.8rem;
  align-items: center;
  margin: 2px 3px 0 4px;

`;
