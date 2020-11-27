let DATA = require('./serverData');

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/add", (req, res) => {
  const { chat, id } = req.body;
  const user = DATA.find((item) => +item.id === +id);
  user.chats.push(chat);
  res.send(JSON.stringify(user));
});

app.post("/getInfo", (req, res) => {
  const { id } = req.body;
  const user = DATA.find((item) => item.id === id);
  res.send(
    JSON.stringify({
      name: user.name,
      id: user.id,
      gender:user.gender,
      chats: user.chats,
      
    })
  );
});

app.get("/getfirstinfo", (req, res) => {
  const UsersDemo = DATA.map(item => {

    return {
      name: item.name,
      gender: item.gender,
      id: item.id,
      chats: item.chats.length > 0 ? item.chats[item.chats.length - 1] : '',
      chatsLength: item.chats.length,
  
    }
  })
  res.send(JSON.stringify(UsersDemo));
});

app.post("/clearHistory",(req,res)=>{
  const {id} = req.body
  const userFinder = DATA.find(item=>item.id===id)
  userFinder.chats =[]
  res.send(JSON.stringify(userFinder))
})
app.post('/deleteUser',(req,res)=>{
  const {id}= req.body
  DATA = DATA.filter(item=>item.id!==id)
res.send('done!')
})

app.post('/deleteMessege',(req,res)=>{
const {messegeId,id,item}= req.body
const user= DATA.find(item=>item.id===id)
const userChat = user.chats.find(item=>item.id ===messegeId)
userChat.messege = userChat.isOpponent ? 'This message was deleted' : 'You delete this message'
const userReply = user.chats.find(chat=>chat.id===item.id)
userReply.replay = item.replay
})
app.listen(3001);
