/* eslint-disable no-undef */
const socket = io();

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
