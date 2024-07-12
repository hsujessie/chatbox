var ws;
const SYS_NAME = 'System_Robot';

function connect() {
    // Create WebSocket connection
    ws = new WebSocket('ws://localhost:8080');

    // 在開啟連線時執行
    ws.onopen = () => {
        // Listen for messages from Server
        ws.onmessage = event => {
            showServerMsg(event.data);
        }
    }
}

function clickSendMessage(e) {
    connect();
    const msg = e.previousElementSibling.value;
    ws.addEventListener('open', function (event) {
        showClientMsg(msg);
        ws.send(msg); //Send messages to Server
        e.previousElementSibling.value = '';
    });
}

function enterSendMessage(msg) {
    connect();
    ws.addEventListener('open', function (event) {
        showClientMsg(msg);
        ws.send(msg); //Send messages to Server
    });
}

function showClientMsg(msg) {
    //console.log("[client] "+msg);

    const msgBoxHolderDiv = document.createElement('div');
    msgBoxHolderDiv.classList.add('message-box-holder');

    const msgBoxDiv = document.createElement('div');
    msgBoxDiv.classList.add('message-box');
    msgBoxDiv.textContent = msg;

    msgBoxHolderDiv.appendChild(msgBoxDiv);

    const chatSingleDiv = document.getElementById('chat-single-client');
    chatSingleDiv.appendChild(msgBoxHolderDiv);

    scrollBarToBottom(chatSingleDiv);
}

function showServerMsg(msg){
    //console.log("[server] "+msg);

    const msgBoxHolderDiv = document.createElement('div');
    msgBoxHolderDiv.classList.add('message-box-holder');

    const msgSenderDiv = document.createElement('div');
    msgSenderDiv.classList.add('message-sender');
    msgSenderDiv.textContent = SYS_NAME;

    const msgBoxDiv = document.createElement('div');
    msgBoxDiv.classList.add('message-box', 'message-partner');
    msgBoxDiv.textContent = msg;

    msgBoxHolderDiv.appendChild(msgSenderDiv);
    msgBoxHolderDiv.appendChild(msgBoxDiv);

    const chatSingleDiv = document.getElementById('chat-single-client');
    chatSingleDiv.appendChild(msgBoxHolderDiv);

    scrollBarToBottom(chatSingleDiv);
}

//有新訊息時，scroll bar拉到最底
function scrollBarToBottom(chatSingleDiv) {
    chatSingleDiv.scrollTop = chatSingleDiv.scrollHeight;
}