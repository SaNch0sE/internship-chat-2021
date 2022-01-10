/* eslint-disable no-undef */
const socket = io();

function getCookie(cookieName) {
    const name = `${cookieName}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
        const c = ca[i].trim();
        if ((c.indexOf(name)) === 0) {
            return c.substr(name.length);
        }
    }
    console.error('not found');

    return null;
}

function loginRedirect() {
    const { hostname } = new URL(window.location.href);
    window.location.href = `${hostname}/v1/chat/login`;
}

socket.on('connect', () => {
    if (socket.id === undefined) {
        console.log('undefined socket id');

        return;
    }

    const accessToken = getCookie('accessToken');
    if (accessToken === null) {
        loginRedirect();

        return;
    }

    socket.emit('user connected', {
        accessToken,
        socketId: socket.id,
    });
});

const input = document.querySelector('#message-to-send');
const send = document.querySelector('#sendMessage');
const history = document.querySelector('#history');

send.addEventListener('click', (event) => {
    event.preventDefault();

    if (input.value.length >= 1) {
        socket.emit('user message', input.value);
        input.value = '';
    }
});

socket.on('user message', (content) => {
    const messageBody = document.createElement('li');
    messageBody.className = 'clearfix';

    const messageData = document.createElement('div');
    messageData.className = 'message-data align-right';

    const messageDataTime = document.createElement('span');
    messageDataTime.className = 'message-data-time';
    messageDataTime.textContent = Date.now();

    const messageDataName = document.createElement('span');
    messageDataName.className = 'message-data-name';
    messageDataName.textContent = 'User';

    messageData.appendChild(messageDataTime);
    messageData.appendChild(messageDataName);

    const message = document.createElement('div');
    message.className = 'message other-message float-right';
    message.textContent = content;

    messageBody.appendChild(messageData);
    messageBody.appendChild(message);

    history.appendChild(messageBody);
    history.scrollTo(0, history.scrollHeight);
});
