const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>');
});

let messages = [];

io.on('connection', socket => {
  console.log('a user connected');

  socket.emit('news', { messages });

  socket.on('chat message', message => {
    console.log(`New message ${message}`);
    messages.push(message);
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});