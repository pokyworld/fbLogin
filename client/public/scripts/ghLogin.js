// Login to Github - imports from config & updates global var: ghLoggedIn

var ghToken = "";
var ghLoggedIn = false;

if (window.addEventListener) {

    window.addEventListener('load', () => {

        document.querySelector('#ghLoginButton').addEventListener('click', () => !ghLoggedIn ? ghLogin() : ghLogout(), false);

    });

} else {
    alert("This browser no longer supported");
}

const ghGetSessionCode = () => {
    window.location = config.github.url.sessionCode;
};

const ghLogin = () => {
    console.log("Github Login");
    var urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('code') && !ghLoggedIn) {
        // Request session code
        ghGetSessionCode();
    } else if (urlParams.has('code') && !ghLoggedIn) {
        // Attempt login with session code
        const code = urlParams.get("code");
        const url = config.github.url.fetchJWT;
        // Post to server to get access_key, and email
        fetch(url, {
            credentials: 'same-origin', // 'include', default: 'omit'
            method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: { code }
        })
            .then(res => res.json())
            .then(json => {
                ghLoggedIn = true;
                document.querySelector('#ghLoginText').innerHTML = `Logout of Github`;
                document.querySelector("#ghEmail").innerHTML = json.user.email;
                document.querySelector("#ghToken").innerHTML = json.token;

                !json.user.name ?
                    document.querySelector("#ghStatus").innerHTML = `LoggedIn: ${json.user.login}` :
                    document.querySelector("#ghStatus").innerHTML = `LoggedIn: ${json.user.name}`;
            })
            .catch(err => console.log("Error: ", err));
    }
}

const ghLogout = () => {
    console.log("Github Logout");
    ghLoggedIn = false;
    document.querySelector('#ghLoginText').innerHTML = `Login with Github`;
    document.querySelector("#ghEmail").innerHTML = ``;
    document.querySelector("#ghToken").innerHTML = ``;
    document.querySelector("#ghStatus").innerHTML = `Logged out`;
}
