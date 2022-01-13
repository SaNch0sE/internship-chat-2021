/* eslint-disable no-undef */
function getFormValues() {
    return {
        fullName: document.querySelector('#fullName').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
        role: 'User',
    };
}

// eslint-disable-next-line no-unused-vars
async function signUp() {
    const credentials = getFormValues();

    try {
        await fetch('/v1/auth/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        }).then((res) => res.json());
        window.location.href = `/v1/chat/login?email=${credentials.email}`;
    } catch (error) {
        window.location.reload(true);
    }
}

document.querySelector('#signUp').onclick = signUp;
