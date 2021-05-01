const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require('http')
const socketio = require('socket.io')
const connectSpotify = require('./config/spotify');


// Initializing application
const app = express();
const server = http.createServer(app)
const io = socketio(server, { cors: { origin: '*' } })
app.set('socketio', io)
app.set('songRequests', [])
app.set('terminateScheduling', false)


// Requiring routes
const suggestionRouter = require('./app/routes/suggestion')

const PORT = process.env.PORT || 5000;



// Loading config file
dotenv.config({ path: "./config/config.env" });



// Middlewares for parsing data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


// Using routes
app.use('/', suggestionRouter)


io.on('connection', socket => {
    console.log('Connection id: ', socket.id)
    io.emit('connected', {
        connectionId: socket.id,
        msg: 'Connection esatblished'
    })
})




// Fetch fetchSongs
// fetchNewSongs()


// Starting Server
server.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
    )
);
