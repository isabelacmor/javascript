/**
 * Declare all variables
 *
 * @var fs The file system handler
 * @var app The server app running
 * @var io The Socket.IO handler
 * @var theport The port that the app will be listening
 * @var twitter The twitter library for the Streaming API
 */
var fs = require("fs"),
    app = require("http").createServer(handler), // handler defined below
    io = require("socket.io").listen(app, { log: false }),
    theport = process.env.PORT || 2000,
    twitter = require("ntwitter");

// listens to the port specified
app.listen(theport);
console.log ("http server on port: " + theport);

function handler (req, res) {
    fs.readFile(__dirname + "/index.html",
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end("Error loading index.html");
            }
            res.writeHead(200);
            res.end(data);
        });
}

/**
 * This are the application global variables for the server
 *
 * @var tw The Twitter Streaming API initialization
 * @var stream When a stream is created this will be the only instance of it
 * @var track The tracking words for the stream
 * @var users An array of connected users to the application
 */
var tw = new twitter({
        consumer_key: "bkbt2uO5UUgdpvk6JLPQyMUuD",
        consumer_secret: "YFn5DqmlGvndiKPvB88Jk5jlIfqdGqVz5wWLFUUx5MmAVMutIl",
        access_token_key: "1087598262-w3fSYM23Z6tnJlHXvPOxzeppSsBBM3uZsqAQPrX",
        access_token_secret: "PLPxgyFz5jrZnbZpKHXR8Ua1uY74LzNiQVGf6v2AKz9LJ"
    }),
    stream = null,
    track = "plsvanish",
    users = [];

/**
 * A listener for a client connection
 */
io.sockets.on("connection", function(socket) {
    // The user it's added to the array if it doesn't exist
    if(users.indexOf(socket.id) === -1) {
        users.push(socket.id);
    }

    // Log
    logConnectedUsers();

    // Listener when a user emits the "start stream" signal
    socket.on("start stream", function() {
        // The stream will be started only when the 1st user arrives
        if(stream === null) {
            tw.stream("statuses/filter", {
                track: track
            }, function(s) {
                stream = s;
                stream.on("data", function(data) {
                    // only broadcast when users are online
                    if(users.length > 0) {
                        // This emits the signal to all users but the one
                        // that started the stream
                        socket.broadcast.emit("new tweet", data);
                        // This emits the signal to the user that started
                        // the stream
                        socket.emit("new tweet", data);
                    }
                    else {
                        // If there are no users connected we destroy the stream.
                        // Why would we keep it running for nobody?
                        stream.destroy();
                        stream = null;
                    }
                });
            });
        }
    });

    // This handles when a user is disconnected
    socket.on("disconnect", function(o) {
        // find the user in the array
        var index = users.indexOf(socket.id);
        if(index != -1) {
            // Eliminates the user from the array
            users.splice(index, 1);
        }
        logConnectedUsers();
    });

    // Emits signal when the user is connected sending
    // the tracking words the app it's using
    socket.emit("connected", {
        tracking: track
    });
});

// A log function for debugging purposes
function logConnectedUsers() {
    console.log("============= CONNECTED USERS ==============");
    console.log("==  ::  " + users.length);
    console.log("============================================");
}