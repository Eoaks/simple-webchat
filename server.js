import http from 'http'
import { WebSocketServer } from 'ws';
import url from 'url'

const PORT = 8080;
const MESSAGE_CACHE = [] // keep 2 latest messages here 
const server = http.createServer()

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws, request) {
    const { username } = url.parse(request.url, true).query
    console.log(`${username ?? 'A new client'} connected!`)

    function messageHandler(value, username) {
        const message = value.toString().replace(/[""]+/g, '')
        console.log(`received message from ${username}: ` + message);

        const messageData = {
            username,
            message,
            timestamp: Date.now()
        }

        if (MESSAGE_CACHE.length > 2) MESSAGE_CACHE.shift();
        MESSAGE_CACHE.push(messageData)

        // Broadcast the message to all connected clients (except the sender)
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(messageData));
            }
        });
    };

    // Event listener for messages from this specific client
    ws.on('message', (e) => messageHandler(e, username));

    // Send current cache on first connection
    ws.send(JSON.stringify({ MESSAGE_CACHE, isCache: true }))


    wss.on('error', function error(err) {
        console.error('WebSocket server error:', err);
    });
})


server.listen(PORT, () => console.log('WebSocket server is running on port ' + PORT));