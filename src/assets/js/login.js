/* eslint-disable no-undef */

localStorage.clear();

function setCookie(cname, cvalue, seconds) {
    const d = new Date();
    d.setTime(d.getTime() + (seconds * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function getFormValues() {
    return {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
    };
}

// eslint-disable-next-line no-unused-vars
async function signIn() {
    const credentials = getFormValues();

    try {
        const response = await fetch('/v1/auth/sign-in', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(credentials),
        }).then((res) => res.json());

        setCookie('accessToken', response.data.accessToken, 5 * 60);

        window.location.href = '/v1/chat/';
    } catch (error) {
        alert('Error occured. Reloading..');
        window.location.reload(true);
    }
}

document.querySelector('#signIn').onclick = signIn;
