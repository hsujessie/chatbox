var ws

//取消連線
// document.querySelector('#disconnect')?.addEventListener('click', (e) => {
//     disconnect()
// })

function connect() { 
    // Create WebSocket connection
    ws = new WebSocket('ws://localhost:8080');
    // 在開啟連線時執行
    ws.onopen = () => {
        console.log('[open connection]')
        // Listen for messages from Server
        ws.onmessage = event => {
            console.log(`[Message from server]:\n %c${event.data}` , 'color: blue')
        }
    }
}

function sendMessage(e) {
    //connect();
    const msg = e.previousElementSibling.value;
    // Send messages to Server
    ws.send(msg)
    e.previousElementSibling.value = '';
}

function disconnect() {
    ws.close()
    // 在關閉連線時執行
    ws.onclose = () => console.log('[close connection]')
}