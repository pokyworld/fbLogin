// Login to Twitter - imports from config & updates global var: twLoggedIn

var twToken = "";
var twLoggedIn = false;

if (window.addEventListener) {
    window.addEventListener('load', () => {

        // Facebook Login
        document.querySelector('#twLoginButton').addEventListener('click', () => {
            if (!twLoggedIn) {
                twLogin();
            } else {
                twLogout();
            }
        }, false);
    });
} else {
    alert("This browser no longer supported");
}

const twLogin = () => {
    console.log("Twitter Login");
    return true;
}

const twLogout = () => {
    console.log("Twitter Logout");
    return true;
}
