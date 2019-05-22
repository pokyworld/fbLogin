// Login to Github - imports from config & updates global var: ghLoggedIn

var ghToken = "";
var ghLoggedIn = false;

if (window.addEventListener) {
    window.addEventListener('load', () => {

        // Facebook Login
        document.querySelector('#ghLoginButton').addEventListener('click', () => {
            if (!ghLoggedIn) {
                ghLogin();
            } else {
                ghLogout();
            }
        }, false);
    });
} else {
    alert("This browser no longer supported");
}

const ghLogin = () => {
    console.log("Github Login");
    return true;
}

const ghLogout = () => {
    console.log("Github Logout");
    return true;
}
