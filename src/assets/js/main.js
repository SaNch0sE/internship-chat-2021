/* eslint-disable no-undef */
document.getElementById('chat-about').style.display = 'none';
document.getElementById('typing').style.display = 'none';
const input = document.querySelector('#message-to-send');
const send = document.querySelector('#sendMessage');
const history = document.querySelector('#history');
const listUsers = document.querySelector('.list');

const addMessage = (data, me) => {
    const messageBody = document.createElement('li');
    messageBody.className = 'clearfix';

    const messageData = document.createElement('div');

    const messageDataTime = document.createElement('span');
    messageDataTime.className = 'message-data-time';
    if (data.createdAt) {
        messageDataTime.textContent = `${new Date(data.createdAt).toUTCString()} `;
    } else {
        messageDataTime.textContent = `${new Date().toUTCString()} `;
    }

    const messageDataName = document.createElement('span');
    messageDataName.className = 'message-data-name';
    if (me) {
        messageData.className = 'message-data align-right';
        messageDataName.textContent = localStorage.getItem('fullName');
    } else {
        messageData.className = 'message-data';
        messageDataName.textContent = localStorage.getItem('friendName');
    }

    messageData.appendChild(messageDataTime);
    messageData.appendChild(messageDataName);

    const message = document.createElement('div');
    if (me) {
        message.className = 'message other-message float-right';
    } else {
        message.className = 'message my-message';
    }
    message.textContent = data.content;

    messageBody.appendChild(messageData);
    messageBody.appendChild(message);

    history.appendChild(messageBody);
    const chatHist = document.querySelector('.chat-history');
    chatHist.scrollTop = chatHist.scrollHeight;
};

const selectUser = (event) => {
    event.preventDefault();

    const from = localStorage.getItem('userId');
    const to = event.target.parentNode.id;

    localStorage.setItem('friendId', to);
    localStorage.setItem('friendName', event.target.textContent);

    socket.emit('user selected', {
        from,
        to,
    });

    document.querySelector('#chat-about').style.display = 'block';
    document.querySelector('#chat-with').textContent = localStorage.getItem('friendName');
    document.getElementById(to).style = 'background-color: white;';
};

socket.on('user selected', (messages) => {
    messages.forEach((message) => {
        let me = false;
        if (message.from === localStorage.getItem('userId')) me = true;
        addMessage(message, me);
    });
});

input.addEventListener('input', (event) => {
    event.preventDefault();

    socket.emit('user typing', {
        from: localStorage.getItem('userId'),
        to: localStorage.getItem('friendId'),
    });
});

socket.on('user typing', (msg) => {
    if (msg.friendId === localStorage.getItem('friendId')) {
        document.getElementById('typing').style.display = 'block';
    }
});

document.getElementById('logout').addEventListener('click', async (event) => {
    event.preventDefault();

    await fetch('/v1/auth/logout', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then(() => loginRedirect());
});

send.addEventListener('click', (event) => {
    event.preventDefault();

    if (input.value.length >= 1) {
        const content = input.value;
        socket.emit('user message', {
            from: localStorage.getItem('userId'),
            to: localStorage.getItem('friendId'),
            content,
        });
        input.value = '';
        addMessage({
            content,
        }, true);
    }
});

// on user list
socket.on('send userList', (users) => {
    const uname = document.getElementById('fullName');
    if (uname.innerHTML === '') uname.innerHTML = localStorage.getItem('fullName');
    listUsers.innerHTML = '';
    users.forEach((user) => {
        if (user._id === localStorage.getItem('userId')) return;
        const userLi = document.createElement('li');
        userLi.className = 'clearfix';

        const button = document.createElement('button');
        button.className = 'about activeUser';
        button.id = user._id;

        const name = document.createElement('div');
        name.className = 'name';
        name.textContent = user.fullName;

        button.appendChild(name);
        button.addEventListener('click', selectUser.bind(user));
        userLi.appendChild(button);
        listUsers.appendChild(userLi);
    });
});

// On new message
socket.on('user message', (content) => {
    if (localStorage.getItem('friendId') && content.from === localStorage.getItem('friendId')) {
        addMessage(content, false);
    } else {
        // Unread feature
        document.getElementById(content.from).style = 'background-color: red;';
    }
});

const typingLoop = () => {
    document.getElementById('typing').style.display = 'none';
    setTimeout(typingLoop, 2000);
};

typingLoop();
