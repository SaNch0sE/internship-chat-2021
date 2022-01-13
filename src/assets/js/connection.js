/* eslint-disable no-undef */
const socket = io();
localStorage.clear();

const getUsersList = () => {
    socket.emit('get userList', { userId: localStorage.getItem('userId') });
};

const getUsersLoop = () => {
    getUsersList();
    setTimeout(getUsersLoop, 7000);
};

function setCookie(cname, cvalue, seconds) {
    const d = new Date();
    d.setTime(d.getTime() + (seconds * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function getCookie(cookieName) {
    const name = `${cookieName}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
        const c = ca[i].trim();
        if ((c.indexOf(name)) === 0) {
            return c.substr(name.length);
        }
    }

    return null;
}

function loginRedirect() {
    window.location.href = '/v1/chat/login';
}

const onConnect = async () => {
    if (socket.id === undefined) {
        console.error('Socket error');

        return;
    }

    let accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    if (accessToken === null) {
        if (refreshToken === null) {
            loginRedirect();

            return;
        }
        try {
            const response = await fetch('/v1/auth/refreshToken', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }).then((res) => {
                if (res.status !== 200) {
                    loginRedirect();
                }

                return res.json();
            });

            setCookie('accessToken', response.data.accessToken, 60 * 5);
            accessToken = response.data.accessToken;
            setCookie('refreshToken', response.data.refreshToken, 60 * 60 * 24);
        } catch (error) {
            console.error(error);
        }
    }

    const { data } = await fetch('/v1/auth/payload', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((res) => {
        if (res.status !== 200) {
            throw res;
        }

        return res.json();
    });

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('socketId', socket.id);
    localStorage.setItem('userId', data.id);
    localStorage.setItem('fullName', data.fullName);
    localStorage.setItem('email', data.email);

    setTimeout(() => {
        socket.emit('user connected', {
            userId: localStorage.getItem('userId'),
            accessToken: localStorage.getItem('accessToken'),
            socketId: socket.id,
        });
    }, 0);

    setTimeout(getUsersList, 1500);
};

socket.on('connect', onConnect);
getUsersLoop();
