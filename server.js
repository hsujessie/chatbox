// import library
const express = require('express')
const ServerSocket = require('ws').Server   // 引用 Server

const PORT = 8080;
// 建立 express 物件並用來監聽 8080 port
const server = express()
    .listen(PORT, () => console.log(`[Server] Listening on https://localhost:${PORT}`))


// 建立實體，透過 ServerSocket 開啟 WebSocket 的服務
const wss = new ServerSocket({ server });

// Connection opened
wss.on('connection', (ws, req) => {
    ws.id = req.headers['sec-websocket-key'].substring(0, 8);

    // Listen for messages from client
    ws.onmessage = event => {
        const clientMsg = event.data;
        //Get clients who has connected
        let clients = wss.clients;
        clients.forEach(client => {
            let sysMsg = 'How can I help you?';
            //Send messages to Client
            client.send(sysMsg);

            //取消連線
            ws.close();
        });
    }

    ws.onclose = () => console.log('[close connection]');
})