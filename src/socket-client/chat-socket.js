// const socket = io("http://localhost:3000")
const socket = io('http://localhost:5058', { transports: ['websocket'] });

const message = document.getElementById('message');
const messages = document.getElementById('messages');

const handleSubmitNewMessage = () => {
  console.log("hello1");
  socket.emit('message', { data: message.value })
}

socket.on('message', ({ data }) => {
  console.log("hello2");
  handleNewMessage(data);

})

const handleNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
}

const buildNewMessage = (message) => {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(message))
  return li;
}