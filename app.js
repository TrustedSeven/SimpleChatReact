const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     console.log(socket);
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    // });
});

port = process.env.PORT || 3000

http.listen(port, () => console.log(`listening on *: ${port}`));